import {
  filterSortProductQuery,
  ITokopediaFilterSortProductResponse,
  ITokopediaLocation,
  ITokopediaPdpGetLayoutDataContentProductDetail,
  ITokopediaPdpGetLayoutDataProductContent,
  ITokopediaPdpGetLayoutResponse,
  ITokopediaRecommendationProductResponse,
  ITokopediaSearchProductResponse,
  pdpGetLayoutQuery,
  recommendationFeedQuery,
  searchProductQueryV4,
} from "./mod.ts";
import {
  ICreateProductWithImages,
  sleep,
  Source,
  tokopediaHeader,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

const fetchWithRetry = async <T>(
  url: string,
  requestOptions: RequestInit,
  retryCount = 0,
  maxRetry = 10,
  lastError?: string,
): Promise<T> => {
  if (retryCount > maxRetry) throw new Error(lastError);
  try {
    const response = await _internals.fetch(
      url,
      requestOptions,
    );
    if (response.headers.get("content-type") !== "application/json") {
      console.log(response.headers);
      throw new Error("invalid json");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    await sleep(retryCount);
    return fetchWithRetry(url, requestOptions, retryCount + 1, error);
  }
};

export async function fetchLocations(): Promise<ITokopediaLocation[]> {
  const graphql = JSON.stringify({
    query: filterSortProductQuery,
    variables: {
      "params":
        "navsource=home&q=&source=search_product&srp_component_id=01.02.02.03&st=product",
    },
  });
  const requestOptions: RequestInit = {
    method: "POST",
    headers: tokopediaHeader,
    body: graphql,
    redirect: "follow",
  };

  const url = "https://gql.tokopedia.com";
  const data = await fetchWithRetry<ITokopediaFilterSortProductResponse>(
    url,
    requestOptions,
  );

  const filters = data["data"]["filter_sort_product"]["data"]["filter"];
  const locationFilter = filters.find(({ title }) => title === "Lokasi");
  if (!locationFilter) throw new Error("no location");
  const locationOptions = locationFilter["options"];

  const output: ITokopediaLocation[] = [];
  for (const { name, value } of locationOptions) {
    const cityIds = (<string> value).split(",");
    for (const cityId of cityIds) {
      output.push({ name, cityId });
    }
  }
  return output;
}

export async function fetchProductDetail(
  url: string,
): Promise<{ description: string; view: number; sold: number; stock: number }> {
  const { pathname } = new URL(url);
  const [_, shopDomain, productKey] = pathname.split("/");

  const graphql = JSON.stringify({
    query: pdpGetLayoutQuery,
    variables: {
      apiVersion: 1,
      productKey,
      shopDomain,
    },
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "x-tkpd-akamai": "pdpGetLayout", ...tokopediaHeader },
    body: graphql,
    redirect: "follow",
  };

  const gqlUrl = "https://gql.tokopedia.com";
  const { data } = await fetchWithRetry<ITokopediaPdpGetLayoutResponse>(
    gqlUrl,
    requestOptions,
  );
  console.log(data);
  const { pdpGetLayout } = data;

  const { txStats: { countSold: sold }, stats: { countView: view } } =
    pdpGetLayout["basicInfo"];

  const components = pdpGetLayout["components"];
  const [{ data: productDetailData }] = components.filter((component) =>
    component.name === "product_detail"
  );

  const productDetail =
    (productDetailData as ITokopediaPdpGetLayoutDataContentProductDetail[])[0]
      .content;

  const [{ subtitle: description }] = productDetail.filter(({ title }) =>
    title === "Deskripsi"
  );

  const [{ data: productContentData }] = components.filter((component) =>
    component.name === "product_content"
  );

  const { campaign: { stock } } =
    (productContentData as ITokopediaPdpGetLayoutDataProductContent[])[0];

  return { description, sold, view, stock };
}

export async function fetchRecommendedProducts(
  locations: ITokopediaLocation[],
  maxConcurrency = 1,
): Promise<ICreateProductWithImages[]> {
  const serializedProducts: ICreateProductWithImages[] = [];

  while (locations.length) {
    await Promise.all(
      locations.splice(0, maxConcurrency).map(async ({ cityId }) => {
        let isThereNextSearch = true;
        let page = 1;

        while (isThereNextSearch != false) {
          const location =
            `user_addressId=0&user_cityId=${cityId}&user_districtId=&user_lat=&user_long=&user_postCode=`;

          const graphql = JSON.stringify({
            query: recommendationFeedQuery,
            variables: {
              "recomID": 1,
              "type": "banner, banner_ads, position",
              "count": 20,
              "page": page,
              "pageType": "home",
              "categoryVisited": "",
              "productVisited": "",
              "location": location,
            },
          });

          const requestOptions: RequestInit = {
            method: "POST",
            headers: tokopediaHeader,
            body: graphql,
            redirect: "follow",
          };

          const gqlUrl =
            "https://gql.tokopedia.com/graphql/RecommendationFeedQuery";

          const data = await fetchWithRetry<
            ITokopediaRecommendationProductResponse
          >(gqlUrl, requestOptions);

          const {
            product: products,
            hasNextPage,
          } = data["data"]["get_home_recommendation"]["recommendation_product"];

          while (products.length) {
            await Promise.all(
              products.splice(0, maxConcurrency).map(async ({
                id,
                name,
                url,
                priceInt,
                ratingAverage,
                countReview: ratingCount,
                discountPercentage,
                imageUrl,
              }) => {
                const data = await fetchProductDetail(
                  url,
                );
                const { description, sold, view, stock } = data;

                console.log(data);

                serializedProducts.push(
                  {
                    externalId: id.toString(),
                    name,
                    url,
                    price: priceInt,
                    ratingAverage: Number(ratingAverage),
                    ratingCount,
                    discount: discountPercentage,
                    description,
                    sold,
                    stock,
                    view,
                    source: Source.TOKOPEDIA,
                    images: [imageUrl],
                  },
                );
              }),
            );
          }
          // prevent hammering the api source
          isThereNextSearch = hasNextPage;
          page += 1;
        }
      }),
    );
  }
  return serializedProducts;
}

export async function fetchTrendingProducts(
  keyword: string,
  noOfPages = 10,
  maxConcurrency = 1,
): Promise<ICreateProductWithImages[]> {
  const pages = Array.from(Array(noOfPages).keys());

  const serializedProducts: ICreateProductWithImages[] = [];

  while (pages.length) {
    await Promise.all(
      pages.splice(0, maxConcurrency).map(async (page) => {
        let uuid = crypto.randomUUID();
        uuid = uuid.replace("-", "");

        const params =
          `device=desktop&navsource=home&ob=23&page=${page}&q=${keyword}&related=true&rows=60&safe_search=false&scheme=https&shipping=&source=search&srp_component_id=02.01.00.00&st=product&start=0&topads_bucket=true&unique_id=${uuid}&user_addressId=&user_cityId=&user_districtId=&user_id=&user_lat=&user_long=&user_postCode=&user_warehouseId=&variants=`;

        const graphql = JSON.stringify({
          query: searchProductQueryV4,
          variables: {
            "params": params,
          },
        });

        const requestOptions: RequestInit = {
          method: "POST",
          headers: tokopediaHeader,
          body: graphql,
          redirect: "follow",
        };

        const gqlUrl = "https://gql.tokopedia.com/graphql/SearchProductQueryV4";

        const data = await fetchWithRetry<ITokopediaSearchProductResponse>(
          gqlUrl,
          requestOptions,
        );

        const { products } = data["data"]["ace_search_product_v4"]["data"];

        while (products.length) {
          await Promise.all(
            products.splice(0, maxConcurrency).map(async ({
              id,
              name,
              url,
              priceInt,
              ratingAverage,
              countReview: ratingCount,
              discountPercentage,
              imageUrl,
            }) => {
              const { description, sold, view, stock } =
                await fetchProductDetail(
                  url,
                );
              serializedProducts.push(
                {
                  externalId: id.toString(),
                  name,
                  url,
                  price: priceInt,
                  ratingAverage: Number(ratingAverage),
                  ratingCount,
                  discount: discountPercentage,
                  description,
                  sold,
                  stock,
                  view,
                  source: Source.TOKOPEDIA,
                  images: [imageUrl],
                },
              );
            }),
          );
        }
      }),
    );
  }
  return serializedProducts;
}

export const _internals = { fetch };

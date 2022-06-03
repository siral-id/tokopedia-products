import {
  ITokopediaSearchProductResponse,
  ITokopediaSearchProductSchema,
} from "./interfaces/mod.ts";
import { getMongoClient } from "https://raw.githubusercontent.com/siral-id/deno-utility/main/database.ts";
import { getLocations } from "./get_locations.ts";
import {
  ITrendSchema,
} from "https://raw.githubusercontent.com/siral-id/deno-utility/main/interfaces.ts";

import { tokopediaHeader } from "https://raw.githubusercontent.com/siral-id/deno-utility/main/header.ts";
import { searchProductQueryV4 } from "./gql.ts";
import {
  sleep,
} from "https://raw.githubusercontent.com/siral-id/deno-utility/main/utility.ts";

// static config for request
const sleepDuration = 1;
const noOfPages = 10;
const pages = Array.from(Array(noOfPages).keys());

// setup database
const mongoUri = Deno.env.get("MONGO_URI");
if (!mongoUri) throw new Error("MONGO_URI not found");

const client = await getMongoClient(mongoUri);
const trendCollection = client.database().collection<ITrendSchema>("trends");
const productCollection = client.database().collection<
  ITokopediaSearchProductSchema
>("products");
// used to search popular keyword in tokopedia!
const uniqueKeywords: ITrendSchema[] = await trendCollection.distinct(
  "keyword",
);
// used to search popular keyword in tokopedia in various location!
const locations = await getLocations();
const key = "name";
const uniqueLocations = [
  ...new Map(locations.map((item) => [item[key], item])).values(),
];

for (const keyword of uniqueKeywords) {
  for (const { name, cityId } of uniqueLocations) {
    for (const page of pages) {
      let uuid = crypto.randomUUID();
      uuid = uuid.replace("-", "");

      const params =
        `device=desktop&navsource=home&ob=23&page=${page}&q=${keyword}&related=true&rows=60&safe_search=false&scheme=https&shipping=&source=search&srp_component_id=02.01.00.00&st=product&start=0&topads_bucket=true&unique_id=${uuid}&user_addressId=&user_cityId=${cityId}&user_districtId=&user_id=&user_lat=&user_long=&user_postCode=&user_warehouseId=&variants=`;
      console.log({ keyword, cityId, name, uuid, page });

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

      const url = "https://gql.tokopedia.com/graphql/SearchProductQueryV4";

      let response;
      try {
        response = await fetch(url, requestOptions);
      } catch (error) {
        console.error(error);
        throw error;
      }
      console.log(response);

      const data: ITokopediaSearchProductResponse = await response.json();

      const { products } = data["data"]["ace_search_product_v4"]["data"];

      const productsWithSource = products.map(
        (product) => ({ ...product, source: "TOKOPEDIA" }),
      );

      await productCollection.insertMany(productsWithSource);
      // prevent hammering the api source
      await sleep(sleepDuration);
    }
  }
}

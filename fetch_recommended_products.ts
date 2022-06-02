import {
  ITokopediaRecommendationProductResponse,
  ITokopediaRecommendationProductSchema,
} from "./interfaces/mod.ts";
import { getMongoClient } from "https://raw.githubusercontent.com/siral-id/deno-utility/main/database.ts";
import { tokopediaHeader } from "https://raw.githubusercontent.com/siral-id/deno-utility/main/header.ts";
import { getLocations } from "./get_locations.ts";
import { recommendationFeedQuery } from "./gql.ts";
import {
  sleep,
} from "https://raw.githubusercontent.com/siral-id/deno-utility/main/utility.ts";

const sleepDuration = 100;

const mongoUri = Deno.env.get("MONGO_URI");
if (!mongoUri) throw new Error("MONGO_URI not found");

const client = await getMongoClient(mongoUri);
const collection = client.database().collection<
  ITokopediaRecommendationProductSchema
>("products");

const locations = await getLocations();
const key = "name";
const uniqueLocations = [
  ...new Map(locations.map((item) => [item[key], item])).values(),
]
uniqueLocations.slice(0,100)

await Promise.all(uniqueLocations.map(async ({ name, cityId }) => {
  let isThereNextSearch = true;
  let page = 1;

  while (isThereNextSearch != false) {
    const location =
      `user_addressId=0&user_cityId=${cityId}&user_districtId=&user_lat=&user_long=&user_postCode=`;
    console.log({name, cityId})

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

    const url = "https://gql.tokopedia.com/graphql/RecommendationFeedQuery"

    let response
    try{
      response = await fetch(url, requestOptions);
    }catch(error){
      console.error(error)
      throw error;
    }
    console.log(response)

    const data: ITokopediaRecommendationProductResponse = await response.json();

    const { product, hasNextPage } =
      data["data"]["get_home_recommendation"]["recommendation_product"];

    const products = product.map(
      (product) => ({ ...product, source: "TOKOPEDIA" }),
    );

    await collection.insertMany(products);
    // prevent hammering the api source
    isThereNextSearch = hasNextPage;
    page += 1;

    await sleep(sleepDuration);
  }
  await sleep(sleepDuration);
}));

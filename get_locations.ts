import {
  ITokopediaFilterSortProductResponse,
  ITokopediaLocation,
} from "./interfaces/mod.ts";
import { tokopediaHeader } from "https://raw.githubusercontent.com/siral-id/deno-utility/main/header.ts";
import { filterSortProductQuery } from "./gql.ts";

export async function getLocations(): Promise<ITokopediaLocation[]> {
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
  const response = await fetch(url, requestOptions);
  const data: ITokopediaFilterSortProductResponse = await response.json();

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

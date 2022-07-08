import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import {
  assertSpyCalls,
  returnsNext,
  stub,
} from "https://deno.land/std@0.142.0/testing/mock.ts";
import {
  _internals,
  fetchLocations,
  fetchProductDetail,
  fetchRecommendedProducts,
  fetchTrendingProducts,
} from "../mod.ts";
import {
  TOKOPEDIA_ACE_SEARCH_V4_RESPONSE,
  TOKOPEDIA_FILTER_SORT_QUERY_RESPONSE,
  TOKOPEDIA_GET_PDP_LAYOUT_RESPONSE,
  TOKOPEDIA_GET_RECOMMENDED_PRODUCTS_RESPONSE,
} from "./mod.ts";
import {
  generateResponse,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

Deno.test("Make sure fetchLocations is correct", async () => {
  const stubPostprocessFetch = stub(
    _internals,
    "fetch",
    returnsNext([
      generateResponse(TOKOPEDIA_FILTER_SORT_QUERY_RESPONSE),
    ]),
  );

  const response = await fetchLocations();

  assertEquals(response.length, 1);

  assertSpyCalls(stubPostprocessFetch, 1);

  stubPostprocessFetch.restore();
});

Deno.test("Make sure fetchProductDetail is correct", async () => {
  const stubPostprocessFetch = stub(
    _internals,
    "fetch",
    returnsNext([
      generateResponse(TOKOPEDIA_GET_PDP_LAYOUT_RESPONSE),
    ]),
  );

  await fetchProductDetail(
    "https://www.tokopedia.com/3aready/sepeda-roadbike-full-carbon-twitter-thunder-retrospec-22-speed-silver-48-rim",
  );

  assertSpyCalls(stubPostprocessFetch, 1);

  stubPostprocessFetch.restore();
});

Deno.test("Make sure fetchRecommendedProducts is correct", async () => {
  const stubPostprocessFetch = stub(
    _internals,
    "fetch",
    returnsNext([
      generateResponse(TOKOPEDIA_GET_RECOMMENDED_PRODUCTS_RESPONSE),
      generateResponse(TOKOPEDIA_GET_PDP_LAYOUT_RESPONSE),
    ]),
  );

  const result = await fetchRecommendedProducts([{
    name: "city",
    cityId: "1",
  }]);

  assertEquals(result.length, 1);

  assertSpyCalls(stubPostprocessFetch, 2);

  stubPostprocessFetch.restore();
});

Deno.test("Make sure fetchTrendingProducts is correct", async () => {
  const stubPostprocessFetch = stub(
    _internals,
    "fetch",
    returnsNext([
      generateResponse(TOKOPEDIA_ACE_SEARCH_V4_RESPONSE),
      generateResponse(TOKOPEDIA_GET_PDP_LAYOUT_RESPONSE),
    ]),
  );

  const result = await fetchTrendingProducts(
    "keyword",
    1,
  );

  assertEquals(result.length, 1);

  assertSpyCalls(stubPostprocessFetch, 2);

  stubPostprocessFetch.restore();
});

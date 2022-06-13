import chai from "https://cdn.skypack.dev/chai@4.3.4?dts";
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
  const expect = chai.expect;

  const stubPostprocessFetch = stub(
    _internals,
    "fetch",
    returnsNext([
      generateResponse(TOKOPEDIA_FILTER_SORT_QUERY_RESPONSE),
    ]),
  );

  const response = await fetchLocations();

  expect(response[0]).to.have.property("cityId");
  expect(response[0]).to.have.property("name");

  assertSpyCalls(stubPostprocessFetch, 1);

  stubPostprocessFetch.restore();
});

Deno.test("Make sure fetchProductDetail is correct", async () => {
  const expect = chai.expect;

  const stubPostprocessFetch = stub(
    _internals,
    "fetch",
    returnsNext([
      generateResponse(TOKOPEDIA_GET_PDP_LAYOUT_RESPONSE),
    ]),
  );

  const result = await fetchProductDetail(
    "https://www.tokopedia.com/3aready/sepeda-roadbike-full-carbon-twitter-thunder-retrospec-22-speed-silver-48-rim",
  );

  expect(result).to.have.property("description");
  expect(result).to.have.property("sold");
  expect(result).to.have.property("view");
  expect(result).to.have.property("stock");

  assertSpyCalls(stubPostprocessFetch, 1);

  stubPostprocessFetch.restore();
});

Deno.test("Make sure fetchRecommendedProducts is correct", async () => {
  const expect = chai.expect;

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

  expect(result[0]).to.have.property("externalId");
  expect(result[0]).to.have.property("name");
  expect(result[0]).to.have.property("url");
  expect(result[0]).to.have.property("price");
  expect(result[0]).to.have.property("ratingAverage");
  expect(result[0]).to.have.property("ratingCount");
  expect(result[0]).to.have.property("discount");
  expect(result[0]).to.have.property("description");
  expect(result[0]).to.have.property("sold");
  expect(result[0]).to.have.property("stock");
  expect(result[0]).to.have.property("view");
  expect(result[0]).to.have.property("source");
  expect(result[0]).to.have.property("images");

  assertSpyCalls(stubPostprocessFetch, 2);

  stubPostprocessFetch.restore();
});

Deno.test("Make sure fetchTrendingProducts is correct", async () => {
  const expect = chai.expect;

  const stubPostprocessFetch = stub(
    _internals,
    "fetch",
    returnsNext([
      generateResponse(TOKOPEDIA_ACE_SEARCH_V4_RESPONSE),
      generateResponse(TOKOPEDIA_GET_PDP_LAYOUT_RESPONSE),
    ]),
  );

  const result = await fetchTrendingProducts(
    {
      name: "city",
      cityId: "1",
    },
    "keyword",
    1,
  );

  expect(result[0]).to.have.property("externalId");
  expect(result[0]).to.have.property("name");
  expect(result[0]).to.have.property("url");
  expect(result[0]).to.have.property("price");
  expect(result[0]).to.have.property("ratingAverage");
  expect(result[0]).to.have.property("ratingCount");
  expect(result[0]).to.have.property("discount");
  expect(result[0]).to.have.property("description");
  expect(result[0]).to.have.property("sold");
  expect(result[0]).to.have.property("stock");
  expect(result[0]).to.have.property("view");
  expect(result[0]).to.have.property("source");
  expect(result[0]).to.have.property("images");

  assertSpyCalls(stubPostprocessFetch, 2);

  stubPostprocessFetch.restore();
});

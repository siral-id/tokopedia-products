import { fetchLocations, fetchRecommendedProducts } from "../mod.ts";
import {
  chunkItems,
  createGistWithRetry,
  ICreateProductWithImages,
  Pipeline,
  setupOctokit,
  uploadWithRetry,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

const index = Number(Deno.args[0]);
const ghToken = Deno.env.get("GH_TOKEN");

if (!index) throw new Error("missing page index");

const octokit = setupOctokit(ghToken);

// we only interest in first 40 items
const locations = await fetchLocations();
if (!locations) throw new Error("empty locations");

const products: ICreateProductWithImages[] = await fetchRecommendedProducts(
  [locations[index]],
  2,
);

const maxGistSize = 1048576;
const chunks = chunkItems(products, maxGistSize);

const gists = await Promise.all(
  chunks.map(async (chunk) => {
    const { data: { id } } = await createGistWithRetry<string>(
      octokit,
      JSON.stringify(chunk),
    );
    return id;
  }),
);

await uploadWithRetry<string>(
  octokit,
  JSON.stringify(gists),
  Pipeline.TokopediaProducts,
);

Deno.exit();

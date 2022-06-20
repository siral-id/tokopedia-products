import { fetchLocations, fetchRecommendedProducts } from "../mod.ts";
import {
  chunkItems,
  ICreateProductWithImages,
  Pipeline,
  setupOctokit,
  uploadWithRetry,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

const index = Number(Deno.args[0]);
const ghToken = Deno.env.get("GH_TOKEN");

const octokit = setupOctokit(ghToken);

// we only interest in first 40 items
const locations = await fetchLocations();

const products: ICreateProductWithImages[] = await fetchRecommendedProducts(
  [locations[index]],
);

await Promise.all(
  chunkItems(products).map(async (chunk) =>
    await uploadWithRetry<ICreateProductWithImages[]>(
      octokit,
      chunk,
      Pipeline.TokopediaProducts,
    )
  ),
);

Deno.exit();

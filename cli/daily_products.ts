import { fetchLocations, fetchRecommendedProducts } from "../mod.ts";
import {
  chunkItems,
  ICreateProductWithImages,
  Pipeline,
  setupOctokit,
  uploadWithRetry,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

const ghToken = Deno.env.get("GH_TOKEN");

const octokit = setupOctokit(ghToken);

const locations = await fetchLocations();

const products: ICreateProductWithImages[] = await fetchRecommendedProducts(
  locations,
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

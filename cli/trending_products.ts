import { fetchLocations, fetchTrendingProducts } from "../mod.ts";
import {
  chunkItems,
  ICreateProductWithImages,
  Pipeline,
  setupOctokit,
  uploadWithRetry,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

const ghToken = Deno.env.get("GH_TOKEN");
const rawData = Deno.args[0]; // Same name as downloaded_filename
const uniqueKeywords: string[] = JSON.parse(rawData);

const octokit = setupOctokit(ghToken);

const locations = await fetchLocations();

await Promise.all(
  locations.map(async (location) => {
    await Promise.all(uniqueKeywords.map(async (keyword) => {
      const products = await fetchTrendingProducts(location, keyword);

      await Promise.all(
        chunkItems(products).map(async (chunk) =>
          await uploadWithRetry<ICreateProductWithImages[]>(
            octokit,
            chunk,
            Pipeline.TokopediaProducts,
          )
        ),
      );
    }));
  }),
);

Deno.exit();

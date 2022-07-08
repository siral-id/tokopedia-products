import { fetchTrendingProducts } from "../mod.ts";
import {
  chunkItems,
  createGistWithRetry,
  Pipeline,
  setupOctokit,
  uploadWithRetry,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

const ghToken = Deno.env.get("GH_TOKEN");

const rawData = Deno.args[0]; // Same name as downloaded_filename
const uniqueKeywords: string[] = JSON.parse(rawData);

const index = Number(Deno.args[1]);

const octokit = setupOctokit(ghToken);

const products = await fetchTrendingProducts(uniqueKeywords[index]);

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

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { getScrapedRecipe } from "./scraper";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));
app.post("/scrape", async (c) => {
  const { url } = await c.req.json();
  const result = await getScrapedRecipe(url);
  return c.json(result);
});

serve({
  fetch: app.fetch,
  port: 4000,
});

console.log("Server is running on http://localhost:4000");

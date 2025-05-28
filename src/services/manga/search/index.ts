import {
  Element,
  HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts";
import { BASE_URL, QUERY_REGEX_URL } from "../../../constants/index.ts";
import parser from "../../../utils/parser.ts";
import { ComicsProps } from "../home/types.ts";

export const mangaSearchData = async (query: string): Promise<ComicsProps[]> => {
  const encoded = encodeURIComponent(query);
  const document = (await parser(`${BASE_URL}/?s=${encoded}`)) as HTMLDocument;
  const results = document.querySelectorAll(".listupd > .animepost") as unknown as Element[];

  const comicsList: ComicsProps[] = [];
  results.forEach((comic) => {
    const title = comic.querySelector(".tt")?.textContent;
    const url = comic.querySelector("a")?.getAttribute("href");
    const image = comic.querySelector("img")?.getAttribute("src");
    const chapter = comic.querySelector(".epxs")?.textContent || "";

    if (title && url && image) {
      comicsList.push({
        title: title,
        chapter: chapter.replace("Ch. ", ""),
        url: url.replace(BASE_URL, ""),
        image: image.replace(QUERY_REGEX_URL, ""),
      });
    }
  });

  return comicsList;
};

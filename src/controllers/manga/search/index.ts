import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { mangaSearchData } from "../../../services/manga/search/index.ts";

export const mangaSearch = async (context: Context) => {
  const { request, response } = context;
  const url = new URL(request.url.href);
  const query = url.searchParams.get("q");

  if (!query) {
    response.status = 400;
    response.body = { message: "Query tidak boleh kosong." };
    return;
  }

  const result = await mangaSearchData(query);
  if (result.length > 0) {
    response.status = 200;
    response.body = { data: result };
  } else {
    response.status = 404;
    response.body = { message: "Tidak ditemukan hasil." };
  }
};

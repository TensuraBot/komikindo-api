import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { mangaChapters } from "../controllers/manga/chapters/index.ts";
import { mangaDetails } from "../controllers/manga/details/index.ts";
import { mangaHome } from "../controllers/manga/home/index.ts";
import { mangaSearch } from "../controllers/manga/search/index.ts";

const router = new Router();

router.get("/manga/home", mangaHome);
router.get("/manga/search", mangaSearch);
router.post("/manga/chapters", mangaChapters);
router.post("/manga/details", mangaDetails);

export default router;

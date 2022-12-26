import { Router } from "express";
import { coloresPost, coloresPut, coloresGet } from "../controllers/color.js";

const router=Router()

router.post('/color', coloresPost)

router.put('/:id', coloresPut)

router.get('/', coloresGet)

export default router 
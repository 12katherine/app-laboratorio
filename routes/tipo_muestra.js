import {Router} from "express";
import { check } from "express-validator";
import { getTipoMuestra, postTipoMuestra, putTipoMuestra } from "../controllers/tipo_muestra.js";
import Helperstipo_muestra from "../helpers/tipo_muestra.js";
import { validarCampos } from "../middlewares/validar_campos.js";

const router=Router()

router.post('/',postTipoMuestra)

router.get('/',getTipoMuestra)  

router.put('/:id',[
    check('id').isMongoId(),
    check('id').custom(Helperstipo_muestra.existetipo_muestraById),
    validarCampos
],putTipoMuestra) 


export default router;
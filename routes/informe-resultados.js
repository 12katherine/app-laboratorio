import {Router} from "express"
import { check } from "express-validator";
import { activarPut, buscarInformexCodigoDeMuestraGet, buscarInformexNombreDelUsuarioGet, desactivarPut, editarInformeResultadosPut, insertarInformePost, listarTodosInformes } from "../controllers/informe-resultados.js";
import HerlpersDatosMuestra from "../helpers/datos-muestra.js";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";

const router=Router()
    
router.post('/',[
    validarJWT,
    check('fecha_Hora_recepcion_muestras').isMongoId(), 
    check(),
    validarCampos
],insertarInformePost) 
 
router.get('/l',listarTodosInformes)

router.get('/nombre',buscarInformexNombreDelUsuarioGet)

router.get('/codigo',buscarInformexCodigoDeMuestraGet)

router.put('/',[],editarInformeResultadosPut)

router.put('/a',activarPut) 

router.put('/d',desactivarPut)     

export default router;
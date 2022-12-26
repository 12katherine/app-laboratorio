import {Router} from "express"
import { check } from "express-validator";
import HerlpersCotizacion from "../helpers/cotizacion.js"
import HerlpersDatosMuestra from "../helpers/datos-muestra.js"
import HerlpersOdenServicio from "../helpers/order_del_servidor.js"
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import{ DatosMuestraEnsayoMun,DatosMuestraEnsayo, datosMuestraPostt, muestraCodigoGet, listarMuestrasxIdGet, listarMuestrasGet, editarMuestraPut, activarPut, buscarFechaGet} from '../controllers/datos-muestra.js'
import Helperstipo_muestra from "../helpers/tipo_muestra.js";
import HerlpersUsuario from "../helpers/usuarios.js";
const router =Router()



router.post('/insertar',[
    validarJWT,   
    check('solicitante').isMongoId(),
    check('solicitante').custom(HerlpersUsuario.existeUsuarioById),
    check('munRecoleccion'," es obligatorio").not().isEmpty(),
    check('direccionTomaMuestra'," es obligatorio").not().isEmpty(), 
    check('lugarTomaMuestra'," es obligatorio").not().isEmpty(),   
    check('lugarTomaMuestra',"El nombre debe tener menos de 30 caracteres").isLength({max:30}),
    check('muestraRecolectadaPor'," es obligatorio").not().isEmpty(),
    check('muestraRecolectadaPor',"El nombre debe tener menos de 30 caracteres").isLength({max:30}),
    check('procedimientoMuestreo'," es obligatorio").not().isEmpty(),
    check('tipoMuestra'," es obligatorio").not().isEmpty(),
    check('tipoMuestra').custom(Helperstipo_muestra.existetipo_muestraById), 
    check('matrizMuestra'," es obligatorio").not().isEmpty(),
    check('matrizMuestra',"El nombre debe tener menos de 20 caracteres").isLength({max:20}),
    check('fechaRecoleccion'," es obligatorio").not().isEmpty(),
    check('cotizacion'," es obligatorio").not().isEmpty(),
    check('item').not().isEmpty(), 
    validarCampos
], datosMuestraPostt) 

router.get('/codigo',[
    validarCampos
],muestraCodigoGet)

router.get('/MuestrasConEnsayo',DatosMuestraEnsayoMun)

router.get('/cd',buscarFechaGet) 

router.get('/ensayoMunicipio', DatosMuestraEnsayo) 


router.get('/listarId/:id',[
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),   
    validarCampos
],listarMuestrasxIdGet)

router.get('/listarMuestras',listarMuestrasGet)

router.put('/desactivar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),   
    validarCampos
],editarMuestraPut)

router.put('/activar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),   
    validarCampos
],activarPut)




export default router;
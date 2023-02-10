import { Router } from "express"
import { check } from "express-validator";
import HerlpersCotizacion from "../helpers/cotizacion.js"
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HerlpersUsuario from "../helpers/usuarios.js";
import {listarTodasCotizacionesGet,buscarCedulaCliente,Bitacora, ListarConsecutivo, infoCalidad,listarTodasCotizacionesEnProceso, actualizarInfo, buscarPorId, activarPut, buscarFechaGet, buscarPorCodigoGet, buscarPorIdClienteGet, cotizacionPost, desactivarPut, editarCotizacionPut, listarcotizacionesGet, crearConsecutivo } from "../controllers/cotizacion.js";

const router = Router()

router.put('/actualizarInfo/:id', [
    validarJWT,
    validarCampos,
], actualizarInfo)

router.post("/", [
    validarJWT,
    check('idCliente').isMongoId(),
    check('idCliente').custom(HerlpersUsuario.existeUsuarioById),
    // check('idContacto').isMongoId(),
    // check('idContacto').custom(HerlpersUsuario.existeUsuarioById),
    check('fecha_emision', "La fecha de fecha_emision es obligatoria").not().isEmpty(),     
    check('fecha_emision', "Debe de ser tipo fecha").isDate(),
    check('validez_oferta', "La fecha es obligatoria").not().isEmpty(),
    check('validez_oferta', "Debe de ser tipo fecha").isDate(),
    check('entrega_resultados', "La fecha es obligatoria").not().isEmpty(),
    check('entrega_resultados', "Debe de ser tipo fecha").isDate(),
    check('elabordo_por').isMongoId(),
    check('elabordo_por').custom(HerlpersUsuario.existeUsuarioById),
    check('items').custom(HerlpersCotizacion.items),
    // check('observaciones', "Las observaciones es obligatoria"),
    check('subtotal', "El subtotal es obligatoro").not().isEmpty(),
    check('subtotal', "El subtotal debe de ser numerico").isNumeric(),
    check('descuento', "El descuento es obligatoro").not().isEmpty(),
    check('descuento', "El descuento debe de ser numerico").isNumeric(),
    check('iva', "El iva es obligatoro").not().isEmpty(),
    check('iva', "El iva debe de ser numerico").isNumeric(),
    check('total', 'El total es obligatoro').not().isEmpty(),
    check('total', "El total debe de ser numerico").isNumeric(),
    validarCampos
], cotizacionPost);

router.get('/traerBitacora',Bitacora)

router.get('/listarTodasLasCotizaciones', listarcotizacionesGet) 


router.get('/listarlasCotizaciones-k', listarTodasCotizacionesGet)

router.post('/CrearConsecutivo', [
    validarJWT,
    check('numero_cotizacion', "El numero de cotizacion es requerido").not().isEmpty(),
    validarCampos
], crearConsecutivo)
  

router.get('/traerInfo',infoCalidad)

router.get('/listarTodasLasCotizaciones', listarcotizacionesGet)

router.get('/traerConsecutivo',ListarConsecutivo)

router.get('/a', buscarFechaGet)

router.get('/listarporIdCoti/:id', [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
], buscarPorId)

router.get('/buscarCodigo', [
    validarJWT,
    check('numero_cotizacion', "El numero de cotizacion es requerido").not().isEmpty(),
    check('numero_cotizacion').custom(HerlpersCotizacion.existeNumeroCotizacion),
    validarCampos
], buscarPorCodigoGet)

router.get('/buscarNombre/:id', [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
], buscarPorIdClienteGet)

router.put("/:id", [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    check('idCliente').isMongoId(),
    check('idCliente').custom(HerlpersUsuario.existeUsuarioById),
    // check('idContacto').isMongoId(),
    // check('idContacto').custom(HerlpersUsuario.existeUsuarioById),
    check('validez_oferta', "La fecha es obligatoria").not().isEmpty(),
    check('validez_oferta', "Debe de ser tipo fecha").isDate(),
    check('entrega_resultados', "La fecha es obligatoria").not().isEmpty(),
    check('entrega_resultados', "Debe de ser tipo fecha").isDate(),
    check('elabordo_por').isMongoId(),
    check('elabordo_por').custom(HerlpersUsuario.existeUsuarioById),
    check('items').custom(HerlpersCotizacion.items),
    //check('observaciones', "Las observaciones es obligatoria"),
    check('subtotal', "El subtotal es obligatoro").not().isEmpty(),
    check('subtotal', "El subtotal debe de ser numerico").isNumeric(),
    check('descuento', "El descuento es obligatoro").not().isEmpty(),
    check('descuento', "El descuento debe de ser numerico").isNumeric(),
    check('iva', "El iva es obligatoro").not().isEmpty(),
    check('iva', "El iva debe de ser numerico").isNumeric(),
    check('total', 'El total es obligatoro').not().isEmpty(),
    check('total', "El total debe de ser numerico").isNumeric(),
    validarCampos
], editarCotizacionPut);

router.put('/activar/:id', [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos
], activarPut)

router.get('/buscarCedulaCliente/:id', [    
    //check('idCliente', "El ID del cliente es requerido").not().isEmpty(),
    //check('idCliente').custom(HerlpersCotizacion.existeNumeroCotizacion),
    validarCampos
], buscarCedulaCliente) 

router.put('/desactivar/:id', [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos
], desactivarPut) 

// router.put('/activar2/:id', [
//     validarJWT,
//     check('id').isMongoId(),
//     check('id').custom(HerlpersCotizacion.existeCotizacionById),
//     validarCampos
// ], activarPutRespu)

router.get('/cotisestaenProceso',listarTodasCotizacionesEnProceso)

export default router;
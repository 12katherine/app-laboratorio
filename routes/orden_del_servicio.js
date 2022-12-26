import {Router} from "express"
import {getInformeResultados,listartodaslasordenesGet,listaridGet,modificaronPut,modificarsupervisadoPut,Getrealizadopor,supervisadoGet,OrdenactivarPUt,OrdenDesactivarPUt} from "../controllers/orden_de_servicio.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HerlpersDatosMuestra from "../helpers/datos-muestra.js";
import HerlpersEnsayo from "../helpers/ensayo.js";
import HerlpersUsuario from "../helpers/usuarios.js";
import HerlpersOdenServicio from "../helpers/order_del_servidor.js";
 


 
const router=Router()



router.get('/InformeResultados/:id',getInformeResultados) 


router.get("/listartodo",listartodaslasordenesGet); 


router.get("/supervisado/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],supervisadoGet)
 

router.get("/listar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),
    validarCampos
],listaridGet);
   

router.get("/realizado/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],Getrealizadopor)


router.put("/editarRealizadoPor/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),
    check('realizado').isMongoId(),
    check('realizado').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos    
],modificaronPut);


router.put("/EditarSupervisadopor/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),
    check('supervisado').isMongoId(),
    check('supervisado').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],modificarsupervisadoPut);


router.put("/activar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),
    validarCampos
],OrdenactivarPUt)

router.put("/editar_orden/:id",[
    validarJWT,
    check('id').isMongoId(),       
    check('id').custom(HerlpersOdenServicio.existeOrdenById),
    // check('idMuestra').isMongoId(),
    // check('idMuestra').custom(HerlpersDatosMuestra.existeDatosMuestraById),
    // // check('ensayo').isMongoId(),
    // // check('ensayo').custom(HerlpersEnsayo.existeEnsayoById),
    // check('realizado').isMongoId(),
    // check('realizado').custom(HerlpersUsuario.existeUsuarioById),
    // check('supervisado').isMongoId(),   
    // check('supervisado').custom(HerlpersUsuario.existeUsuarioById),   
    validarCampos    
],modificaronPut); 

router.put("/desactivar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),
    validarCampos    
],OrdenDesactivarPUt)






export default router;
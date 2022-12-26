import {Router} from "express"
import {ciudadPut,ciudadesdepartamentoGet,ciudadGetListarTodos,buscarCiudadCodigoGet,buscarCiudadNombreGet,buscarDepartamentoNombreGet,ciudadPost} from "../controllers/ciudad.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HelpersCiudad from "../helpers/ciudad.js"

const router=Router() 

router.post("/",[
    validarJWT,
    check('coddepartamento',"El coddepartamento es obligatorio").not().isEmpty(),
    check('coddepartamento').isNumeric(),
    check('departamento',"El departamento es obligatorio").not().isEmpty(),
    check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
    check('codciudad',"El codciudad es obligatorio").not().isEmpty(),
    check('codciudad').isNumeric(),
    check('codciudad').custom(HelpersCiudad.existeciudadPorCodigo),
    validarCampos,
],ciudadPost)

router.put("/:id",[
    validarJWT, 
    check('coddepartamento',"El coddepartamento es obligatorio").not().isEmpty(),
    check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
    check('codciudad',"El codciudad es obligatorio").not().isEmpty(),
    validarCampos,
],ciudadPut)   

router.get("/CiudadDepartamento",ciudadGetListarTodos)

router.get("/municipio",[
    check('codciudad',"La ciudad es obligatoria").not().isEmpty(),
    validarCampos
    ],buscarCiudadCodigoGet)

router.get("/departamento",[
    check('coddepartamento',"el codigo del departamento es obligatoria").not().isEmpty(),
    check('coddepartamento').custom(HelpersCiudad.existedepartamentoById),
    validarCampos
],ciudadesdepartamentoGet)

router.get("/ciudadnombre",[ 
    check('ciudad',"el codigo de la ciudad es obligatorio").not().isEmpty(),
    validarCampos
],buscarCiudadNombreGet) 


router.get("/departamentonombre",[
    check('departamento',"El nombre del departamento es requerido").not().isEmpty(),
    validarCampos
],buscarDepartamentoNombreGet)



export default router
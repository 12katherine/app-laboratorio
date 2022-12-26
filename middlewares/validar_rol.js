import Usuario from "../models/usuarios.js"
const validarRol = (...roles) => {
    return (req, res, next) => {

      

        if (!(roles.includes(req.Usuario.rol))) {
            return res.status(401).json({ msg: `El servicio requiere uno de estos roles ${roles}` });
        }
        next();
    }
}

export { validarRol }
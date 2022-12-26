import Usuario from "../models/usuarios.js"
import bcryptjs from "bcryptjs"
import {generarJWT} from "../middlewares/validar_jwt.js"
import { v2 as cloudinary } from 'cloudinary'
import Log from "../models/log.js"
 
const usuarioPost=async(req,res)=>{
    const {tipoPersona,nombre,apellidos,documento,direccion,ciudad,departamento,telefono,celular,email,password,cargo,rol,contacto}=req.body
    const salt=bcryptjs.genSaltSync(10)
    const usuario = new Usuario ({tipoPersona,nombre,apellidos,documento,direccion,ciudad,departamento,telefono,celular,email,password,cargo,rol,contacto})
    usuario.email=email.toUpperCase()
    usuario.password=bcryptjs.hashSync(password,salt)
    await usuario.save()
    

    const idUsuario=usuario._id
    const idPost=usuario._id
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPost,ip})
   
    await log.save()
    res.json({ 
        msg:"El registro fue Exitoso"
    })
}

const usuarioPutdatos=async(req,res)=>{ 
    const {id} =req.params
    const {tipoPersona,nombre,apellidos,documento,direccion,ciudad,celular,telefono,cargo,email,password,rol,contacto}=req.body
    let salt=bcryptjs.genSaltSync(10)
    const usuario = await Usuario.findByIdAndUpdate(id,{tipoPersona,nombre,apellidos,documento,direccion,ciudad,celular,telefono,cargo,email,password,rol,contacto})
    usuario.password=bcryptjs.hashSync(password,salt)
    await usuario.save()
     const idUsuario=req.usuario._id
    const idPut= id
   
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPut,ip})
    await log.save()
    res.json({
        usuario
    })
}

const usuarioPutRol=async(req,res)=>{
    const {id} =req.params
    const {rol}=req.body
    const usuario = await Usuario.findByIdAndUpdate(id,{rol})
    await usuario.save()    
    const idUsuario=req.usuario._id
    const idPut= id
    
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPut,ip})
    await log.save()
    res.json({
        usuario
    })
}

const usuarioLogin=async(req, res)=>{
    const {email, password} = req.body;
        try {            
            const usuario = await Usuario.findOne({ email })

            if (!usuario) {
                return res.status(400).json({ 
                    msg: "Usuario / Password no son correctos"
                })
            }
            if (usuario.estado === 0) {
                return res.status(400).json({
                    msg: "Usuario Inactivo"
                })
            }
            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }
            const token = await generarJWT(usuario.id);
            const idUsuario=usuario._id
            const idPost=usuario._id
            const navegador=req.headers['user-agent']
            const ip=req.socket.remoteAddress
            const log= new Log({idUsuario,idPost,navegador,ip})
            await log.save()
            res.json({
                usuario,
                token
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
}

const usuarioGetListarTodos=async(req,res)=>{
    const usuarios= await Usuario.find()
    .populate({
        path:"contacto",
    })
    .populate({
        path:"ciudad",
    })
    res.json({
        usuarios
    })
}



const usuarioListarClientes=async(req,res)=>{
    const usuarios= await Usuario.find({rol:"CLIENTE"})
    .populate({
        path:"ciudad",
    })
    .populate({
        path:"contacto",
        populate:{
            path:"ciudad"
        }
    })
    res.json({
        usuarios
    })
}

const usuarioGetListarid=async(req,res)=>{
    const {id}=req.params
    const usuario =await Usuario.findOne({id}) 
    res.json({
        usuario
    })
}
const usuarioListarContactos=async(req,res)=>{
    const usuarios= await Usuario.find({rol:"CONTACTO"}) 
    .populate({
        path:"ciudad",
    })
    res.json({
        usuarios
    })
}
 
const buscarCedulaCliente=async (req, res) => {
    const {id}=req.params;
    const cotiz = await Usuario.aggregate( // (1) padre
        [
            {
                $lookup:
                {
                    from:"ciudads", // (2) hijo
                    localField: "idciudad", // (1) padre - id de usuarios coincida con
                    foreignField:"_id",// (2) el id de ciudad                     
                    as:'clientesCiudades'
                }                 
            },
            {$match:{documento: id}},
           // {$unwind: "$clientesCiudades"},
             {$replaceRoot:{newRoot:{$mergeObjects:[{$arrayElemAt:['$clientesCiudades',0]},"$$ROOT"]}}},
             {$project:
                {
                departamento: 1,
                ciudad: 1,
                documento: 1,
                telefono: 1,
                email: 1,
                direccion: 1,
                celular: 1
                }
            }
        ]
    )  
    res.json({cotiz})  
}

const usuarioGet=async(req,res)=>{
    const usuarios= await Usuario.find({$or:[{rol:"CLIENTE"},{rol:"CONTACTO"}]})
    .populate({
        path:"contacto",
    })
    .populate({
        path:"ciudad",
    })
    res.json({
        usuarios
    })
}


const usuarioGetListarNombre=async(req, res)=>{
    const {nombre}=req.query;
    const nombres = await Usuario.find(
      
        {
            $or: [
                { nombre: new RegExp(nombre, "i") },
            ]
        }
    ) 
    res.json({nombres})
}

const usuarioGetListarTodosUsuarios=async(req,res)=>{
    const usuarios= await Usuario.find({$and:[{rol:{$ne:"CLIENTE"}},
    {rol:{$ne:"CONTACTO"}}]})
    .populate({
        path:"contacto",
    })
    .populate({
        path:"ciudad",
    })
    res.json({
        usuarios
    })
}

const mostrarImagenCloud= async (req, res) => {
    const { id } = req.params

    try {
        let usuario = await Usuario.findById(id)
        if (usuario.foto) {
            return res.json({ url: usuario.foto })
        }
        
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}


const cargarArchivoCloudPut= async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true
    });

    const { id } = req.params;
    try {
        //subir archivo
        const { tempFilePath } = req.files.archivo
        cloudinary.uploader.upload(tempFilePath,
            { width: 250, crop: "limit" },
            async function (error, result) {
                if (result) {
                    let usuario = await Usuario.findById(id);
                    if (usuario.foto) {
                        const nombreTemp = usuario.foto.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    usuario = await Usuario.findByIdAndUpdate(id, { foto: result.url })
                    const idUsuario=req.usuario._id
                    const idPut= id
                    
                    const ip=req.socket.remoteAddress
                    const log=new Log({idUsuario,idPut,ip})
                    await log.save()
                    //responder
                    res.json({ url: result.url });
                } else {
                    res.json(error)
                }
            })
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
}

const usuarioPutActivar=async(req,res)=>{
    const {id}=req.params
    const activar =await Usuario.findByIdAndUpdate(id,{estado:1})
    const idUsuario=req.usuario._id
    const idPut=id
    
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPut,ip})
    await log.save()
    res.json({
        "msg":"El usuario esta activado con exito",
        activar
    })
}

const usuarioPutDesactivar=async(req,res)=>{
    const {id}=req.params
    const desactivar =await Usuario.findByIdAndUpdate(id,{estado:0})
    const idUsuario=req.usuario._id
    const idPut=id
   
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPut,ip})
    await log.save()
    res.json({
        "msg":"Usuario desactivado con exito",
        desactivar
    })
}


export {usuarioListarClientes,
    usuarioPost,usuarioPutdatos,usuarioPutRol,
    usuarioPutActivar,usuarioPutDesactivar,
    cargarArchivoCloudPut,usuarioLogin,
    usuarioGetListarTodos,mostrarImagenCloud,
    usuarioGetListarid,usuarioGetListarNombre,usuarioListarContactos
,usuarioGetListarTodosUsuarios,usuarioGet,buscarCedulaCliente}




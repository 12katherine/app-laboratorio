import Ensayo from "../models/ensayo.js";
 import Log from "../models/log.js";

 const ensayoPost=async(req,res)=>{
    const {ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,descripcion,limiteCuantificacion,responsables}=req.body
    const ensayoPostt = new Ensayo ({ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,descripcion,limiteCuantificacion,responsables})
    await ensayoPostt.save()
    const idUsuario=req.usuario._id
    const idPost=ensayoPostt._id
    // const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPost,ip})
    // navegador,
    await log.save()
    res.json({
        ensayoPostt
    })
}

const ensayoPut = async (req,res)=>{
    const {id}=req.params
    const {ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,estado,descripcion,limiteCuantificacion,responsables}=req.body
    const ensayoput =await Ensayo.findByIdAndUpdate(id,{ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,estado,descripcion,limiteCuantificacion,responsables})

    const idUsuario=req.usuario._id
    const idPut= id
    //const texto=`El usuario: ${req.usuario.nombre} ha editado un ensayo`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,ip}) 
    await log.save()

    res.json({
        "msg":"Actualizacion fue Exitosa " 
    })

}
const ensayoPutActivar=async(req,res)=>{
    const {id}=req.params
    const activar =await Ensayo.findByIdAndUpdate(id,{estado:1})
    const idUsuario=req.usuario._id
    const idPut= id
    // const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,ip})
    // navegador,
    await log.save()
    res.json({
        "msg":"El ensayo esta activado con exito"
    })
}

const ensayoPutDesactivar=async(req,res)=>{
    const {id}=req.params
    const desactivar =await Ensayo.findByIdAndUpdate(id,{estado:0})
    const idUsuario=req.usuario._id
    const idPut= id
    // const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,ip})
    // navegador,
    await log.save()
    res.json({
        "msg":"El ensayo esta desactivado con exito"
    })
}

const ensayoGetTodos=async(req,res)=>{
    const ensayo= await Ensayo.find()
    .populate({
        path:"responsables.titular",
        populate:{
            path:"ciudad"    
        }
    })
    .populate({        
        path:"responsables.suplente",
        populate:{
            path:"ciudad"
        }
    })
    res.json({
        ensayo
    }) 
}

const ensatoGetbyId=async(req,res)=>{
    const {id}=req.params
    const ensayo =await Ensayo.findOne({id})
    res.json({
        ensayo
    })
}

export {ensayoPost,ensayoPut,ensayoGetTodos,ensatoGetbyId,ensayoPutDesactivar,ensayoPutActivar}
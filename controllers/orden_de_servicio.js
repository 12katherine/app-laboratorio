import Orden_del_servicio from "../models/orden_de_servicio.js"
import Log from "../models/log.js";


//GET listar todas las ordenes del servicio

const listartodaslasordenesGet=async(req, res)=>{
    const ordenservi=await Orden_del_servicio.find()
    res.json({ordenservi})
}                        

//GET listar orden de servicio por idMuestra 

const listaridGet=async(req, res)=>{
    const {id}=req.params;
    const listaridGet=await Orden_del_servicio.findById(id)
    res.json({listaridGet})
}


//GET supervisado-por
const supervisadoGet=async(req, res)=>{
    const {id}=req.params
    const sup=await Orden_del_servicio.find({supervisado:id})
    res.json({sup})
}

//GET realisada por
const Getrealizadopor=async(req, res)=>{
    const {id}=req.params
    const realizadopor=await Orden_del_servicio.find({realizado:id})
    res.json({realizadopor})
}

//PUT Modificar datos de la orden realizado por 

const modificaronPut=async(req,res)=>{
    const {id}=req.params
    const orden= await Orden_del_servicio.findById(id)
    const {idensayo} = req.body
    const {realizado}=req.body
    const index= orden.ensayo.findIndex(item => item.idensayo==idensayo)
    if (index>=0){
        orden.ensayo[index].realizado=realizado
        const editar=await Orden_del_servicio.findByIdAndUpdate(id,{ensayo:orden.ensayo})
        const idUsuario=req.usuario._id
        const idPost=id
        // const navegador=req.headers['user-agent']
        const ip=req.socket.remoteAddress
        const log=new Log({idUsuario,idPost,ip})
        // navegador,
        await log.save()
        res.json({
            "msg":'La modificacion fue realizada con exito',
            editar
        })
    }
}

//PUT Modificar datos de la orden supervisado por

const modificarsupervisadoPut=async(req,res)=>{
    const {id}=req.params
    const orden= await Orden_del_servicio.findById(id)
    const {idensayo} = req.body
    const {supervisado}=req.body
    const index= orden.ensayo.findIndex(item => item.idensayo==idensayo)
    if (index>=0){
        orden.ensayo[index].supervisado=supervisado
        const editar=await Orden_del_servicio.findByIdAndUpdate(id,{ensayo:orden.ensayo})
        const idUsuario=req.usuario._id
        const idPost=id
        // const navegador=req.headers['user-agent']
        const ip=req.socket.remoteAddress
        const log=new Log({idUsuario,idPost,ip})
        // navegador,
        await log.save()
        res.json({
            "msg":'La modificacion fue realizada con exito',
            editar
        })
    }
}

//PUT Activar orden
const OrdenactivarPUt=async(req,res)=>{
    const {id}=req.params
    const activar =await Orden_del_servicio.findByIdAndUpdate(id,{estado:1})
    const idUsuario=req.usuario._id
    const idPut= id
    // const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,ip})
    // navegador,
    res.json({
        "msg":"El usuario esta activado con exito"
    })
}

//PUT Desactivar orden
const OrdenDesactivarPUt=async(req,res)=>{
    const {id}=req.params
    const desactivar =await Orden_del_servicio.findByIdAndUpdate(id,{estado:0})
    const idUsuario=req.usuario._id
    const idPut= id
    // const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,ip})
    // navegador,
    res.json({
        "msg":"El usuario esta desactivado con exito"
    })
}


const getInformeResultados=async(req, res)=>{
    const {id}=req.params;
    const orden= await Orden_del_servicio.findById(id)
    .populate({
        path:"idMuestra",
        populate:{
            path:"solicitante",
            populate:{
                path:"ciudad"
            } 
        }
    })
    .populate({
        path:"idMuestra",
        populate:{
            path:"munRecoleccion"
        }
    })
    .populate({
        path:"idMuestra",
        populate:{
            path:"tipoMuestra"
        }
    })
    .populate({
        path:"idMuestra",
        populate:{
            path:"solicitante",
            populate:{
                path:"contacto",
                populate:{
                    path:"ciudad"
                }
            }
        }
    })
    .populate({
        path:"idMuestra",
        populate:{
            path:"cotizacion"
        }
    })
    .populate({
        path:"ensayo.idensayo"
    })
    .populate({
        path:"ensayo.realizado"
    })
    .populate({
        path:"ensayo.supervisado"
    })
    res.json({
        orden
    })
}

const resultadosPut=async(req, res)=>{
    const {id}=req.params;
    const orden=await Orden_del_servicio.findById(id)
    for (let i = 0; i < orden.ensayo.length; i++) {
        const {resultado,incertidumbre}=req.body
    }
}

export{listartodaslasordenesGet,
    listaridGet,
    modificaronPut,
    modificarsupervisadoPut,
    OrdenactivarPUt,
    OrdenDesactivarPUt,
    Getrealizadopor,
    supervisadoGet,
    getInformeResultados,
    } 
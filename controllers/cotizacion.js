import Cotizacion from "../models/cotizacion.js";
import Consecutivo from "../models/consecutivo.js";
import Log from "../models/log.js";
import Usuarios from "../models/usuarios.js";
import calidad from "../models/calidad.js"

const buscarCedulaCliente=async (req, res) => {
    const {id}=req.params;
    const cotiz = await Usuarios.aggregate( // (1) padre
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
                nombre: {$concat:['$nombre',' ','$apellidos']},     
                departamento: 1,
                ciudad: 1,
                documento: 1,
                telefono: 1,
                email: 1,
                direccion: 1,
                celular: 1,
                cargo: 1
                }
            }
        ]
    )    
    
    const cotiz2=await Cotizacion.find(
        {idCliente:cotiz[0]._id},   
        
        
        );
    
    const cotiz3=await Usuarios.find(
        {_id:cotiz2[0].idContacto}, 
    
        );
        
    const cotiz4=await Usuarios.find(
        {_id:cotiz2[0].elabordo_por},
        ); 
  
   const obj1 = [...cotiz2,...cotiz,...cotiz4,...cotiz3]   
    res.json({obj1})
}


const infoCalidad=async(req,res)=>{
    const info= await Consecutivo.find()
    res.json({
        info
    })
}

const Bitacora=async(req,res)=>{
    const bitacora= await Log.find()
    .populate({
        path:"idUsuario",
    })
    res.json({
        bitacora
    })
}

///ej: 0001-2022V1    

const numeros=(numero_cotizacion)=>{
    if(numero_cotizacion){

        let date = new Date();
        let output = String(date.getFullYear());
        if(numero_cotizacion.toString().length===1){
           return `000${numero_cotizacion}-${output}V${1}`
        }else if (numero_cotizacion.toString().length===2){
            return `00${numero_cotizacion}-${output}V${1}`
        }else if (numero_cotizacion.toString().length===3){
            return `0${numero_cotizacion}-${output}V${1}`
        }else if (numero_cotizacion.toString().length===4){
            return `${numero_cotizacion}-${output}V${1}`
        }
    }
}

const cotizacionPost=async(req,res)=>{
    const consecutivo=await Consecutivo.findOne()
    if(consecutivo){
        const numero_cotizacion=numeros(consecutivo.numero_cotizacion)
        const {fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud}=req.body
        const cotiz=new Cotizacion({numero_cotizacion,fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud})
        await cotiz.save()
        const nuevo=consecutivo.numero_cotizacion+1
        await Consecutivo.findByIdAndUpdate(consecutivo._id,{numero_cotizacion:nuevo})
        const idUsuario=req.usuario._id
        const idPost=cotiz._id
        // const navegador=req.headers['user-agent']
        const ip=req.socket.remoteAddress
        const log=new Log({idUsuario,idPost,ip})
        // ,navegador
        await log.save()
        res.json({
            "msg":"La cotizacion fue creada exitosamente"
        })
    }
}

const buscarPorId=async(req, res) => {
    const{id}=req.params;
    const cotiz = await Cotizacion.findById(id) 
    const items=[]
    if(cotiz.items.item1.itemsEnsayo!=0){
        items.push("Item1")
    }
    if(cotiz.items.item2.itemsEnsayo!=0){
        items.push("Item2")
    }
    if(cotiz.items.item3.itemsEnsayo!=0){
        items.push("Item3") 
    }
    res.json({
        items
    })
}

const listarcotizacionesGet=async(req, res)=>{
    const cotiz=await Cotizacion.find({estado:1})
    .populate({
        path:'idCliente',
        populate:{
            path:"ciudad"
        }
    })
    .populate({
        path:"idCliente",
        populate:{
            path:"contacto",
            populate:{
                path:"ciudad"
            }
        }
    })
    .populate({
        path:'elabordo_por',
        populate:{
            path:"ciudad"
        }
    })
    .populate("items.item1.itemsEnsayo.ensayo")
    .populate("items.item2.itemsEnsayo.ensayo")
    .populate("items.item3.itemsEnsayo.ensayo")
    res.json({cotiz})
}


const crearConsecutivo =async(req, res) => {
    const{numero_cotizacion}=req.body;
    const consecutivoss = new Consecutivo({numero_cotizacion})
    await consecutivoss.save()
    const idUsuario=req.usuario._id 
    const idPost=consecutivoss._id
    // const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPost,ip})
    // ,navegador
    await log.save()
    res.json({
        "msg":"El consecutivo fue Creado"
    })   

}

const buscarPorCodigoGet=async(req, res)=>{
    const {numero_cotizacion}=req.query;
    const cotiz=await Cotizacion.find({numero_cotizacion})
    res.json({cotiz})
}

const buscarPorIdClienteGet=async(req, res)=>{
    // const {id}=req.params;
    // const coti=await Cotizacion.find({$and:[{idCliente:{$eq:id}},{estado:{$eq:1}}]}) //{idCliente:id}
    // .populate({
    //     path:'idCliente',
    //     populate:{
    //         path:"ciudad"
    //     }
    // })
    // .populate({
    //     path:"idCliente",
    //     populate:{
    //         path:"contacto",
    //         populate:{
    //             path:"ciudad"
    //         }
    //     }
    // })
    // .populate({
    //     path:'elabordo_por',
    //     populate:{
    //         path:"ciudad"
    //     }
    // })
    // .populate("items.item1.itemsEnsayo.ensayo")
    // .populate("items.item2.itemsEnsayo.ensayo")
    // .populate("items.item3.itemsEnsayo.ensayo")
    // res.json({coti})

    const {id}=req.params;
    const cotiz=await Cotizacion.find().where('idCliente').in(id).exec();
    res.json({cotiz})

}
  

const buscarFechaGet=async(req, res)=>{
    const{fecha1,fecha2}=req.query;
    const cotiz=await Cotizacion.find({$and:[{fecha_emision: { $gte : fecha1 , $lte : fecha2}}]})
    res.json({cotiz})
}

const editarCotizacionPut=async(req, res)=>{
    const {id}=req.params;
    const a=await Cotizacion.findById(id)
    const numero_cotizacion=cambiar(a.numero_cotizacion)
    const {fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud}=req.body;
    const cotiz=new Cotizacion({numero_cotizacion,fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud})
    await cotiz.save()
    const desactivar=await Cotizacion.findByIdAndUpdate(id,{estado:0})
    const idUsuario=req.usuario._id
    const idPut= id
    // const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,ip}) 
    // ,navegador        
    await log.save()
    res.json({
        "msg":"La cotizacion fue editada con exito" 
    })
}
 
const cambiar=(numero_cotizacion)=>{
    const division=Number(numero_cotizacion.split("")[numero_cotizacion.length-1])
    const sumar=division+1
    const cambio=numero_cotizacion.replace(/.$/,sumar)
    return cambio   
}

const buscarPorIdUsuarioGet=async(req, res)=>{
    const {id}=req.params;
    const cotiz=await Cotizacion.find().where('elabordo_por').in(id).exec();
    res.json({cotiz})
}

const activarPut=async(req, res)=>{
    const {id}=req.params;
    const activar=await Cotizacion.findByIdAndUpdate(id,{estado:1}) 
    // const idUsuario=req.usuario._id
    // const idPut= id
    // const ip=req.socket.remoteAddress
    // const log=new Log({idUsuario,idPut,ip})
    // await log.save()

    res.json({
        "msg":"La cotizacion esta en estado activo"
    })
}

const desactivarPut=async(req, res)=>{
    const {id}=req.params;
    const {motivo}=req.body;
    const desactivar=await Cotizacion.findByIdAndUpdate(id,{estado:0})
    // const idUsuario=req.usuario._id
    // const idPut= id
    // const ip=req.socket.remoteAddress
    // const log=new Log({idUsuario,idPut,ip})
    // await log.save()
    res.json({
        "msg":"La cotizacion esta en estado rechazado"
    })
}

const actualizarInfo=async(req, res)=>{
    const {id}=req.params;
    const {numero_cotizacion,informe_No,codMuestra,iva,descripcion,nit,direccion,telefono,correo}=req.body;
    const actualizar=await Consecutivo.findByIdAndUpdate(id,{numero_cotizacion,informe_No,codMuestra,iva,descripcion,nit,direccion,telefono,correo})
    const idUsuario=req.usuario._id
    const idPut= id
    // const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress 
    const log=new Log({idUsuario,idPut,ip})
    // ,navegador
    await log.save()
    res.json({
        "msg":"Actualizacion fue con exito",
        actualizar
    })
}

const ListarConsecutivo=async(req, res)=>{
    const consecutivo=await Consecutivo.find()
    res.json({consecutivo})
}

const listarTodasCotizacionesGet=async(req, res)=>{
    const coti=await Cotizacion.find({estado:0})
    .populate({
        path:'idCliente',
        populate:{
            path:"ciudad"
        }
    })
    .populate({
        path:"idCliente",
        populate:{
            path:"contacto",
            populate:{
                path:"ciudad"
            }
        }
    })
    .populate({
        path:'elabordo_por',
        populate:{
            path:"ciudad"
        }
    })
    .populate("items.item1.itemsEnsayo.ensayo")
    .populate("items.item2.itemsEnsayo.ensayo")
    .populate("items.item3.itemsEnsayo.ensayo")
    res.json({coti})
}

const listarTodasCotizacionesEnProceso=async(req, res)=>{
    const coti=await Cotizacion.find({estado:2})
    .populate({
        path:'idCliente',
        populate:{
            path:"ciudad"
        }
    })
    .populate({
        path:"idCliente",
        populate:{
            path:"contacto",
            populate:{
                path:"ciudad"
            }
        }
    })
    .populate({
        path:'elabordo_por',
        populate:{
            path:"ciudad"
        }
    })
    .populate("items.item1.itemsEnsayo.ensayo")
    .populate("items.item2.itemsEnsayo.ensayo")
    .populate("items.item3.itemsEnsayo.ensayo")
    res.json({coti})
}


// const activarPutRespu=async(req, res)=>{
//     const {id}=req.params;
//     const activar=await Cotizacion.findByIdAndUpdate(id,{estado:1,motivo:""}) 
//     const idUsuario=req.usuario._id
//     const idPut= id
//     const texto=`El usuario: ${req.usuario.nombre} ha activado una cotización`
//     const ip=req.socket.remoteAddress
//     const log=new Log({idUsuario,idPut,texto,ip})
//     await log.save()

//     res.json({
//         "msg":"La cotización esta en estado confirmado"
//     })
// }





export {ListarConsecutivo,buscarCedulaCliente,listarTodasCotizacionesGet, 
    Bitacora,infoCalidad,listarTodasCotizacionesEnProceso,
    actualizarInfo,buscarPorId,
    cotizacionPost,listarcotizacionesGet,
    buscarPorCodigoGet,buscarPorIdClienteGet,
    editarCotizacionPut,activarPut,desactivarPut,
    crearConsecutivo,buscarPorIdUsuarioGet,buscarFechaGet}

    
       
       
        
      
      
       


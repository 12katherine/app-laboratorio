import InformeR from "../models/informe-resultados.js";
import Consecutivo from "../models/consecutivo.js";

const insertarInformePost=async(req, res)=>{
    const consecutivo=await Consecutivo.findOne()
    if(consecutivo){
        const informe_No=consecutivo.informe_No
        const {fecha_Hora_recepcion_muestras,datos_solicitante,datos_muestra,fecha_analisis,metodo,estado,ensayo,tecnica,resultado,incertidumbre_espandida,valor_maximo,valor_minimo,unidades,observaciones,reviso,aprobo}=req.body
        const informe=new InformeR({informe_No,fecha_Hora_recepcion_muestras,datos_solicitante,datos_muestra,fecha_analisis,metodo,estado,ensayo,tecnica,resultado,incertidumbre_espandida,valor_maximo,valor_minimo,unidades,observaciones,reviso,aprobo})
        await informe.save()
        const nuevo=consecutivo.informe_No+1
        await Consecutivo.findByIdAndUpdate(consecutivo._id,{informe_No:nuevo})
        res.json({
            "msg":"El informe fue creado correctamente" 
        }) 
    }
} 

const listarTodosInformes=async(req,res)=>{ 
    const informer=InformeR.find()
    res.json({informer}) 
}  

const buscarInformexNombreDelUsuarioGet=async(req, res)=>{
    const {nombre}=req.query;
    const informe=await InformeR.find()
    .populate("datos_solicitante","nombre")
    const filtro=informe.filter((usuario)=>usuario.datos_solicitante.nombre===nombre)
    res.json({filtro})
} 
 

const buscarInformexCodigoDeMuestraGet=async(req, res)=>{ 
    const {CodigoMuestra}=req.query;
    const informe=await InformeR.find()
    .populate("datos_muetra","codigo_muestra")
    const filtro=informe.filter((codigo_m)=>codigo_m.datos_muestra.codigo_muestra===CodigoMuestra)
    res.json({filtro})
}


const editarInformeResultadosPut=async(req, res)=>{
    const {fecha_Hora_recepcion_muestras,datos_solicitante,datos_muestra,fecha_analisis,metodo,estado,ensayo,tecnica,resultado,incertidumbre_espandida,valor_maximo,valor_minimo,unidades,observaciones,reviso,aprobo}=req.body
    const {id}=req.params;
    const editar=await InformeR.findByIdAndUpdate(id,{fecha_Hora_recepcion_muestras,datos_solicitante,datos_muestra,fecha_analisis,metodo,estado,ensayo,tecnica,resultado,incertidumbre_espandida,valor_maximo,valor_minimo,unidades,observaciones,reviso,aprobo})
    res.json({
        "msg":"El informe fue editado con exito" 
    })
}

const activarPut=async(req, res)=>{
    const {id}=req.params;
    const activar=await InformeR.findByIdAndUpdate(id,{estado:1})
    res.json({
        "msg":"La cotizacion esta activada"
    })
}

const desactivarPut=async(req, res)=>{
    const {id}=req.params;
    const desactivar=await InformeR.findByIdAndUpdate(id,{estado:0})
    res.json({
        "msg":"La cotizacion esta desactivada"
    })
}



export {insertarInformePost,buscarInformexNombreDelUsuarioGet,
    buscarInformexCodigoDeMuestraGet,listarTodosInformes,
    editarInformeResultadosPut, activarPut, desactivarPut}


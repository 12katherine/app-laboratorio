import mongoose from "mongoose";

const InformeRSchema= new mongoose.Schema({
    informe_No:{type:Number},
    fecha_Hora_recepcion_muestras:{type:mongoose.Schema.ObjectId,ref:"datos-muestra",required:true},
    fecha_Hora_emicion_informe:{type:Date,default:Date.now()},
    datos_solicitante:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    datos_muestra:{type:mongoose.Schema.ObjectId,ref:"datos-muestra",required:true},
    fecha_analisis:{type:Date}, 
    metodo:{type:String,required:true},
    estado:{type:String,required:true},
    ensayo:{type:String,required:true},
    tecnica:{type:String,required:true},
    resultado:{type:String,required:true},
    incertidumbre_espandida:{type:String,required:true},     
    valor_maximo:{type:Number,required:true},
    valor_minimo:{type:Number,required:true},
    unidades:{type:String,required:true},
    observaciones:{type:String,required:true},       
    reviso:{type:String,required:true},
    aprobo:{type:String,required:true},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now()} 
})

export default mongoose.model("InformeR",InformeRSchema)
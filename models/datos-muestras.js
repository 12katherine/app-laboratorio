import mongoose from "mongoose";  
const DatosMuestraSchema = new mongoose.Schema({
    solicitante: {type: mongoose.Schema.ObjectId,ref: "Usuario",required: true},///  0001-2022       
    codMuestra: {type: String},
    munRecoleccion: {type: mongoose.Schema.ObjectId,ref: "Ciudad",required: true},
    direccionTomaMuestra: {type: String,required: true},
    lugarTomaMuestra: {type: String,required: true},
    muestraRecolectadaPor: {type: String,required: true},
    procedimientoMuestreo: {type: String,required: true,default:"????????????????"},//averiguar
    tipoMuestra: {type: mongoose.Schema.ObjectId,ref: "tipoMuestra",required: true},//en bloque  pulverizada
    matrizMuestra: {type: String,required: true,default:"Panela"},//Panela
    fechaRecoleccion: {type: Date,required: true},///UTC horario estandar global +5 UTC colombia
    cotizacion: {type: mongoose.Schema.ObjectId,ref: "Cotizacion",required: true},
    item: {type: String,required: true,default:"Item1"},
    estado: {type: Number,default: 1},
    createdAt: {type: Date,default: Date.now()},
})

export default mongoose.model("datos-muestra",DatosMuestraSchema)
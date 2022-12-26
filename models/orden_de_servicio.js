import mongoose from "mongoose";

const Ordenschema = new mongoose.Schema({
    idMuestra: {type: mongoose.Schema.ObjectId,ref: "datos-muestra",required: true},
    ensayo: [{
        idensayo:   {type: mongoose.Schema.ObjectId,ref: "Ensayo",required: true},
        realizado:  {type: mongoose.Schema.ObjectId,ref: "Usuario"},
        supervisado:{type: mongoose.Schema.ObjectId,ref: "Usuario"}, 
        resultado:{ type: Number, default: "" },
        incertidumbre:{ type: Number, default: "" },
        estado: {type: String,default: "En proceso"},
    }],
    observaciones: {type: String,default: ""},
    fecha:{type: Date},
    estado: {type: Number,default: 1},
    createdAt: {type: Date,default: Date.now}
})

export default mongoose.model('Orden', Ordenschema)

// asisgnar los itemes  a cada usuario 
// put responsable 👍
// put supervisor👍
// put resultado👍
// get informe de resultado👍

// get de muestras muy grande 

// grafico de cotizacion de segiumiento, listado de cotizaciones soques
// orden donde permita enciar el resultado por el correo
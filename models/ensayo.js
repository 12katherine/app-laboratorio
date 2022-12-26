import mongoose from 'mongoose';

const EnsayoSchema= new mongoose.Schema({
    ensayo:{type: String,required: true,unique:true},
    metodo:{type: String,required: true,},
    tecnica:{type: String,required: true,},
    valorMinimo:{type: String,required: true,default:"N.A."},
    valorMaximo:{type: String,required: true,default:"N.A."},
    unidades:{type: String,required: true,default:"fracción en masa en %"},
    costo:{type: Number,required: true,default:0},
    descripcion:{type: String}, 
    limiteCuantificacion: { type: Number, required: true },
    responsables:{
        titular:{ type: mongoose.Schema.ObjectId, ref: "Usuario" },
        suplente:{ type: mongoose.Schema.ObjectId, ref: "Usuario" }
    },
    estado:{type: Number,default:1},
    createdAt:{type:Date,default:Date.now()}
})

export default mongoose.model("Ensayo",EnsayoSchema)      

//ensayo estado y tecnica
//usuario tipo persona y contacto modificado
//oferta items
//muestra contacto   
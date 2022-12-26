import mongoose from "mongoose";

const CotizacionSchema= new mongoose.Schema({
    numero_cotizacion:{type:String},
    fecha_emision:{type:Date,required:true,default:Date.now()},
    idCliente:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    idContacto:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    validez_oferta:{type:Date,required:true},
    entrega_resultados:{type:Date,required:true},
    elabordo_por:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    items: {
        item1:{
            itemsEnsayo: [{
                ensayo: {type: mongoose.Schema.ObjectId, ref: "Ensayo", required: true},
                costoEnsayo: { type: Number, required: true },
            }], 
            costo:{type:Number,default:0}           
        },
        item2:{
            itemsEnsayo: [{
                ensayo: {type: mongoose.Schema.ObjectId, ref: "Ensayo"},
                costoEnsayo: {type: Number},
            }], 
            costo:{type:Number,default:0}  
        },
        item3:{
            itemsEnsayo: [{
                ensayo: {type: mongoose.Schema.ObjectId, ref: "Ensayo"},
                costoEnsayo: { type: Number},
            }], 
            costo:{type:Number,default:0} 
        },
    },
    observaciones:{type:String,default:""},
    // motivo:{type:String,default:""},
    subtotal:{type:Number,required:true},
    
    descuento:{type:Number,required:true},
    iva:{type:Number,required:true},
    total:{type:Number,required:true},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now()}
})

export default mongoose.model("Cotizacion",CotizacionSchema)
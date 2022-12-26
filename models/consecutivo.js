import mongoose from "mongoose";

const ConsecutivoSchema= new mongoose.Schema({
    numero_cotizacion:{type:Number,default:1},
    informe_No:{type:Number,default:1},
    codMuestra:{type:Number,default:1},
    iva:{type:Number},
    descripcion:{type:String, default:"Laboratorio de Caracterización Fisicoquímica de Alimentos del Centro Agroturístico “LABFICAT” de San Gil, Santander"},
    nit:{type:String, default:"899.999.034"},
    direccion:{type:String, default:"Calle 22 No. 09 – 82, San Gil, Santander"},
    telefono:{type:String, default:"(607) 7248113"},
    correo:{type:String, default:"labficat@sena.edu.co"},
    
})

export default mongoose.model("Consecutivo",ConsecutivoSchema)
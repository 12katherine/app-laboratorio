import mongoose from "mongoose";

const CiudadSchema = new mongoose.Schema({
  coddepartamento: {type:String , required:true},
  departamento:{type:String , required:true },
  ciudad: {type: String ,required: true},
  codciudad: {type:String ,required: true},
});

export default mongoose.model("Ciudad", CiudadSchema); 
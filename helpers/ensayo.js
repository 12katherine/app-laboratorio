import Ensayo from "../models/ensayo.js";
import { validarResponsable } from "../middlewares/validar_mongoid.js";

const HelpersEnsayo= {
  existeEnsayoById: async (id) => {
    const existe = await Ensayo.findById(id)
    if (!existe) {
      throw new Error(`El id no existe ${id}`)
    }
  },

  existeEnsayoById2: async (id) => {
    const existe = await Ensayo.findById(id)
    if (!existe) {
      return false
    }
    return true
  },

  existeEnsayo: async (ensayo) => {
    if (ensayo) {
      const existe = await Ensayo.findOne({ ensayo });
      if (existe) throw new Error("Ensayo ya existe en la bd");
    }
  },

  responsabless: async (responsable) => {
    if (responsable.titular!="") { 
      await validarResponsable(responsable.titular).catch(err => {
        throw new Error("Responsable Titular"+err);
      });
    }else{
      throw new Error("Falta id del Titular");
    }
    if (responsable.suplente!="") { 
      await validarResponsable(responsable.suplente).catch(err => {
        throw new Error("Responsable Suplente"+err);
      });
    }else{
      throw new Error("Falta id del Suplente");
    }
  }
}


export default HelpersEnsayo;
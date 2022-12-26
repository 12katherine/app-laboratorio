import Usuario from "../models/usuarios.js";

const HerlpersUsuario = {
  existeEmail: async (email) => {
    if (email) {
      const existe = await Usuario.findOne({ email });
      if (existe) throw new Error("Email ya existe en la bd");
    }
  },

  existeUsuarioById: async (id) => {
    const existe = await Usuario.findById(id)
    if (!existe) {
      throw new Error(`El id  ${id} no existe`)
    }
  },

  existeUsuarioById2: async (id) => {
    const existe = await Usuario.findById(id)
    if (!existe) {
      return false
    }
    return true
  },

  existeUsuarioNombre: async (nombre) => {
    const Existe= await Usuario.findOne({nombre})
    if (!Existe) {
      throw new Error(`El nombre: ${nombre} no existe`)
    }
  },

  

  noexisteEmail:async(email)=>{
    if(email){
        const existe=await Usuario.findOne({email})
        if(!existe) throw new Error("Correo no existe BD")
    }
  },

  existeDocumento: async (documento) => {
    if (documento) {
      const existe = await Usuario.findOne({ documento });
      if (existe) throw new Error("Documento ya existe en la BD");
    }
  },
}

export default HerlpersUsuario;
import DatosMuestra from "../models/datos-muestras.js";

const HerlpersDatosMuestra = {
  existeDatosMuestraById: async (id) => {
    const existe = await DatosMuestra.findById(id);
    if (!existe) {
      throw new Error(`El ID no existe ${id}`);
    }
  },

};

export default HerlpersDatosMuestra;
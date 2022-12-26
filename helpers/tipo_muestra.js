import tipo_muestra from "../models/tipo_muestra.js";

const Helperstipo_muestra = {
    existetipo_muestraById: async (id) => {
        const existe = await tipo_muestra.findById(id)
        if (!existe) {
          throw new Error(`El id  ${id} no existe`)
        }
      },
}
export default Helperstipo_muestra;
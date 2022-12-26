import InformeR from "../models/informe-resultados.js"

const HelpersInformeR = {
    existeinformeById: async (id) => {
        const existe = await InformeR.findById(id)
        if (!existe) {
          throw new Error(`El id  ${id} no existe`)
        }
      },
}
export default HelpersInformeR;
import Orden from "../models/orden_de_servicio.js";

const HerlpersOdenServicio= {
  existeOrdenById: async (id) => {
    const existe = await Orden.findById(id)
    if (!existe) {
      throw new Error(`El id no existe ${id}`)
    }
  },
}

export default HerlpersOdenServicio
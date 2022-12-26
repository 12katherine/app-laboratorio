import { validarMongoId, validarItems } from "../middlewares/validar_mongoid.js";
import Cotizacion from "../models/cotizacion.js";

const HerlpersCotizacion = {

  items: async (items) => {
    for (let i = 0; i < items.item1.itemsEnsayo.length; i++){
      
      if (items.item1.itemsEnsayo[i].ensayo !="") {
        await validarItems(items.item1.itemsEnsayo[i].ensayo)
        .catch(err => { 
          throw new Error("item 1 "+err);
        })
      }else{
        throw new Error("Falta ID del ensayo item 1");
      }
      if(!items.item1.itemsEnsayo[i].costoEnsayo){
        throw new Error("El costo Ensayo del item 1 es obligatorio")
      }
      if (!items.item1.costo) {
        throw new Error("El costo del item 1 es obligatorio")
      }
    }
    
    for (let i = 0; i < items.item2.itemsEnsayo.length; i++){
      
      if (items.item2.itemsEnsayo[i].ensayo !="") {
        await validarItems(items.item2.itemsEnsayo[i].ensayo)
        .catch(err => { 
          throw new Error("item 2 "+err);
        })
      }else{
        throw new Error("Falta ID del ensayo item 2");
      }
      if(!items.item2.itemsEnsayo[i].costoEnsayo){
        throw new Error("El costo Ensayo del item 2 es obligatorio")
      }
      if (!items.item2.costo) {
        throw new Error("El costo del item 2 es obligatorio")
      }
    }
    for (let i = 0; i < items.item3.itemsEnsayo.length; i++){
      
      if (items.item3.itemsEnsayo[i].ensayo !="") {
        await validarItems(items.item3.itemsEnsayo[i].ensayo)
        .catch(err => { 
          throw new Error("item 3 "+err);
        })
      }else{
        throw new Error("Falta ID del ensayo item 3");
      }
      if(!items.item3.itemsEnsayo[i].costoEnsayo){
        throw new Error("El costoEnsayo del item 3 es obligatorio")
      }
      if (!items.item3.costo) {
        throw new Error("El costo del item 3 es obligatorio")
      }
    }

  },

  existeCotizacionById: async (id) => {
    const existe = await Cotizacion.findById(id)
    if (!existe) {
      throw new Error(`El id: ${id} no existe`)
    }
  },
  existeNumeroCotizacion: async (numero_cotizacion) => {
    const existe = await Cotizacion.findOne({ numero_cotizacion })
    if (!existe) {
      throw new Error(`El numero de cotizacion: ${numero_cotizacion} no existe`)
    }
  },
}

export default HerlpersCotizacion;
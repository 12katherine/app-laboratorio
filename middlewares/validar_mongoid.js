import mongoose from 'mongoose';
import HerlpersEnsayo from "../helpers/ensayo.js";
import HerlpersUsuario from '../helpers/usuarios.js';

const validarMongoId = async (itemsEnsayo) => {

  
    const valido = mongoose.Types.ObjectId.isValid(itemsEnsayo);
    if (!valido) {
        return "id no valido"
    }
    const xx = await HerlpersEnsayo.existeEnsayoById2(itemsEnsayo);
    console.log(xx);
    if (!xx) {
        return "ID no existe"
    }
    return ""
}

const validarResponsable = (responsable) => {
    return new Promise(async (resolve, reject) => {
        const valido = mongoose.Types.ObjectId.isValid(responsable);
        if (!valido) {
            reject("id no valido");
        } else {
            const xx = await HerlpersUsuario.existeUsuarioById2(responsable);
            if (!xx) {
                reject("id no existe");
            }
        }
        resolve("");
    })

}

const validarItems = (itemsEnsayo) => {
    return new Promise(async (resolve, reject) => {
        const valido = mongoose.Types.ObjectId.isValid(itemsEnsayo);
        if (!valido) {
            reject("ID no valido");
        } else {
            const xx = await HerlpersEnsayo.existeEnsayoById2(itemsEnsayo);
            if (!xx) {
                reject("ID no existe");
            }
        }
        resolve("");
    })

}

const validarOrden = (ensayo) => {
    return new Promise(async (resolve, reject) => {
        const valido = mongoose.Types.ObjectId.isValid(ensayo);
        if (!valido) {
            reject("id no valido");
        } else {
            const xx = await HerlpersEnsayo.existeEnsayoById2(ensayo);
            if (!xx) {
                reject("id no existe");
            }
        }
        resolve("");
    })

}

const validarMongoId2 = async (ensayo) => {

    
    const valido = mongoose.Types.ObjectId.isValid(ensayo);
    if (!valido) {
        return "id no valido"
    }
    const xx = await HerlpersEnsayo.existeEnsayoById2(ensayo);
    console.log(xx);
    if (!xx) {
        return "id no existe"
    }
    return ""
}



export {validarMongoId, validarItems , validarMongoId2, validarOrden ,validarResponsable}

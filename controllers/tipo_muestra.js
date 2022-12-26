import Tipo_muestra from "../models/tipo_muestra.js";

const postTipoMuestra=async(req, res)=>{
    const {tipos}=req.body
    const tipo = new Tipo_muestra({tipos})
    await tipo.save()
    res.json({
        tipo
    })
}

const getTipoMuestra = async(req, res)=>{
    const tipo= await Tipo_muestra.find()
    res.json({
        tipo
    })
}

const putTipoMuestra = async(req, res)=>{
    const {id}=req.params;
    const {tipos}=req.body
    const tipo= await Tipo_muestra.findOneAndUpdate(id,{tipos})
    res.json({
        tipo
    })
}

export {postTipoMuestra,getTipoMuestra,putTipoMuestra}
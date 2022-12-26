import Colores from '../models/color.js';

const coloresPost = async (req, res) => {
    const { logo, formato, interfaz, temporal } = req.body
    const color = new Colores({ logo, formato, interfaz, temporal })
    await color.save()
    res.json({
        color
    })
}

const coloresPut = async (req, res) => {
    const { id } = req.params
    const { logo, formato, interfaz, temporal } = req.body
    const color = await Colores.findByIdAndUpdate(id, { logo, formato, interfaz, temporal })
    res.json({
        "msg": "Color actualizado"
    })
}

const coloresGet = async (req, res) => {
    const color = await Colores.find()
    res.json({
        color
    })
}

export { coloresPost, coloresPut , coloresGet}
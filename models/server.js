import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";
import fileupload from "express-fileupload";
import usuario from "../routes/usuarios.js";
import cotizacion from "../routes/cotizacion.js";
import datmuestra from "../routes/datos-muestra.js";
import informe from "../routes/informe-resultados.js";
import Ciudad from "../routes/ciudad.js";
import ordenServidor from "../routes/orden_del_servicio.js";
import tipo_muestra from "../routes/tipo_muestra.js";
import ensayo from "../routes/ensayo.js";
import calidad from "../routes/calidad.js";
import color  from "../routes/color.js";

class Server{
    constructor(){
        this.app=express();
        this.middlewares();
        this.port=process.env.PORT;
        this.connectarbd()
        this.routes() 
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        //this.app.use(express.static('public'))
        this.app.use(fileupload({
            useTempFiles:true,
            tempFileDir:'/tmp/', 
            createParentPath:true
        }));
    }

    async connectarbd(){
        await dbConnection()     
    }

    routes(){
        this.app.use("/api/usuarios",usuario) 
        this.app.use("/api/cotizacion",cotizacion)
        this.app.use("/api/datMuestra",datmuestra)
        this.app.use("/api/informe",informe)
        this.app.use("/api/ciudad",Ciudad)     
        this.app.use("/api/Orden_servicio",ordenServidor)
        this.app.use("/api/Tipo_muestra",tipo_muestra)
        this.app.use("/api/ensayo",ensayo)
        this.app.use("/api/calidad",calidad)
        this.app.use("/api/color",color)
    }

    escuchar(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

export default Server
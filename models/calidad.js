import mongoose from "mongoose";

const CalidadSchema = new mongoose.Schema({

ListadoMuestras:[{
  codigo:{type:String, default:"CAT–ST–MI–F–003"},
  aprobacion:{type:String, default:"2021-10-25"},
  version:{type:String, default:"1"}
}],

InformeResultado:[{
  codigo:{type:String, default:"CAT–ST–OC–F–002"},
  aprobacion:{type:String, default:"2022-04-01"},
  version:{type:String, default:"2"}
}],

RecepcionMuestras:[{
  codigo:{type:String, default:"CAT–ST–MI–F–002"},
  aprobacion:{type:String, default:"2022-04-01"},
  version:{type:String, default:"2"}
}],

OrdenServicio:[{
  codigo:{type:String, default:"CAT–ST–MI–F–003"},
  aprobacion:{type:String, default:"2021-10-25"},
  version:{type:String, default:"1"}
}],

InstructivoTomaMuestras:[{
  codigo:{type:String, default:"CAT–ST–MU–F–001"},
  aprobacion:{type:String, default:"2021-09-06"},
  version:{type:String, default:"1"}
}],

Seguimiento:[{
  codigo:{type:String, default:"CAT–ST–OC–F–001"},
  aprobacion:{type:String, default:"2021-08-30"},
  version:{type:String, default:"1"}
}],

OfertaServicios:[{
  codigo:{type:String, default:"CAT–ST–OC–F–002"},
  aprobacion:{type:String, default:"2021-08-30"},
  version:{type:String, default:"1"}
}],
});

export default mongoose.model("Calidad", CalidadSchema);
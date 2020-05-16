const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'dbNodeTdeA';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser:true });

// Use connect method to connect to the Server
client.connect(function(err) {
  if (err)
    return console.log("error de conexion");

  console.log("Conexion exitosa a BD");
  const db = client.db(dbName);

   const collection = db.collection('curso');

   /*collection.deleteOne({ nombre : "Felipe" }, function(err, result) {
     if (err) {
       return console.log("ocurrio un error");
     }
    console.log("Removed the document with the field a equal to 3");
    console.log(result);

  });

  collection.deleteMany({ numDoc :{ $gt:0 }}, function(err, result) {
    if (err) {
      return console.log("ocurrio un error");
    }
   console.log("Removed the document with the field a equal to 3");
   console.log(result);

 });*/

   /*collection.updateOne({nombre:"Felipe"}, {$set:{correo:"Farango@ideassimples.com.co"}},(err,docs)=>{
     if(err)
        console.log("error al actualizar");
     console.log(docs);
   });*/

   /*collection.insertOne(
    {"idEstudiante":"2b52b603-9d7f-4026-b8d5-3a8ba91fc5e8","numDoc":"1","nombre":"1","correo":"1","telefono":"1","estado":true}
  , (err, result) => {
    if(err)
      return console.log("error al insertar");

    console.log("Insercion exitosa");
    console.log(result.ops);
  });*/

  collection.insertOne(
   {"idCurso":"e74c3757-fe70-4ba3-9867-e59b7f0e10c2","codigo":"1","nombre":"1","descripcion":"","valor":"","modalidad":"","intensidad":"","estado":false}
 , (err, result) => {
   if(err)
     return console.log("error al insertar");

   console.log("Insercion exitosa");
   console.log(result.ops);
 });

  /*collection.findOne({nombre:"1"},function(err, docs) {
    console.log("Found the following records");
    console.log(docs)
  });

  collection.find({correo:"1"}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs)
  });*/


  client.close();
});

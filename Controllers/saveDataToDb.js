import mongoDb from 'mongodb'


var MongoClient = mongoDb.MongoClient;
var Server = mongoDb.Server
// console.log(Server);
let uri = 'mongodb://localhost:27017/'
var dbName = 'DonnéesParkingsTempsReel'

// async function saveData(data, collectionName){

const client = new MongoClient(uri);
(async () => await client.connect())();

// use client to work with db
const saveData = async (data, collectionName) => {
  try {
    // console.log(data);
    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.insertMany(data)
    console.log('collection : ',collectionName ); 
    console.log('Réponse db : ', result.acknowledged) 
    console.log('Nombre de colonnes : ', result.insertedCount) 
  } catch (err) {
    console.error(err);
  }
}

const cleanup = (event) => { // SIGINT is sent for example when you Ctrl+C a running process from the command line.
    client.close(); // Close MongodDB Connection when Process ends
    process.exit(); // Exit with default success-code '0'.
  }
  
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);


export  default saveData





// ______________________________Brouillon___________________________________




    // dbconnectionConfig.connectToDb(async (err)=>{
    //     let db
    //     if(!err){
    //         console.log('connect to db sucess');
    //        db = dbconnectionConfig.getDB()
    //     }else{
    //         console.log('cannot connect to DB');
    //         return false
    //     }
    //     db.collection(collection)
    //     .insertMany(data)
    //     .then(result => {
    //         console.log('collection : ', collection); 
    //         console.log('Réponse db : ', result.acknowledged) 
    //         console.log('Nombre de colonnes : ', result.insertedCount) 
    //     })
    //     .catch(err => {
    //         return err 
    //     }) 
    //     })
    //     dbconnectionConfig.closeDb()
// }



// function testConnection(){
//     var url = "mongodb://localhost:27017/test";
//     MongoClient.connect(url, function(err, db) {
//     if (err) console.log(err);
//     // var dbo = db.db("test");
//     db.collection('donneeLille')
//         .insertOne({data : 1})
//         .then(result => {
//             console.log('collection : ', collection); 
//             console.log('Réponse db : ', result.acknowledged) 
//             console.log('Nombre de collones : ', result.insertedCount) 
//         })
//         .catch(err => {
//             return err 
//         }) 
//     });
// }
// testConnection()
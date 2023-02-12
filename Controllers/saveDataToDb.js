import mongoDb from 'mongodb'
import sendmail from './sendMail.js'
var MongoClient = mongoDb.MongoClient;
import dotenv from 'dotenv' 
dotenv.config()

var Server = mongoDb.Server
// console.log(Server);
let uri = 'mongodb://localhost:27017/'
let uri_mongoVM = 'mongodb://20.199.21.135:27017/'
let uri_mongoAtlasDb = 'mongodb+srv://amineUbuntu:Aminou_51992@cluster0.dkiyacg.mongodb.net/?retryWrites=true&w=majority'
var dbName = 'DonnéesParkingsTempsReel'

let url_cosmosDb =  process.env.COSMOS_CONNECTION_STRING;

const client = new MongoClient(uri_mongoAtlasDb);
(async () => await client.connect())()

// use client to work with db
const saveData = async (data, collectionName) => {
  try {
    // console.log(data);
    let listLastParkings =[]
    const collection = client.db(dbName).collection(collectionName);
    const getNumberDoc = await collection.countDocuments()
    const getLastInsertedDoc = await collection.find({}).sort({_id:-1}).limit(1)
    if(getNumberDoc === 0){
      const result = await collection.insertMany(data)
      console.log('collection : ',collectionName ); 
      console.log('Réponse db : ', result.acknowledged) 
      console.log('Nombre de colonnes : ', result.insertedCount) 
    }
    getLastInsertedDoc.forEach(async (elm) => {
    if(elm.recordid != data[data.length-1].recordid ){
      const result = await collection.insertMany(data)
      console.log('collection : ',collectionName ); 
      console.log('Réponse db : ', result.acknowledged) 
      console.log('Nombre de colonnes : ', result.insertedCount, '/ total : ', getNumberDoc) 
      console.log('___________________________________________________');
    }
    }) 
  } catch (err) {
    console.error(err);
//    sendmail({subject : 'error in Controllers => saveData(), line 26',
  
//  text : err
//  })
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

import mongoDb from 'mongodb'
import sendmail from './sendMail.js'
var MongoClient = mongoDb.MongoClient;
import dotenv from 'dotenv' 
dotenv.config()

var Server = mongoDb.Server
// console.log(Server);
let uri = 'mongodb://localhost:27017/'
var dbName = 'DonnéesParkingsTempsReel'

let url_cosmosDb =  process.env.COSMOS_CONNECTION_STRING;

const client = new MongoClient(uri);
(async () => await client.connect())();

// use client to work with db
const getDataDbInfo = async (data, collectionName) => {

    // console.log(data);
    let listLastParkings =[]
    const collection = client.db(dbName).collection(collectionName);
    const getNumberDoc = await collection.countDocuments()
}


export  default getDataDbInfo
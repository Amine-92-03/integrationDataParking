import express from 'express'
import bodyParser from 'body-parser'
import cron from 'node-cron'
import getFetchData from './Controllers/getFetchData.js'
import saveData from './Controllers/saveDataToDb.js'
import sendmail from './Controllers/sendMail.js'


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// connect  to mongodb
//     */2 * * * *'
cron.schedule('*/5 * * * * *', ()=>{
    console.log('___________________ CRON-NODE  ____________________')
    let url_Issy = 'https://data.issy.com/api/records/1.0/search/?dataset=park-indigo-disponibilite-temps-reel&q=&sort=value_free_spots&facet=value_status&facet=ville&facet=name'
    getFetchData(url_Issy).then(res =>{
        saveData(res,'donneesIssy')
    })
    let url_GransPoitiers ='https://data.grandpoitiers.fr/api/records/1.0/search/?dataset=mobilites-stationnement-des-parkings-en-temps-reel&q=&facet=nom'
    getFetchData(url_GransPoitiers).then(res =>{
        saveData(res,'donneesGrandPoitiers')
    })
})

// app.use(express.static('../FrontEnd/'));
export default app



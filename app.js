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
cron.schedule('*/20 * * * * *', ()=>{
    console.log('___________________ CRON-NODE  ____________________')
    let url_Issy = 'https://data.issy.com/api/records/1.0/search/?dataset=park-indigo-disponibilite-temps-reel&q=&sort=value_free_spots&facet=value_status&facet=ville&facet=name&timezone=Europe/Paris'
    getFetchData(url_Issy).then(res =>{
        saveData(res,'donneesIssy')
    })
    let url_strasbourg ='https://data.strasbourg.eu/api/records/1.0/search/?dataset=occupation-parkings-temps-reel&q=&facet=etat_descriptif&timezone=Europe/Paris'
    getFetchData(url_strasbourg).then(res =>{
        saveData(res,'donneestrasbourg')
    })
    let url_GransPoitiers ='https://data.grandpoitiers.fr/api/records/1.0/search/?dataset=mobilites-stationnement-des-parkings-en-temps-reel&q=&facet=nom&timezone=Europe/Paris'
    getFetchData(url_GransPoitiers).then(res =>{
        // console.log(res);
        saveData(res,'donneesGrandPoitiers')
    })
    let url_Nantes ='https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes-disponibilites&q=&facet=grp_nom&facet=grp_statut&timezone=Europe%2FParis'
    getFetchData(url_Nantes).then(res =>{
    saveData(res,'donneesNantes')
    })
    let url_Orleans ='https://data.orleans-metropole.fr/api/v2/catalog/datasets/mobilite-places-disponibles-parkings-en-temps-reel/records?offset=0&lang=fr&timezone=Europe%2FParis'
    getFetchData(url_Orleans).then(res =>{
        saveData(res,'donneesOrleans')
        })
})

// app.use(express.static('../FrontEnd/'));
export default app



import fetch from 'node-fetch'
//import sendmail from './sendMail.js'

async function getFetchData(url){
    try {
        let requestDetails = {
            method : "GET",
            encoding: "utf8",
            throwHttpErrors : false
        };
        let response = await fetch(url, requestDetails)
        let json = await response.json()
        // .then(res => res.json())
        return json.records
    } catch (error) {
        console.log('error in Controllers => getFetchData'); 
        console.log(error);
       // sendmail({subject : 'error in Controllers => getFetchData, LINE 18 :',
 //                 text : error
   //             })
    }
}

export default getFetchData

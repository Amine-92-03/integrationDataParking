import fetch from 'node-fetch'

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
    }
   
}

export default getFetchData
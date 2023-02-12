import http from 'http'
import app from './app.js' 
//  this server is reserved to front end dashbord

const server = http.createServer(app)

console.log('hello');

app.set('port', process.env.PORT || process.env.PORT)
server.listen(process.env.PORT || process.env.PORT, (err)=>{
    if(!err){
        console.log('Listen to port:', process.env.PORT);
    }
    else {
        console.log('Dont listen to any port');
    }
})
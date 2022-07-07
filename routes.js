//import fileSystem module
const fs = require('fs')

const requestHandler = (req, res) => {
    //create routes
    const url = req.url
    const method = req.method

    // to send HTML back
    res.setHeader('Content-Type','text/html')
    
    if(url === '/'){
        const hi='hi'
        res.write(`<html><head><title>Welcome from Node</title></head><body><h1>${hi}, Welcome From Node</h1>`)      
        res.write('<form action="/message" method="POST"><input name="message" type="text"></input><button type="submit">Send</button></form></body></html>')
    } else if(url === '/message' && method === 'POST'){

        const payload = []
        req.on('data', (chunk)=>{
            payload.push(chunk)
        })
        return req.on('end', ()=>{
            const parsedPayLoad = Buffer.concat(payload).toString()
            const name = parsedPayLoad.split('=')[1]
            fs.writeFileSync('data.txt',name)
            res.write(`<html><head><title>Welcome from Node</title></head><body><h1>Welcome From Node</h1>`)    
            res.write(`<p>Oh! Hi, ${name}</p></body></html>`)
        })
    }else{
        // redirect the user
        res.statusCode = 302
        res.setHeader('Location','/')
    }
    res.end()

}

module.exports = requestHandler; //This is how you export in node
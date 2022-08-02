const express = require("express")
const cluster = require('cluster')
const {http} = require('http')

const process =require('process')
const os =require('os')

console.log("ARGV: ", process.argv);

const port = 8080

const numCPUs = os.cpus().length


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get("/randoms", (req,res)=>{
    let cant = parseInt(req.query.cant)
    console.log(cant)
   if(cant === null){
        cant = 100000000
   }
    const getRandom = (max) =>{
        return Math.floor(Math.random() * max)
    }
    const numeroRandom = JSON.stringify(getRandom(cant))
    res.send({numeros:numeroRandom, pid: process.pid})
})


if (cluster.isPrimary) {
    console.log(`PID PRIMARIO ${process.pid}`)


    for (let i = 0; i < 4; i++) {
        const childEnv = {
            port: parseInt(process.argv[2+i])
        }
        cluster.fork(childEnv)
    }

    // cluster con balanceo de carga usando estrategia:
    // ROUND ROBIN

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
} else {
    
  app.listen(process.env.port,()=>{
    console.log(`server ${process.pid} started`)
  })
}
import express from "express"
import cluster from 'cluster'
import http from 'http'

import process from 'process'
import os from 'os'

import random from "./rutas/randomRuta.js"

const port = parseInt(process.argv[2]) || 8080
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
    res.send({numeros:numeroRandom})
})


if (cluster.isPrimary) {
    console.log(`PID PRIMARIO ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    // cluster con balanceo de carga usando estrategia:
    // ROUND ROBIN

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
} else {
  app.listen(port,()=>{
    console.log(`server ${process.pid} started`)
  })
}
import cluster from 'cluster'
import os from 'os'
import http from 'http'
const numCPUs = os.cpus().length
const PORT = parseInt(process.argv[2]) || 8080


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
      http.createServer((req, res) => {
            res.writeHead(200)
            res.end(`Hola mundo desde el proceso ${process.pid}!`)
        }).listen(PORT)
    
        console.log(`Worker ${process.pid} started`)
}
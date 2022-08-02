import { Router } from "express"

const randomRouter = Router()


randomRouter.get("/",(req,res)=>{
    let cant = parseInt(req.query.cant)
   if(cant === null){
        cant = 100000000
   }
    const getRandom = (max) =>{
        return Math.floor(Math.random() * max)
    }
    const numeroRandom = JSON.stringify(getRandom(cant))
    res.send({numeros:numeroRandom})
   
})

export default randomRouter
import  express  from 'express'
import {faker} from '@faker-js/faker'

const app = express()

const { Router } = express

const testRouter = new Router()

testRouter.get("/", (req,res)=>{
    res.render("home")
})


testRouter.get("/productos-test", (req,res)=>{
    const arrayPersonas=[]
    for( let i=0 ; i< 5; i++){
        if( arrayPersonas.length=== 5){
        }
            arrayPersonas.push({
                nombre: faker.commerce.productName(),
                precio:faker.commerce.price(),        
                foto:faker.image.business(),
                id: i+1
            })
    }
    res.render("tabla", {data:arrayPersonas})
})

export default testRouter
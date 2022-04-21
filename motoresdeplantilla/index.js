
const express = require('express')
const {engine} = require('express-handlebars')


const routerHbs = require("./rutas/hbs")
const routerEjs = require("./rutas/ejs")
const routerPug = require("./rutas/pug")

const appHbs = express()
const appEjs = express()
const appPug = express()

//----------------configHbs---------
appHbs.use(express.json());
appHbs.use(express.urlencoded({extended:false}));

appHbs.engine("hbs", engine({
    extname: ".hbs",
        defaultLayout : "index",
}))

appHbs.set('view engine', '.hbs');
appHbs.set('views', './views');

//----------------configEjs---------

appEjs.set('views', './views/ejs');
appEjs.set('view engine', '.ejs');

//----------------configPug---------
appPug.set('views', './views/pug');
appPug.set('view engine', '.pug');

//----------------Rutas-------------
appEjs.use('/ejs',routerEjs)
appHbs.use('/hbs',routerHbs)
appPug.use('/pug',routerPug)


const PORTHBS = 8081
const PORTEJS = 8082
const PORPUG = 8083

appHbs.listen(PORTHBS,()=>{
    console.log("Server OK",PORTHBS )
})

appEjs.listen(PORTEJS,()=>{
    console.log("Server OK",PORTEJS )
})

appPug.listen(PORPUG,()=>{
    console.log("Server OK",PORPUG )
})

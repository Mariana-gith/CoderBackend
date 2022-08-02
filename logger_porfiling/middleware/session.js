import expressSession from "express-session"
import MongoStore from "connect-mongo";

import 'dotenv/config'

const advancedOptions= {useNewUrlParser:true,useUnifiedTopology:true}

export const session = expressSession({
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URL,
        mongoOptions: advancedOptions
    }),
    secret:process.env.MONGO_SECRETO,
    resave:false,
    saveUninitialized: false
})
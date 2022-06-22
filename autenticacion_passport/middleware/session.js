import expressSession from "express-session"
import MongoStore from "connect-mongo";

const advancedOptions= {useNewUrlParser:true,useUnifiedTopology:true}

export const session = expressSession({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://mariana:mariana@cluster1.9z6uk.mongodb.net/login?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: "secreto",
    resave:false,
    saveUninitialized: false
})

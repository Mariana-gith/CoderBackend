import createKnex from "knex";

const dbConfig ={
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    database : 'coder'
}


const knexConfig ={
    client:"mysql",
    connection:dbConfig
}


const mysql = createKnex(knexConfig)


export default mysql


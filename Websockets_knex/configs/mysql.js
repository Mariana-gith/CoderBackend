import createKnex from "knex";

const dbConfig ={
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    database : 'ecommerceknexbd'
}


const knexConfig ={
    client:"mysql",
    connection:dbConfig
}


const knexmysql = createKnex(knexConfig)

knexmysql.schema.hasTable('productos')
    .then(exist=>{
        if(!exist){
            knexmysql.schema.createTable('productos', tabla =>{
                tabla.increments("id"),
                tabla.string("nombre"),
                tabla.integer("precio"),
                tabla.integer("foto")
            })
            .then(()=>{
                console.log("tbla creada OK!")
            })
        }else{
            console.log("la tabla ya existe")
        }
    })
    .finally(()=>{
        knexmysql.destroy()
    })





export default knexmysql


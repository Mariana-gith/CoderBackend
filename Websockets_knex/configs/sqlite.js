import knex from "knex";

const sqlite = {
    client: 'sqlite3',
    connection: {
      filename: "./db/mensajes.db"
    },
    useNullAsDefault: true
  }


  const knexSqlite = knex(sqlite)

  knexSqlite.schema.hasTable('mensajes')
    .then(exist=>{
        if(!exist){
          knexSqlite.schema.createTable('mensajes', tabla =>{
              tabla.increments("id").primary,
              tabla.string("nombre"),
              tabla.integer("mensaje")
            })
            .then(()=>{
                console.log("tbla creada OK!")
            })
        }else{
            console.log("la tabla ya existe")
        }
    })
    .finally(()=>{
      knexSqlite.destroy()
    })


 
export default sqlite
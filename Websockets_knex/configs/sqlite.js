import createKnex from "knex";

const sqlite = {
    client: 'sqlite3',
    connection: {
      filename: "./db/mensajes.db"
    },
    useNullAsDefault: true
  }


  const knexSqlite = createKnex(sqlite)

  knexSqlite.schema.hasTable('mensajes')
    .then(exist=>{
        if(!exist){
          knexSqlite.schema.createTable('mensajes', tabla =>{
              tabla.increments("id").primary,
              tabla.string("Autor"),
              tabla.integer("mensaje")
            })
            .then(()=>{
                console.log("tbla creada OK!")
            })
        }else{
            console.log("la tabla ya existe")
        }
    })



 
export default knexSqlite
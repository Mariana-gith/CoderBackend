import knex from "knex";

const sqlite = {
    client: 'sqlite3',
    connection: {
      filename: "./db/ecommerce.db3"
    },
    useNullAsDefault: true
  }
 
 
export default sqlite
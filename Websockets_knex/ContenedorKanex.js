import knex from "knex";

class ContenedoKnex{
    constructor(tabla,config){
        this.tabla=tabla
        this.knex=config
    }
    
    async save(data){
        return await this.knex(this.tabla)
        .insert(data)
    }
    async listarArticulos(){
        return await this.knex(this.tabla)
        .select("*")
    }
    async obtenerArticulo(id){
        return await this.knex(this.tabla)
        .where({id})
    }
    async borrarArticulo(id){
        return await this.knex(this.tabla)
        .where({id})
        .del()
    }
    async actilizarArticulo(id,nuevoArticulo){
        return await this.knex(this.tabla)
        .where({id})
        .update(nuevoArticulo)
    }

}


export default ContenedoKnex
import knexcont from "knex";

class ContenedoKnex{
    Constructor(tabla,config){
        this.tabla=tabla
        this.knex=knexcont(config)
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
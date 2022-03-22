class usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre=nombre,
        this.apellido=apellido,
        this.libros=libros,
        this.mascotas=mascotas
    }

     getFullName(){
        console.log(`Hola ${this.nombre} ${this.apellido} como estas ?`)
    }

    addMascota(nueva){
        this.mascotas.push(nueva)
      console.log("Mascotas Nuevas :",this.mascotas)
    }
    countMascotas(){
        console.log("cantidad de mascotas:", this.mascotas.length)
    }
    addBook(nombre,autor){
        this.libros.push({nombre,autor})
        console.log("Lista de libros actualizada :", this.libros)
    }
    getBookNames(){
        const nombres =this.libros.map((libro) => libro.nombre)
        console.log("Nombres",nombres)
    }
}

const usuarioNuevo= new usuario("Mariana","Gimenez",[{nombre:"La señora Dalloway"}, {nombre:"Harry Potter"}, {nombre:"Al faro"},{nombre: "El amor en los tiempos del cólera"}],["Sansu","Marilyn","Macha","Pinky"])

console.log(usuarioNuevo)
usuarioNuevo.getFullName()
usuarioNuevo.addMascota("mono")
usuarioNuevo.addMascota("roko")
usuarioNuevo.countMascotas()
usuarioNuevo.addBook("Don Quijote de la Mancha","Miguel de Cervantes")
usuarioNuevo.addBook("El ruido y la furia","William Faulkner")
usuarioNuevo.addBook("La educación sentimental","Gustave Flaubert")
usuarioNuevo.addBook("Cien años de soledad","Gabriel García Márquez")
usuarioNuevo.getBookNames()




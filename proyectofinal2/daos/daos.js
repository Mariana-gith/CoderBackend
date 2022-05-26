
let productosdao
let carrosDao

let env = 'firebase'

switch (env) {
    case 'json':
        const { default:Productosdaos} = await import('./productos/Productosdaos.js')     
        const { default:Carritodaos} = await import('./carrito/Carritodaos.js')  
        
        
        productosdao = new Productosdaos()
        carrosDao = new Carritodaos()
        break;
    case 'firebase':
        const {default:ProductosdaosFiresbase } = await import('./productos/ProductosdaosFiresbase.js')
        const {default:CarritodaosFirebase } = await import('./carrito/CarritodaosFirebase.js')

        productosdao = new ProductosdaosFiresbase
        carrosDao = new CarritodaosFirebase
        break;
    case 'mongodb':
        const {default: ProductosdaosMongodb} = await import('./productos/ProductosdaosMongodb.js')
        const {default: CarrtodaosMongodb} = await import('./carrito/CarritodaosMongodb.js')
        productosdao = new ProductosdaosMongodb
        carrosDao = new CarrtodaosMongodb
        break;
}

export  {productosdao, carrosDao}
const factory = require('./factory');
const Producto = require('./models/producto.js');
const ProductoRepo = require('./repos/ProductoRepo');


const generadorDeIds = {
    id: 1,
    next() { return this.id++ }
}

const productoRepo = new ProductoRepo()

console.log('-----------------------------')
console.log('1) Obtener todas las productos')
console.log(productoRepo.getAll())

async function fn() {
    console.log('-----------------------------')
    console.log('1) Obtener todas las productos 2')
    console.log(await productoRepo.getAll())
}

fn()

console.log('-----------------------------')
console.log('2) Incorporar una producto')
const producto1 = new Producto({ articulo: 'Lapicera', descripcion: 'Color azul', stock: '3000', id: generadorDeIds.next() })
productoRepo.add(producto1)

console.log('-----------------------------')
console.log('3) Obtener todas las productos')
console.log(productoRepo.getAll())

console.log('-----------------------------')
console.log('4) Incorporar otra producto')
const producto2 = new Producto({ articulo: 'Borrador', descripcion: 'Borra lapiz', stock: '900', id: generadorDeIds.next() })
productoRepo.add(producto2)

console.log('-----------------------------')
console.log('5) Obtener todas las productos')
console.log(productoRepo.getAll())

console.log('--------------------------------')
console.log('6) Obtener una producto por su id')
console.log(productoRepo.getById(producto2.id))

console.log('-----------------------------')
console.log('7) Eliminar una producto por su id')
console.log(productoRepo.removeById(producto2.id))

console.log('-----------------------------')
console.log('8) Obtener todas las productos')
console.log(productoRepo.getAll())

console.log('--------------------------------')
console.log('9) Borrar todas las productos')
productoRepo.removeAll()



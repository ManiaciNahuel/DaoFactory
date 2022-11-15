const { asDto } = require("../dto/asDto");
const factory = require("../factory");
const Producto = require("../models/producto")

const opcion = process.argv[2] || 'archivo';
Persistencia = factory.getPersistencia(opcion);
instancia = new Persistencia("productos.txt");


class ProductoRepo {
    #dao

    constructor() {
        this.#dao = new Persistencia("productos.txt");
    }

    async getAll() {
        this.#dao.init()
        console.log(this.#dao.init())
        const productos = await this.#dao.getAll()
        return productos.map(p => new Producto(p))
    }

    async getById(idBuscado) {
        const dto = await this.#dao.getById(idBuscado)
        return new Producto(dto)
    }

    async add(productoNuevo) {
        await this.#dao.save(asDto(productoNuevo))
    }

    async removeById(idBuscado) {
        const removida = await this.#dao.deleteById(idBuscado)
        return new Producto(removida)
    }

    async removeAll() {
        await this.#dao.deleteAll()
    }
}


module.exports = ProductoRepo;
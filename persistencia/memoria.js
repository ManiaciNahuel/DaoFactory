const { asDto } = require("../dto/asDto")

class Memoria {

    constructor() {
        this.productos = []
    }

    init() {
        console.log('productos dao en memoria -> listo')
    }

    disconnect() {
        console.log('productos dao en memoria -> cerrado')
    }

    #getIndex(id) {
        return this.productos.findIndex(producto => producto.id === id)
    }

    getAll() {
        return asDto(this.productos)
    }

    getById(idBuscado) {
        return asDto(this.productos[this.#getIndex(idBuscado)])
    }

    save(productoNuevo) {
        this.productos.push(productoNuevo)
        return asDto(productoNuevo)
    }

    deleteById(idParaBorrar) {
        const [borrada] = this.productos.splice(this.#getIndex(idParaBorrar), 1)
        return asDto(borrada)
    }

    deleteAll() {
        this.productos = []
    }

    updateById(idParaReemplazar, nuevosCampos) {
        const index = this.#getIndex(idParaReemplazar)
        const actualizada = { ...this.productos[index], ...nuevosCampos }
        this.productos.splice(index, 1, actualizada)
        return asDto(actualizada)
    }
}

module.exports = Memoria;
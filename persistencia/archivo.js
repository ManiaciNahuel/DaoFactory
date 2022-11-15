const fs = require("fs")
const { asDto } = require("../dto/asDto")

class Archivo {

    constructor(ruta) {
        this.ruta = ruta
        this.productos = []
    }
    #ready = false

    #checkReady() {
        if (!this.#ready) throw new Error('INTERNAL_ERROR: dao no conectado!')
    }

    async init() {
        try {
            fs.readFileSync(this.ruta, 'utf-8')
            this.#ready = true
        } catch (error) {
            fs.writeFileSync(this.ruta, '[]')
            this.#ready = true
        }
    }

    async #leerArchivo() {
        this.#checkReady()
        const texto = await fs.readFileSync(this.ruta, 'utf-8')
        this.productos = JSON.parse(texto)
    }

    disconnect() {
        console.log('productos dao en archivo -> cerrado')
    }

    async #escribirArchivo() {
        this.#checkReady()
        const texto = JSON.stringify(this.productos, null, 2)
        await fs.writeFileSync(this.ruta, texto)
    }

    #getIndex(id) {
        return this.productos.findIndex(producto => producto.id === id)
    }

    async getAll() {
        console.log("GET ALL ARchivos");
        await this.#leerArchivo()
        return asDto(this.productos)
    }

    async getById(idBuscado) {
        await this.#leerArchivo()
        return asDto(this.productos[this.#getIndex(idBuscado)])
    }

    async save(productoNuevo) {
        await this.#leerArchivo()
        this.productos.push(productoNuevo)
        await this.#escribirArchivo()
        return asDto(productoNuevo)
    }

    async deleteById(idParaBorrar) {
        await this.#leerArchivo()
        const [borrada] = this.productos.splice(this.#getIndex(idParaBorrar), 1)
        await this.#escribirArchivo()
        return asDto(borrada)
    }

    async deleteAll() {
        this.productos = []
        await this.#escribirArchivo()
    }

    async updateById(idParaReemplazar, nuevosCampos) {
        await this.#leerArchivo()
        const index = this.#getIndex(idParaReemplazar)
        const actualizada = { ...this.productos[index], ...nuevosCampos }
        this.productos.splice(index, 1, actualizada)
        await this.#escribirArchivo()
        return asDto(actualizada)
    }
}

module.exports = Archivo;
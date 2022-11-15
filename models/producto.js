class Producto {
    #id
    #articulo
    #descripcion
    #stock

    constructor({ id, articulo, descripcion, stock }) {
        this.id = id
        this.articulo = articulo
        this.descripcion = descripcion
        this.stock = stock
    }

    get id() { return this.#id }

    set id(id) {
        if (!id) throw new Error('"id" es un campo requerido')
        this.#id = id
    }

    get articulo() { return this.#articulo }

    set articulo(articulo) {
        if (!articulo) throw new Error('"articulo" es un campo requerido')
        this.#articulo = articulo
    }

    get descripcion() { return this.#descripcion }

    set descripcion(descripcion) {
        if (!descripcion) throw new Error('"descripcion" es un campo requerido')
        this.#descripcion = descripcion
    }

    get stock() { return this.#stock }

    set stock(stock) {
        if (!stock) throw new Error('"stock" es un campo requerido')
        if (isNaN(stock)) throw new Error('"stock" es un campo de caracteres exclusivamente numéricos')
        this.#stock = stock
    }
}

module.exports = Producto
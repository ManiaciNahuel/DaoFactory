class ProductoDto {
    constructor({ id, articulo, descripcion, stock }) {
        this.id = id
        this.articulo = articulo
        this.descripcion = descripcion
        this.stock = stock
    }
}

function asDto(prod) {
    if (Array.isArray(prod))
        return prod.map(p => new ProductoDto(p))
    else
        return new ProductoDto(prod)
}

module.exports = { ProductoDto, asDto }
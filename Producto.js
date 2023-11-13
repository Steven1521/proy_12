// Producto.js
class Producto {
    #codigoProducto;
    #nombreProducto;
    #inventarioProducto;
    #precioProducto;

    constructor() {
        this.#codigoProducto = '';
        this.#nombreProducto = '';
        this.#inventarioProducto = 0;
        this.#precioProducto = 0;
    }

    setCodigoProducto(value) {
        this.#codigoProducto = value;
    }

    getCodigoProducto() {
        return this.#codigoProducto;
    }

    setNombreProducto(value) {
        this.#nombreProducto = value;
    }

    getNombreProducto() {
        return this.#nombreProducto;
    }

    setInventarioProducto(value) {
        this.#inventarioProducto = value;
    }

    getInventarioProducto() {
        return this.#inventarioProducto;
    }

    setPrecioProducto(value) {
        this.#precioProducto = value;
    }

    getPrecioProducto() {
        return this.#precioProducto;
    }
}

module.exports = Producto;

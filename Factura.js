// Factura.js
class Factura {
    #nombreCliente;
    #direccion;
    #numeroCedula;
    #productos;

    constructor() {
        this.#nombreCliente = '';
        this.#direccion = '';
        this.#numeroCedula = '';
        this.productos = []
    }

    setNombreCliente(value) {
        this.#nombreCliente = value;
    }

    getNombreCliente() {
        return this.#nombreCliente;
    }

    setDireccion(value) {
        this.#direccion = value;
    }

    getDireccion() {
        return this.#direccion;
    }

    setNumeroCedula(value) {
        this.#numeroCedula = value;
    }

    getNumeroCedula() {
        return this.#numeroCedula;
    }
    
    setProducto(value) {
        this.#productos = value;
    }

    getProducto() {
        return this.#productos;
    }

    agregarProducto(producto, cantidad) {
        this.productos = this.productos || [];
        this.productos.push({ producto, cantidad });
    }

    imprimirFactura(productos = [], total) {
        console.log('\n******** FACTURA ********');
        console.log(`Nombre del cliente: ${this.#nombreCliente}`);
        console.log(`Dirección: ${this.#direccion}`);
        console.log(`Número de cédula: ${this.#numeroCedula}`);
        console.log('Productos comprados:');
        console.log('-------------------------');

        if (Array.isArray(productos) && productos.length > 0) {
            productos.forEach((producto) => {
                console.log(`- ${producto.getNombreProducto()}: ${producto.getPrecioProducto()}`);
            });
        } else {
            console.log('(No se compraron productos)');
        }

        console.log('-------------------------');
        console.log(`Total: ${total}`);
        console.log('*************************');
    }
}

module.exports = Factura;

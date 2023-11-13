// main.js
const readline = require('readline');
const ProductoTienda = require('./ProductoTienda');

async function main() {
    console.clear();
    console.log('*****************************');
    console.log('**     PROYECTO TIENDA    **');
    console.log('*****************************\n');


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let productosTienda = new ProductoTienda(rl);
    await productosTienda.cargaArchivosProductos();

    console.log(`DATOS APERTURA TIienda **`.yellow);

    productosTienda.menuPrincipal();
}

main();

























    
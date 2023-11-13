
require('colors')
const fs = require('fs');

const readline = require('readline');
const Producto = require('./Producto');
const Factura = require('./Factura');

class ProductoTienda {
    #listaProductos;
    #facturaActual;
    #rl;
    #productosMostrados;

    constructor(rl) {
        this.#listaProductos = [];
        this.#facturaActual = null;
        this.#rl = rl;
        this.#productosMostrados = false;
    }

    getListaProductos() {
        return this.#listaProductos;
    }

    async cargaArchivosProductos() {
        let contador = 0;
        const datosArchivos = require('./datos.json');

        if (datosArchivos.length > 0) {
            datosArchivos.forEach((objeto) => {
                contador++;
                let producto = new Producto();
                producto.setCodigoProducto(objeto.codigoProducto);
                producto.setNombreProducto(objeto.nombreProducto);
                producto.setInventarioProducto(objeto.inventarioProducto);
                producto.setPrecioProducto(objeto.precioProducto);
                this.#listaProductos.push(producto);
            });
            console.log(`Total de productos cargados ===> ${contador}`);
        } else {
            console.log(`ERROR, el archivo datos.json no contiene datos`);
        }
    }

    async grabaArchivoProducto() {
        const nombreArchivo = 'datos.json';
        const carpetaCopiaSeguridad = 'copias_seguridad';

        if (!fs.existsSync(carpetaCopiaSeguridad)) {
            fs.mkdirSync(carpetaCopiaSeguridad);
        }

        const fechaHora = new Date().toISOString().replace(/:/g, '_');
        const nombreCopiaSeguridad = `${fechaHora}.json`;
        const rutaCopiaSeguridad = `${carpetaCopiaSeguridad}/${nombreCopiaSeguridad}`;

        let copiaExitosa = false;

        do {
            try {
                fs.copyFileSync(nombreArchivo, rutaCopiaSeguridad);

                const instanciaClaseAObjetos = this.#listaProductos.map((producto) => {
                    return {
                        codigoProducto: producto.getCodigoProducto(),
                        nombreProducto: producto.getNombreProducto(),
                        inventarioProducto: producto.getInventarioProducto(),
                        precioProducto: producto.getPrecioProducto(),
                    };
                });

                const cadenaJson = JSON.stringify(instanciaClaseAObjetos, null, 2);

                fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');
                console.log(`DATOS GUARDADOS EN ${nombreArchivo}`);

                copiaExitosa = true;
            } catch (error) {
                console.error('Error al realizar la copia de seguridad o guardar los datos:', error);
                await this.preguntaAsync('Presione Enter para continuar...');
            }
        } while (!copiaExitosa);
    }

    mostrarProductos() {
        this.#listaProductos.forEach((producto) => {
            console.log(
                `|    ${producto.getCodigoProducto()}      |` +
                `|    ${producto.getNombreProducto()}      |` +
                `|   ${producto.getInventarioProducto()}       |` +
                `|    ${producto.getPrecioProducto()}      |`
            );
        });
    }

    async agregarNuevoProducto() {
        console.log('Añadir un nuevo producto:');
        const codigo = await this.preguntaAsync('Ingrese el código del nuevo producto: ');
        const nombre = await this.preguntaAsync('Ingrese el nombre del nuevo producto: ');
        const inventario = await this.preguntaAsync('Ingrese el inventario del nuevo producto: ');
        const precio = await this.preguntaAsync('Ingrese el precio del nuevo producto: ');

        const nuevoProducto = new Producto();
        nuevoProducto.setCodigoProducto(codigo);
        nuevoProducto.setNombreProducto(nombre);
        nuevoProducto.setInventarioProducto(parseInt(inventario));
        nuevoProducto.setPrecioProducto(parseFloat(precio));

        this.#listaProductos.push(nuevoProducto);
        console.log('Nuevo producto agregado:');
        console.log('Código:', codigo);
        console.log('Nombre:', nombre);
        console.log('Inventario:', inventario);
        console.log('Precio:', precio);

        // Realizar copia de seguridad después de agregar el nuevo producto
        await this.grabaArchivoProducto();

        console.log('Producto guardado en el archivo.');
    }

    borrarProducto() {
        console.log('Productos actuales:');
        this.mostrarProductos();

        const obtenerCodigo = async () => {
            const codigo = await this.preguntaAsync('Ingrese el código del producto que desea borrar o escriba "cancelar" para volver al menú principal: ');

            if (codigo.toLowerCase() === 'cancelar') {
                return;
            }

            const codigoNormalizado = codigo.trim().toLowerCase();

            const productoAEliminar = this.#listaProductos.find((producto) => producto.getCodigoProducto().toLowerCase() === codigoNormalizado);

            if (productoAEliminar) {
                console.log(`Producto a eliminar: ${productoAEliminar.getNombreProducto()}`);
                const confirmacion = await this.preguntaAsync('¿Estás seguro de que deseas eliminar este producto? (SI/NO): ');

                if (confirmacion.trim().toLowerCase() === 'si') {
                    const indice = this.#listaProductos.indexOf(productoAEliminar);
                    this.#listaProductos.splice(indice, 1);
                    this.grabaArchivoProducto();
                    console.log(`Producto con código ${codigo} ha sido eliminado.`);
                } else {
                    console.log('No se eliminó el producto.');
                }
            } else {
                console.log(`No se encontró un producto con el código ${codigo}.`);
                await obtenerCodigo();
            }
        };

        obtenerCodigo();
    }

    async restaurarDatosDesdeCopia() {
        const carpetasCopiaSeguridad = fs.readdirSync('copias_seguridad');

        console.log('Carpetas de copia de seguridad disponibles:');
        carpetasCopiaSeguridad.forEach((carpeta, index) => {
            console.log(`${index + 1}. ${carpeta}`);
        });

        const numeroCarpeta = await this.preguntaAsync('Ingrese el número de la carpeta de copia de seguridad que desea restaurar: ');
        const indiceCarpeta = parseInt(numeroCarpeta) - 1;

        if (indiceCarpeta >= 0 && indiceCarpeta < carpetasCopiaSeguridad.length) {
            const carpetaSeleccionada = carpetasCopiaSeguridad[indiceCarpeta];
            const rutaCarpetaSeleccionada = `copias_seguridad/${carpetaSeleccionada}`;

            try {
                const archivosCarpeta = fs.readdirSync(rutaCarpetaSeleccionada);
                console.log(`Carpeta de copia de seguridad seleccionada: ${carpetaSeleccionada}`);
                console.log(`Contenido de la carpeta de copia de seguridad:`);
                archivosCarpeta.forEach((archivo, index) => {
                    console.log(`${index + 1}. ${archivo}`);
                });
            } catch (error) {
                console.error(`Error al leer la carpeta de copia de seguridad: ${error.message}`);
            }
        } else {
            console.log('Número de carpeta no válido.');
        }
    }

  async comprarProductos() {
    try {
        console.log('Productos disponibles para comprar:');

        const codigo = await this.preguntaAsync('Ingrese el código del producto que desea comprar o escriba  "cancelar" para volver al menú principal: ');

        if (codigo.toLowerCase() === 'cancelar') {
            return;
        }

        const productoAComprar = this.#listaProductos.find((producto) => producto.getCodigoProducto() === codigo);

        if (productoAComprar) {
            console.log(`Producto seleccionado: ${productoAComprar.getNombreProducto()}`);
            const cantidad = await this.preguntaAsync('¿Cuántas unidades desea comprar?: ');

            const unidades = parseInt(cantidad);
            if (unidades <= productoAComprar.getInventarioProducto()) {
                productoAComprar.setInventarioProducto(productoAComprar.getInventarioProducto() - unidades);

                // Agregar el producto a la factura actual
                this.#facturaActual = this.#facturaActual || new Factura();
                this.#facturaActual.agregarProducto(productoAComprar, unidades);

                // Ahora, solicita los datos del cliente solo si no están establecidos
                if (!this.#facturaActual.getNombreCliente()) {
                    const nombre = await this.preguntaAsync('Ingrese el nombre del cliente: ');
                    const direccion = await this.preguntaAsync('Ingrese la dirección: ');
                    const cedula = await this.preguntaAsync('Ingrese el número de cédula: ');

                    this.#facturaActual.setNombreCliente(nombre);
                    this.#facturaActual.setDireccion(direccion);
                    this.#facturaActual.setNumeroCedula(cedula);
                }

                // Imprimir factura solo si todos los datos del cliente están establecidos
                if (this.#facturaActual.getNombreCliente() && this.#facturaActual.getDireccion() && this.#facturaActual.getNumeroCedula()) {
                    this.#facturaActual.imprimirFactura();
                    this.#facturaActual = null;
                } else {
                    console.log('Faltan datos del cliente para imprimir la factura.');
                }
            } else {
                console.log('No hay suficientes unidades disponibles para comprar.');
            }
        } else {
            console.log(`No se encontró un producto con el código ${codigo}.`);
        }
    } catch (error) {
        console.error('Error al comprar productos:', error);
    }
}

async imprimirFactura() {
    try {
        if (this.#facturaActual) {
            console.log('Factura a imprimir:');
            this.#facturaActual.imprimirFactura();
            this.#facturaActual = null;
        } else {
            console.log('No hay una factura para imprimir en este momento.');
        }
    } catch (error) {
        console.error('Error al imprimir la factura:', error);
    }
}


    async menuPrincipal() {
        try {
            console.log('*'.magenta);
            console.log('//////////////////////////////////////////////'.magenta);
            console.log('MENU PRINCIPAL' + '                              *'.magenta);
            console.log('1. Mostrar productos');
            console.log('2. Agregar un nuevo producto');
            console.log('3. Realizar copia de seguridad');
            console.log('4. Restaurar datos desde una copia de seguridad');
            console.log('5. Borrar un producto');
            console.log('6. Comprar productos');
            console.log('7. Imprimir factura');
            console.log('8. Salir');

            const opcion = await this.preguntaAsync('Seleccione una opción: ');

            if (opcion === '1') {
                this.mostrarProductos();
                this.productosMostrados = true;
            } else if (!this.productosMostrados) {
                console.log('Por favor, primero muestre los productos.');
            } else {
                switch (opcion) {
                    case '2':
                        await this.agregarNuevoProducto();
                        break;
                    case '3':
                        await this.grabaArchivoProducto();
                        console.log('Copia de seguridad realizada.');
                        break;
                    case '4':
                        await this.restaurarDatosDesdeCopia();
                        break;
                    case '5':
                        this.borrarProducto();
                        break;
                    case '6':
                        await this.comprarProductos();
                        break;
                    case '7':
                        await this.imprimirFactura();
                        break;
                    case '8':
                        console.log('Saliendo del programa.');
                        this.#rl.close();
                        break;
                    default:
                        console.log('Opción no válida.');
                        break;
                }
            }
        } catch (error) {
            console.error('Error en el menú principal:', error);
        } finally {
            this.menuPrincipal();
        }
    }

    async preguntaAsync(pregunta) {
        return new Promise((resolve) => {
            this.#rl.question(pregunta, (respuesta) => {
                resolve(respuesta);
            });
        });
    }
}

module.exports = ProductoTienda;


/* require('colors');
const fs = require('fs');

const datosArchivos = require('./datos.json');

const main = async() =>{
    console.clear();
    console.log('*****************************');
    console.log('**     PROYECTO CLASES     **');
    console.log('*****************************\n');

    class Producto {
        #codigoProducto;
        #nombreProducto;
        #inventarioProducto;
        #precioProducto;

        constructor(){
            this.#codigoProducto = '';
            this.#nombreProducto = '';
            this.#inventarioProducto = 0;
            this.#precioProducto = 0;
        }

        set setCodigoProducto(value){
            this.#codigoProducto = value;
        }
        get getCodigoProducto(){
            return this.#codigoProducto;
        }
        set setNombreProducto(value){
            this.#nombreProducto = value;
        }
        get getNombreProducto(){
            return this.#nombreProducto;
        }
        set setInventarioProducto(value){
            this.#inventarioProducto = value;
        }
        get getInventarioProducto(){
            return this.#inventarioProducto;
        }
        set setPrecioProducto(value){
            this.#precioProducto = value;
        }
        get getPrecioProducto(){
            return this.#precioProducto;
        }


    }

    class ProductoTienda{
        #listaProductos;

        constructor(){
            this.#listaProductos = [];
        }
        get getListaProductos(){
            return this.#listaProductos;
        }

        cargaArchivosProductos(){
            let contador = 0;
            if(datosArchivos.length > 0){
                datosArchivos.forEach(objeto => {
                    contador++;
                    let producto = new Producto;
                    producto.setCodigoProducto = objeto.codigoProducto;
                    producto.setNombreProducto = objeto.nombreProducto;
                    producto.setInventarioProducto = objeto.inventarioProducto;
                    producto.setPrecioProducto = objeto.precioProducto;
                    this.#listaProductos.push(producto);
                });
            } else{
                console.log(`ERROR, el archivo datos.json no contiene datos\n`.bgRed);

            }
            console.log(`total de productos cargados ===>`.bgBlue + ` ${contador}`.bgRed);

        }

        grabaArchivoProducto(){
            const instanciaClaseAObjetos = this.getListaProductos.map(producto =>{
                return {
                    codigoProducto: producto.getCodigoProducto,
                    nombreProducto: producto.getNombreProducto,
                    inventarioProducto: producto.getInventarioProducto,
                    precioProducto: producto.getCodigoProducto
                };
            });

            const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2);
            const nombreArchivo = 'datos.json';
            fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');

            console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.bgMagenta);

        }

        mostrarProductos(){
            this.getListaProductos.forEach(producto => {
                console.log(`|    ` + producto.getCodigoProducto + `      |` +
                            `|    ` + producto.getNombreProducto + `      |` +
                            `|    ` + producto.getInventarioProducto+`       |` +
                            `|    ` + producto.getPrecioProducto + `      |` );
            })
        }

    }

    let productosTienda = new ProductoTienda;

    productosTienda.cargaArchivosProductos();

    console.log(`DATOS APERTURA TIENDA`.bgBlue);

    productosTienda.mostrarProductos();

    productosTienda.getListaProductos.forEach(producto =>{
        producto.setInventarioProducto = Math.floor(Math.random() * (20 - 1) + 1);
    });

    console.log(`DATOS CIERRE TIENDA`.bgGreen);
    productosTienda.mostrarProductos();

    productosTienda.grabaArchivoProducto();

}

main(); */

/* MICHAEL STIVEN BALLEN SANCHEZ
DAVID GOMEZ
DAVID REYES  */

require('colors');
const fs = require('fs');
const readline = require('readline');

const datosArchivos = require('./datos.json');
const { stringify } = require('querystring');

const main = async () => {
    console.clear();
    console.log('*****************************'.yellow);
    console.log('**     PROYECTO TIENDA    **'.magenta);
    console.log('*****************************\n'.yellow);

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

    class ProductoTienda {
        #listaProductos;

        constructor() {
            this.#listaProductos = [];
        }

        getListaProductos() {
            return this.#listaProductos;
        }
/*  cargaproductos esta deserialisando */ 
        cargaArchivosProductos() {
            let contador = 0;
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
            } else {
                console.log(`ERROR, el archivo datos.json no contiene datos\n`.bgRed);
            }
            console.log(`total de productos cargados ===>`.magenta + ` ${contador}`.bgBlue);
        }
     /* grabaArchivoProducto esta serealisando  */
        grabaArchivoProducto() {
            const instanciaClaseAObjetos = this.#listaProductos.map((producto) => {
           /*   el metodo map crea un nuevo array con los resultasos de la llamada a la funcion indicada aplicados a cada uno de sus elemetos  */  
                return {
                    codigoProducto: producto.getCodigoProducto(),
                    nombreProducto: producto.getNombreProducto(),
                    inventarioProducto: producto.getInventarioProducto(),
                    precioProducto: producto.getPrecioProducto(),
                };
            });

           /*  stringify para copiar los datos en una cadenaJson */
        /*    null nos permite definir un valor nulo o vacio */

            const cadenaJson = JSON.stringify(instanciaClaseAObjetos, null, 2);
            const nombreArchivo = 'datos.json';
            fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');
           
           /*  utf nos permite admitir cualquir tipo de caracter  */


            console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.magenta);
        }

        mostrarProductos() {
            this.#listaProductos.forEach((producto) => {
                console.log(
                    `|    `.yellow +
                    producto.getCodigoProducto() +
                    `      |`.yellow +
                    `|    ` +
                    producto.getNombreProducto() +
                    `      |`.yellow +
                    `|    ` +
                    producto.getInventarioProducto() +
                    `       |`.yellow +
                    `|    ` +
                    producto.getPrecioProducto() +
                    `      |`.yellow
                );
            });
        }

      

agregarNuevoProducto() {
    const readline1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    readline1.question('¿Desea agregar un nuevo producto? (si/no): '.magenta, (respuesta) => {
        if (respuesta.toLowerCase() === 'si') {
            readline1.question('Ingrese el código del nuevo producto: '.blue, (codigo) => {
                readline1.question('Ingrese el nombre del nuevo producto: '.blue, (nombre) => {
                    readline1.question('Ingrese el inventario del nuevo producto: '.blue, (inventario) => {
                        readline1.question('Ingrese el precio del nuevo producto: '.blue, (precio) => {
                            readline1.question('Ingrese el nombre del cliente: '.blue, (cliente) => {
                                const nuevoProducto = new Producto();
                                nuevoProducto.setCodigoProducto(codigo);
                                nuevoProducto.setNombreProducto(nombre);
                                nuevoProducto.setInventarioProducto(parseInt(inventario));
                                nuevoProducto.setPrecioProducto(parseFloat(precio));

                                this.#listaProductos.push(nuevoProducto);

                                console.log('Nuevo producto agregado:'.bgGreen);
                                console.log('Código:', codigo);
                                console.log('Nombre:', nombre);
                                console.log('Inventario:', inventario);
                                console.log('Precio:', precio);
                                console.log('Cliente:', cliente);

                            
                                this.grabaArchivoProducto();

                                
                                this.agregarNuevoProducto();
                            });
                        });
                    });
                });
            });
        } else {
            console.log('No se agregarán más productos.'.magenta);
            rl.close();
        }
    });
   }
 }



  
    let productosTienda = new ProductoTienda();

    productosTienda.cargaArchivosProductos();

    console.log(`DATOS APERTURA TIENDA`.magenta);

    productosTienda.mostrarProductos();

    productosTienda.getListaProductos().forEach((producto) => {
        producto.setInventarioProducto(Math.floor(Math.random() * (20 - 1) + 1));
    });

    console.log(`DATOS CIERRE TIENDA`.magenta);
    productosTienda.mostrarProductos();

    productosTienda.grabaArchivoProducto();

    productosTienda.agregarNuevoProducto();
}

main();
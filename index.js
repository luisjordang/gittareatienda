const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware para parsear el body de las solicitudes como JSON
app.use(bodyParser.json());

// Array para almacenar los productos
let productos = [
    { id: 1, nombre: 'Producto 1 - Papas Inka Chips', precio: 4 },
    { id: 2, nombre: 'Producto 2 - Gaseosa Coca Cola', precio: 13 },
    { id: 3, nombre: 'Producto 3 - Leche Gloria', precio: 7 }
];

// Array para almacenar los clientes
let clientes = [
    { id: 1, nombre: 'Jose Perez', direccion: 'ATE. Av. 15 de Julio Mz. A Lt. 39 Zona A' },
    { id: 2, nombre: 'Miguel Gutierrez', direccion: 'Plaza 30 de Agosto s/n Urb. Corpac San Isidro' },
    { id: 3, nombre: 'Fernando Miranda', direccion: ' JLBR. Av. Túpac Amarú Nº 3685 Mz. P' }
];

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido');
});

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Ruta para agregar un nuevo producto
app.post('/productos', (req, res) => {
    const { id, nombre, precio } = req.body;
    const nuevoProducto = { id, nombre, precio };
    productos.push(nuevoProducto);
    res.json({ message: 'Producto agregado', producto: nuevoProducto });
});

// Ruta para agregar un nuevo cliente
app.post('/clientes', (req, res) => {
    const { id, nombre, direccion } = req.body;
    const nuevoCliente = { id, nombre, direccion };
    clientes.push(nuevoCliente);
    res.json({ message: 'Cliente agregado', cliente: nuevoCliente });
});

// Ruta para actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const productoEncontrado = productos.find(prod => prod.id === parseInt(id));
    if (productoEncontrado) {
        productoEncontrado.nombre = nombre;
        productoEncontrado.precio = precio;
        res.json({ message: 'Producto actualizado', producto: productoEncontrado });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Ruta para actualizar un cliente existente
app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, direccion } = req.body;
    const clienteEncontrado = clientes.find(cli => cli.id === parseInt(id));
    if (clienteEncontrado) {
        clienteEncontrado.nombre = nombre;
        clienteEncontrado.direccion = direccion;
        res.json({ message: 'Cliente actualizado', cliente: clienteEncontrado });
    } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
    }
});

// Ruta para eliminar un producto existente
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const index = productos.findIndex(prod => prod.id === parseInt(id));
    if (index !== -1) {
        productos.splice(index, 1);
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Ruta para eliminar un cliente existente
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const index = clientes.findIndex(cli => cli.id === parseInt(id));
    if (index !== -1) {
        clientes.splice(index, 1);
        res.json({ message: 'Cliente eliminado' });
    } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});

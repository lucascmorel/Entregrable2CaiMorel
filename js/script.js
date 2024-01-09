let carrito = [];

function agregarAlCarrito(id, nombre, precio) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    const totalElemento = document.getElementById('total');

    carritoLista.innerHTML = '';

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    totalElemento.textContent = total.toFixed(2);

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)} 
                           <button onclick="quitarDelCarrito(${item.id})">Quitar</button>`;
        carritoLista.appendChild(li);
    });
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('No seleccionaste ningún producto. Por favor, agrega productos al carrito antes de finalizar la compra.');
        return;
    }

    const confirmarCompra = confirm('¿Estás seguro de que quieres finalizar la compra?');

    if (confirmarCompra) {
        const confirmacionMensaje = 'Gracias por su compra, esperamos que la disfrute!';
        alert(confirmacionMensaje);

        carrito = [];
        actualizarCarrito();
    }
}
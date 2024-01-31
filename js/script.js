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

    Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: `${nombre} ha sido añadido al carrito.`,
        confirmButtonColor: '#000000',
        confirmButtonText: 'Ok'
    });

    actualizarCarrito();
}

function quitarDelCarrito(id, nombre) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente && productoExistente.cantidad > 1) {

        Swal.fire({
            icon: 'question',
            title: 'Selecciona la cantidad',
            input: 'number',
            inputAttributes: {
                min: 1,
                max: productoExistente.cantidad,
                step: 1
            },
            inputValue: 1,
            confirmButtonColor: '#000000',
            confirmButtonText: 'Quitar',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const cantidadAQuitar = parseInt(result.value);
                productoExistente.cantidad -= cantidadAQuitar;

                Swal.fire({
                    icon: 'info',
                    title: 'Producto eliminado',
                    text: `${cantidadAQuitar} ${nombre} ha(n) sido eliminado(s) del carrito.`,
                    confirmButtonColor: '#000000',
                    confirmButtonText: 'Ok'
                });

                actualizarCarrito();
            }
        });
    } else {

        carrito = carrito.filter(item => item.id !== id);

        Swal.fire({
            icon: 'info',
            title: 'Producto eliminado',
            text: `${nombre} ha sido eliminado del carrito.`,
            confirmButtonColor: '#000000',
            confirmButtonText: 'Ok'
        });

        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    const totalElemento = document.getElementById('total');

    carritoLista.innerHTML = '';

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    totalElemento.textContent = total.toFixed(2);

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.className = 'carrito-item';
        li.innerHTML = `
            <div>${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</div>
            <div>
                <button class="quitar" onclick="quitarDelCarrito(${item.id}, '${item.nombre}')">Quitar</button>
            </div>`;
        carritoLista.appendChild(li);
    });
}

function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'No seleccionaste ningún producto. Por favor, agrega productos al carrito antes de finalizar la compra.',
            confirmButtonColor: '#000000',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    Swal.fire({
        icon: 'question',
        title: '¿Estás seguro de que quieres finalizar la compra?',
        showCancelButton: true,
        confirmButtonColor: '#000000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar compra'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: '¡Gracias por su compra!',
                text: 'Esperamos que la disfrute.',
                confirmButtonColor: '#000000',
                confirmButtonText: 'Ok'
            });

            carrito = [];
            actualizarCarrito();
        }
    });
}

//contact

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('.main-c__personaldata__form');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('name').value;
        const telefono = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('message').value;

        if (!nombre || !telefono || !email || !mensaje) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes completar todos los campos antes de enviar.',
                confirmButtonColor: '#000000',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        if (!/^[0-9]+$/.test(telefono)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo de teléfono solo debe contener números.',
                confirmButtonColor: '#000000',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: '¡Formulario Enviado!',
            text: 'Gracias por suscribirte a nuestra newsletter.',
            confirmButtonColor: '#000000',
            confirmButtonText: 'Ok'
        });

        formulario.reset();
    });
});
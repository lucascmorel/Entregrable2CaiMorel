function mostrarMensaje(mensaje) {
    alert(mensaje);
}

let aceptaTerminos = false;
let usuarios = [];

while (!aceptaTerminos) {
    let nombreUsuario;
    let apellidoUsuario;

    do {
        nombreUsuario = prompt('Ingresa tu nombre');

        //solo letras, incluyendo ñ, acetnos y espacios. no se aceptan números
        if (!nombreUsuario) {
            mostrarMensaje('Debes ingresar tu nombre.');
        } else if (!/^[A-Za-zñáéíóúü\s]+$/.test(nombreUsuario)) {
            mostrarMensaje('Lo sentimos, el nombre no puede contener números ni caracteres especiales.');
        }
    } while (!nombreUsuario || !/^[A-Za-zñáéíóúü\s]+$/.test(nombreUsuario));

    do {
        apellidoUsuario = prompt('Ingresa tu apellido');

        //solo letras, incluyendo ñ, acentos y espacios. no se aceptan números
        if (!apellidoUsuario) {
            mostrarMensaje('Debes ingresar tu apellido.');
        } else if (!/^[A-Za-zñáéíóúü\s]+$/.test(apellidoUsuario)) {
            mostrarMensaje('Lo sentimos, el apellido no puede contener números ni caracteres especiales.');
        }
    } while (!apellidoUsuario || !/^[A-Za-zñáéíóúü\s]+$/.test(apellidoUsuario));

    aceptaTerminos = confirm('¿Aceptas los términos y condiciones?');

    if (!aceptaTerminos) {
        mostrarMensaje('Lamentablemente, debes aceptar los términos y condiciones para continuar.');

        const intentarDeNuevo = confirm('¿Quieres intentarlo de nuevo?');
        if (intentarDeNuevo) {
            //reiniciar el bucle desde el principio
            continue;
        } else {
            //salir del bucle y volver al principio
            aceptaTerminos = false;
            continue;
        }
    } else {
        //formatear nombres y apellidos
        const nombreFormateado = nombreUsuario.charAt(0).toUpperCase() + nombreUsuario.slice(1);
        const apellidoFormateado = apellidoUsuario.charAt(0).toUpperCase() + apellidoUsuario.slice(1);

        usuarios.push({ nombre: nombreFormateado, apellido: apellidoFormateado });

        mostrarMensaje(`¡Bienvenid@ a "Mike Tyson Shop" ${nombreFormateado} ${apellidoFormateado}!`);
    }
}

//En principio, la página tiene un prompt para ingresar nombre y apellido. no nos dejará continuar si el prompt no tiene contenido o si tiene números

//Luego, nos dará la opción de aceptar lo terminos y condiciones, si tocamos "aceptar", nos dejará continuar, pero si tocamos "cancelar", nos dará un aviso de que básicamente, no podemos entrar sin aceptar los terminos y condiciones, pero nos dará una oportunidad para empezar de nuevo...

//Luego tiene una bienvenida para el usuario!

//finalmente podremos acceder a la página
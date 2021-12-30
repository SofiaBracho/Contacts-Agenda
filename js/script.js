// Formulario contacto
const formularioContacto = document.querySelector('#contacto');
//Lista contactos
const listadoContactos = document.querySelector('.listado-contactos tbody');
//Buscadot
const buscadorContactos = document.querySelector('#buscar');


eventListeners();

function eventListeners() {
    //Leer el formulario cuando se envian los datos
    formularioContacto.addEventListener('submit', leerFormulario);

    //Eliminar un elemento
    if(listadoContactos) {
        listadoContactos.addEventListener('click', eliminarContacto);
    }

    //Buscar un contacto
    if(buscadorContactos) {
        buscadorContactos.addEventListener('input', buscarContactos);
    }

    //Contador de contactos
    numeroContactos();
}

function leerFormulario(e) {
    e.preventDefault();
    
    //Campos
    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value,
          accion = document.querySelector('#accion').value;

    //Validando el formulario
    if(nombre === '' || empresa === '' || telefono === '') {
        mostrarNotificacion('Los campos son Obligatorios', 'error');
    } else {
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        if(accion === 'crear') {
            insertarBD(infoContacto);
        } else {
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);

            //Modificar el registro
            actualizarRegistro(infoContacto);

            setTimeout(() => {
                window.location.href = 'index.php';
            }, 4000);
        }        
    }
}


function insertarBD(datos) {

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'includes/modelos/modelo-contactos.php', true);

    xhr.onload = function() {
        if(this.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);

            //Insertar el nuevo contacto en la tabla
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //Crear contenedor para los botones
            const contenedorAcciones = document.createElement('td');

            //Crear icono de editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            //Enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn-editar', 'btn');

            //Agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            //Crear el icono de eliminat
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            //Crear el boton de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn-borrar', 'btn');

            //Agregarlo al padre
            contenedorAcciones.appendChild(btnEliminar);

            //Agregarlo al tr
            nuevoContacto.appendChild(contenedorAcciones);

            //Agregarlo a los contactos
            listadoContactos.appendChild(nuevoContacto);

            //Resetear el formulario
            document.querySelector('form').reset();

            //Mostrar la notificación
            mostrarNotificacion('Contacto Creado Correctamente', 'exito');

            //Actualizar numero
            numeroContactos();
        }
    }

    //Enviar los datos
    xhr.send(datos);
}

function actualizarRegistro(datos) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'includes/modelos/modelo-contactos.php', true);

    xhr.onload = function() {
        if(xhr.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);

            if(respuesta.respuesta == 'exito') {
                mostrarNotificacion('El contacto se actualizó correctamente', respuesta.respuesta);
            } else {
                mostrarNotificacion('Hubo un error al actualizar el contacto', respuesta.respuesta);
            }
        }
    }

    xhr.send(datos);
}

function eliminarContacto(e) {
    if(e.target.parentElement.classList.contains('btn-borrar')) {
        //Tomar el id
        const id = e.target.parentElement.getAttribute('data-id');

        //Confirmar si el usuario quiere eliminar el contacto
        const respuesta = confirm('¿Estás seguro que quieres eliminar el contacto?');

        if(respuesta) {
            //Hacer llamado a AJAX
            const xhr = new XMLHttpRequest();

            //Abrir la conexión
            xhr.open('GET', `includes/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);

            //Ejecutar el request
            xhr.onload = function() {
                if(this.status === 200) {
                    const respuesta = JSON.parse(xhr.responseText);

                    if(respuesta.resultado === 'exito') {
                        //Eliminar el contacto del DOM
                        e.target.parentElement.parentElement.parentElement.remove();

                        //Mostrar notificación
                        mostrarNotificacion('Contacto eliminado', 'exito');

                        //Cambiar numero
                        numeroContactos();
                    } else {
                        //Mostrar notificación de error
                        mostrarNotificacion('Hubo un error...', 'error');
                    }
                }
            }

            //Enviar
            xhr.send();
        } 
    }
}

function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    formularioContacto.insertBefore(notificacion, document.querySelector('form legend'));

    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);
}

function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i"),
          registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro => {
        //Ocultarlo
        registro.style.display = 'none';
        
        //Buscar en cada registro
        if(registro.childNodes[1].textContent.search(expresion) != -1 || 
           registro.childNodes[3].textContent.search(expresion) != -1 ||
           registro.childNodes[5].textContent.search(expresion) != -1) {

            registro.style.display = 'table-row';
        }
    });

    numeroContactos();
}

function numeroContactos() {
    const totalContactos = document.querySelectorAll('.listado-contactos tbody tr'),
          contenedorNumero = document.querySelector('.total-contactos span');
        
    let total = 0;
    
    totalContactos.forEach(contacto => {
        if(contacto.style.display == '' || contacto.style.display == 'table-row') {
            total++;
        }
    });

    contenedorNumero.textContent = total;
}


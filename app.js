
const formulario = document.getElementById("formulario-nota");
const titulo = document.getElementById("titulo");
const contenido = document.getElementById("contenido");
const botonAgregar = document.getElementById("boton-agregar");
const ayudaFormulario = document.getElementById("ayuda-formulario");
const listaNotas = document.getElementById("lista-notas");
const estadoVacio = document.getElementById("estado-vacio");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");

let notas = [];
let siguienteId = 1;
let notaPendienteEliminar = null;

function mostrarMensaje(texto, tipo = "exito") {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
}

function actualizarFormulario() {
    const tituloValido = titulo.value.trim().length > 0;
    const contenidoValido = contenido.value.trim().length > 0;

    botonAgregar.disabled = !(tituloValido && contenidoValido);

    ayudaFormulario.textContent = botonAgregar.disabled
        ? "Completa el título y el contenido para agregar una nota."
        : "Todo listo. Puedes agregar tu nota.";
}

function actualizarContador() {
    contador.textContent =
        `${notas.length} ${notas.length === 1 ? "nota" : "notas"}`;
}

function crearBoton(texto, clase, accion) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = texto;
    boton.className = clase;
    boton.addEventListener("click", accion);
    return boton;
}

function renderizarNotas() {
    listaNotas.replaceChildren();

    if (notas.length === 0) {
        listaNotas.appendChild(estadoVacio);
        estadoVacio.hidden = false;
    } else {
        estadoVacio.hidden = true;

        notas.forEach((nota) => {
            const tarjeta = document.createElement("article");
            tarjeta.className = "nota";

            const tituloNota = document.createElement("h3");
            tituloNota.textContent = nota.titulo;

            const textoNota = document.createElement("p");
            textoNota.textContent = nota.contenido;

            const fecha = document.createElement("p");
            fecha.className = "fecha";
            fecha.textContent = nota.fecha;

            const acciones = document.createElement("div");
            acciones.className = "acciones-nota";

            const botonEliminar = crearBoton(
                "Eliminar nota",
                "boton-eliminar",
                () => confirmarEliminacion(nota.id)
            );

            acciones.appendChild(botonEliminar);
            tarjeta.append(tituloNota, textoNota, fecha, acciones);
            listaNotas.appendChild(tarjeta);
        });
    }

    actualizarContador();
}

formulario.addEventListener("input", actualizarFormulario);

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const tituloLimpio = titulo.value.trim();
    const contenidoLimpio = contenido.value.trim();

    if (!tituloLimpio || !contenidoLimpio) {
        mostrarMensaje("Completa ambos campos antes de guardar.", "error");
        return;
    }

    const nota = {
        id: siguienteId++,
        titulo: tituloLimpio,
        contenido: contenidoLimpio,
        fecha: new Date().toLocaleString("es-PE")
    };

    notas.unshift(nota);
    renderizarNotas();
    formulario.reset();
    actualizarFormulario();
    mostrarMensaje("Nota agregada correctamente.");

    titulo.focus();
});

function confirmarEliminacion(id) {
    if (notaPendienteEliminar !== null) {
        mostrarMensaje("Termina primero la acción pendiente.", "error");
        return;
    }

    const nota = notas.find((elemento) => elemento.id === id);

    if (!nota) {
        mostrarMensaje("No se encontró la nota.", "error");
        return;
    }

    notaPendienteEliminar = nota;

    const aviso = document.createElement("div");
    aviso.className = "nota";
    aviso.id = "confirmacion-eliminar";
    aviso.setAttribute("role", "group");
    aviso.setAttribute("aria-label", "Confirmar eliminación");

    const pregunta = document.createElement("p");
    pregunta.textContent = `¿Eliminar la nota "${nota.titulo}"?`;

    const acciones = document.createElement("div");
    acciones.className = "acciones-nota";

    const cancelar = crearBoton("Cancelar", "boton-cancelar", () => {
        notaPendienteEliminar = null;
        aviso.remove();
        mostrarMensaje("Eliminación cancelada.");
    });

    const eliminar = crearBoton("Confirmar eliminación", "boton-eliminar", () => {
        notas = notas.filter((elemento) => elemento.id !== id);
        notaPendienteEliminar = null;
        aviso.remove();
        renderizarNotas();
        mostrarMensaje("Nota eliminada correctamente.");
    });

    acciones.append(cancelar, eliminar);
    aviso.append(pregunta, acciones);
    listaNotas.prepend(aviso);
    cancelar.focus();
}

actualizarFormulario();
renderizarNotas();

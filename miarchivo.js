// Inicio Variables de información
let camisetas = [];
let usuario;
// Termino Variables de información

// Inicio Variables para elementos de autenticación y usuario
let formularioIdentificacion;
let contenedorIdentificacion;
let contenedorUsuario;
let textoUsuario;
let limpiarStorage;
// Termino Variables para elementos de autenticación y usuario

// Inicio Variables para formulario de camisetas
let formulario;
let inputId;
let inputEquipo;
let inputDorsal;
let inputTalla;
let inputCantidad;
let contenedorCamisetas;
// Termino Variables para formulario de camisetas

class Camiseta {
  constructor(id, equipo, dorsal, talla, cantidad) {
    this.id = id;
    this.equipo = equipo.toUpperCase();
    this.dorsal = dorsal.toUpperCase();
    this.talla = talla;
    this.cantidad = cantidad;
  }
}

function inicializarElementos() {
  formularioIdentificacion = document.getElementById("formularioIdentificacion");
  inputUsuario = document.getElementById("inputUsuario");
  contenedorIdentificacion = document.getElementById("contenedorIdentificacion");
  contenedorUsuario = document.getElementById("contenedorUsuario");
  textoUsuario = document.getElementById("textoUsuario");
  
  limpiarStorage = document.getElementById("limpiarStorage");

  formulario = document.getElementById("formulario");
  inputId = document.getElementById("inputId");
  inputEquipo = document.getElementById("inputEquipo");
  inputDorsal = document.getElementById("inputDorsal");
  inputTalla = document.getElementById("inputTalla");
  inputCantidad = document.getElementById("inputCantidad");
  contenedorCamisetas = document.getElementById("contenedorCamisetas");
}

function inicializarEventos() {
  formulario.onsubmit = (event) => validarFormulario(event);
  formularioIdentificacion.onsubmit = (event) => identificarUsuario(event);
  limpiarStorage.onclick = eliminarStorage;
}

function eliminarStorage() {
  localStorage.clear();
  usuario = "";
  camisetas = [];
  mostrarFormularioIdentificacion();
  pintarCamisetas();
}

function identificarUsuario(event) {
  event.preventDefault();
  usuario = inputUsuario.value;
  formularioIdentificacion.reset();
  actualizarUsuarioStorage();
  mostrarTextoUsuario();
}

function mostrarTextoUsuario() {
  contenedorIdentificacion.hidden = true;
  contenedorUsuario.hidden = false;
  textoUsuario.innerHTML += ` ${usuario}`;
}

function mostrarFormularioIdentificacion() {
  contenedorIdentificacion.hidden = false;
  contenedorUsuario.hidden = true;
  textoUsuario.innerHTML = ``;
}

function validarFormulario(event) {
  event.preventDefault();
  if (usuario) {
    let idCamiseta = inputId.value;
    let equipo = inputEquipo.value;
    let dorsal = inputDorsal.value;
    let talla = parseFloat(inputTalla.value);
    let cantidad = parseInt(inputCantidad.value);

    const idExiste = camisetas.some((camiseta) => camiseta.id === idCamiseta);
    if (!idExiste) {
      let camiseta = new Camiseta(
        idCamiseta,
        equipo,
        dorsal,
        talla,
        cantidad
      );

      camisetas.push(camiseta);
      formulario.reset();
      actualizarCamisetasStorage();
      pintarCamisetas();
    } else {
      alert("El id ya existe");
    }
  } else {
    alert("Identifíquese antes de agregar una camiseta");
  }
}

function eliminarCamiseta(idCamiseta) {
  let columnaBorrar = document.getElementById(`columna-${idCamiseta}`);
  let indiceBorrar = camisetas.findIndex(
    (camiseta) => Number(camiseta.id) === Number(idCamiseta)
  );

  camisetas.splice(indiceBorrar, 1);
  columnaBorrar.remove();
  actualizarCamisetasStorage();
}

function pintarCamisetas() {
  contenedorCamisetas.innerHTML = "";
  camisetas.forEach((camiseta) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3";
    column.id = `columna-${camiseta.id}`;
    column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${camiseta.id}</b>
                </p>
                <p class="card-text">Equipo:
                    <b>${camiseta.equipo}</b>
                </p>
                <p class="card-text">Dorsal:
                    <b>${camiseta.dorsal}</b>
                </p>
                <p class="card-text">Talla:
                    <b>${camiseta.talla}</b>
                </p>
                <p class="card-text">Cantidad:
                    <b>${camiseta.cantidad}</b>
                </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" id="botonEliminar-${camiseta.id}" >Eliminar</button>
                </div>
            </div>`;

    contenedorCamisetas.append(column);

    let botonEliminar = document.getElementById(`botonEliminar-${camiseta.id}`);
    botonEliminar.onclick = () => eliminarCamiseta(camiseta.id);
  });
}

function actualizarCamisetasStorage() {
  let camisetasJSON = JSON.stringify(camisetas);
  localStorage.setItem("camisetas", camisetasJSON);
}

function actualizarUsuarioStorage() {
  localStorage.setItem("usuario", usuario);
}

function obtenerCamisetasStorage() {
  let camisetasJSON = localStorage.getItem("camisetas");
  if (camisetasJSON) {
    camisetas = JSON.parse(camisetasJSON);
    pintarCamisetas();
  }
}

function obtenerUsuarioStorage() {
  let usuarioAlmacenado = localStorage.getItem("usuario");
  if (usuarioAlmacenado) {
    usuario = usuarioAlmacenado;
    mostrarTextoUsuario();
  }
}

function main() {
  inicializarElementos();
  inicializarEventos();
  obtenerCamisetasStorage();
  obtenerUsuarioStorage();
}

main();
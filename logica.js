class Usuario {
    constructor(nombre, edad, ocupacion) {
        this.nombre = nombre;
        this.edad = edad;
        this.ocupacion = ocupacion;
    }
    describir() {
        return `${this.nombre}, ${this.edad} años, ${this.ocupacion}`;
    }
    esAdulto() {
        return this.edad >= 18;
    }
}

const usuarios = [];

function obtenerEtapa(edad) {
    if (edad >= 13 && edad <= 17) {
        return "adolescente";
    } else if (edad >= 18 && edad <= 30) {
        return "adulto joven";
    } else if (edad > 30) {
        return "adulto";
    }
    return "niño/a";
}

function guardarDatos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("✅ Datos guardados exitosamente");
        }, 2000);
    });
}

const formulario = document.getElementById("formularioUsuario");
const mensajesDiv = document.getElementById("mensajes");
const listaUsuariosDiv = document.getElementById("listaUsuarios");
const botonFiltrar = document.getElementById("filtrarMayores");
const botonMostrarTodos = document.getElementById("mostrarTodos");

function mostrarUsuarios(listaAMostrar = usuarios) {
    console.table(listaAMostrar);
    listaUsuariosDiv.innerHTML = "";
    if (listaAMostrar.length === 0) {
        listaUsuariosDiv.innerHTML = "<p>No hay usuarios para mostrar.</p>";
        return;
    }
    listaAMostrar.forEach(usuario => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${usuario.nombre}</h3>
            <p>Edad: ${usuario.edad} años</p>
            <p>Ocupación: ${usuario.ocupacion}</p>
            <p>Etapa: ${obtenerEtapa(usuario.edad)}</p>
            <p>Es adulto: ${usuario.esAdulto() ? "Sí" : "No"}</p>
        `;
        listaUsuariosDiv.appendChild(card);
    });
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);
    const ocupacion = document.getElementById("ocupacion").value.trim();

    if (nombre === "" || isNaN(edad) || edad <= 0) {
        mensajesDiv.textContent = "❌ Por favor, completa todos los campos correctamente.";
        mensajesDiv.classList.add("error");
        return;
    }
    mensajesDiv.classList.remove("error");

    const nuevoUsuario = new Usuario(nombre, edad, ocupacion);
    usuarios.push(nuevoUsuario);

    mostrarUsuarios();

    let mensajeBienvenida = `Hola ${nuevoUsuario.nombre}, bienvenido/a.`;
    if (!nuevoUsuario.esAdulto()) {
        mensajeBienvenida = `Hola ${nuevoUsuario.nombre}, eres menor de edad.`;
    }
    
    const etapaVida = obtenerEtapa(nuevoUsuario.edad);
    mensajeBienvenida += ` Eres un/a ${etapaVida}.`;
    mensajesDiv.textContent = mensajeBienvenida;

    mensajesDiv.textContent += "\nGuardando datos...";
    guardarDatos().then((mensaje) => {
        mensajesDiv.textContent = mensajeBienvenida + "\n" + mensaje;
    }).catch((error) => {
        console.error("Hubo un error al guardar:", error);
        mensajesDiv.textContent = "Hubo un error al guardar los datos.";
        mensajesDiv.classList.add("error");
    });
    
    formulario.reset();
});

botonFiltrar.addEventListener("click", () => {
    const usuariosMayores = usuarios.filter(usuario => usuario.esAdulto());
    mostrarUsuarios(usuariosMayores);
});

botonMostrarTodos.addEventListener("click", () => {
    mostrarUsuarios();
});
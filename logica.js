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
        }, 2000); // 
    });
}
const formulario = document.getElementById("formularioUsuario");
const mensajesDiv = document.getElementById("mensajes");
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
    let usuario = {
        nombre: nombre,
        edad: edad,
        ocupacion: ocupacion 
    };
    console.log("Objeto usuario:", usuario);
    const usuarioJSON = JSON.stringify(usuario);
    console.log("Objeto JSON:", usuarioJSON);
    usuarios.push(usuario);
    console.log("Tabla de usuarios:");
    console.table(usuarios);
    let mensajeBienvenida = "";
    if (edad < 18) {
        mensajeBienvenida = `Hola ${nombre}, eres menor de edad.`;
    } else {
        mensajeBienvenida = `Hola ${nombre}, bienvenido/a.`;
    }
    const etapaVida = obtenerEtapa(edad);
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
});
//Variables let a utilizar mas adelante
let comer;
let noche = false;
let sonido;
let preguntas = []; //JSON
let comidas = []; //JSON
let formasDeAmor = []; //JSON
let deNoche = []; //JSON

//Constantes
// Objeto Mascota
const miMascota = {
    nombre: "",
    energia: 80,
    salud: 80,
    edad: 1,
    dinero: 1,
};
//Constante para asegurarme que la mascota sigue viva
const mascotaViva = () => miMascota.salud > 0 && miMascota.energia > 0;

//cambio dia y noche constantes
const imgMascota = document.getElementById("img_mascota");
const elementosDeTexto = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, #respuestaNombre"
);
const opcionesFondo = document.querySelectorAll(".opciones");
const fondosRosas = document.querySelectorAll(".boton, .card");

//ARRAYS QUE NO PASE A JSON PORQ EL EFECTO COMO UTILIZA "+" NO ME PERMITE IMPLEMENTARLO 
    // Array de comidas

    // Array de formas de dar amor

    //Array de posibilidades para cada día


//inicio del Juego, recarga partida anterior o empieza una nueva
function cargarPartida() {
    Swal.fire({
        title: "¿Quieres cargar una partida o comenzar una nueva?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Cargar",
        denyButtonText: `Nueva partida`,
        denyButtonColor: "#88dc65",
        width: 600,
        backdrop: `
            rgba(0,0,123,0.4)
            url("./img/PYh.gif")
            left top
            no-repeat
            `,
    }).then((result) => {
        if (result.isConfirmed) {
            cargarProgreso();
        }
    });
}
cargarPartida();

//JSON y guardado del juego
function guardarProgreso() {
    localStorage.setItem("progresoMascota", JSON.stringify(miMascota));
}
function cargarProgreso() {
    const progresoGuardado = localStorage.getItem("progresoMascota");
    if (progresoGuardado) {
        const progresoParseado = JSON.parse(progresoGuardado);
        miMascota.nombre = progresoParseado.nombre;
        miMascota.salud = progresoParseado.salud;
        miMascota.energia = progresoParseado.energia;
        miMascota.edad = progresoParseado.edad;
        actualizarInfoEnPantalla();
        document.getElementById("respuestaNombre").textContent = miMascota.nombre;
        cambiarTextoCard("¡Te extrañé!");
    }
}

//COLOCAR NOMBRE A LA MASCOTA
function nombrarMascota() {
    const nombreInput = document
        .getElementById("nombre")
        .value.trim()
        .toUpperCase();
    if (!nombreInput) {
        return;
    } else {
        miMascota.nombre = nombreInput;
        const nombreMascota = document.getElementById("respuestaNombre");
        nombreMascota.textContent = miMascota.nombre;
        nombreMascota.style.display = "block";
        sonido = new Audio("./audios/dia.mp3");
        sonido.play();
        const mensajeBienvenida = `¡Bienvenidx! Ahora tenés una mascota que se llama ${miMascota.nombre}. Cuídala dándole comida y amor. Para ello deberás responder diversas preguntas. No te tardes porque cada día que crece pierde salud y energía `;
        cambiarTextoCard(mensajeBienvenida);
        guardarProgreso();
    }
}
//FUNCIONES DE JUGABILIDAD
//CRECE LA MASCOTA SEGUN LOS DIAS DE VIDA
function ajustarAnchoImagen() {
    const anchoAdicional = miMascota.edad * 25; // Cada año + 25px
    imgMascota.style.width = `${200 + anchoAdicional}px`;
}
// INCREMENTAR DIAS DE VIDA DE LA MASCOTA
function incrementarDiaVida() {
    if (mascotaViva()) {
        miMascota.edad += 1;
        miMascota.energia -= 10;
        miMascota.salud -= 10;
        sonido = new Audio("./audios/gluglu.mp3");
        sonido.play();
        actualizarInfoEnPantalla();
        ajustarAnchoImagen();
        if (miMascota.salud <= 0 || miMascota.energia <= 0) {
            sonido = new Audio("./audios/rip.mp3");
            sonido.play();
            Swal.fire({
                icon: "error",
                title: "¡Tu mascota ha muerto! ✝",
                text: `Tu mascota se ha quedado sin energía y/o salud.`,
                footer:
                    '<a href="https://www.youtube.com/watch?v=-NVHn19CnDY">INSTRUCTIVO PARA CUIDAR MASCOTAS</a>',
                confirmButtonText: "Volver a intentarlo",
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            localStorage.clear();
            return;
        }
    }
}

// SET INTERVAL CADA 50 SEGUNDOS 1 DÍA MAS DE VIDA
setInterval(incrementarDiaVida, 50000); // 50 seg

//INTENTO DE MODO NOCTURNO SIN AYUDA, PERO FUNCIONÓ
function cambiarDiaNoche() {
    if (noche === false) {
        imgMascota.src = "./img/gato-dia.png";
        document.body.style.backgroundImage = "url('./img/fondo-dia2.jpg')";
        elementosDeTexto.forEach((elemento) => {
            elemento.style.color = "black";
        });
        opcionesFondo.forEach((elemento) => {
            elemento.style.backgroundColor = "aquamarine";
        });
        fondosRosas.forEach((elemento) => {
            elemento.style.backgroundColor = "rgb(229, 127, 255)";
        });
        document.body.style.backgroundColor = "#7DB645";
    } else {
        imgMascota.src = "./img/gato-noche.png";
        document.body.style.backgroundImage = "url('./img/fondo-noche3.jpg')";
        elementosDeTexto.forEach((elemento) => {
            elemento.style.color = "white";
        });
        opcionesFondo.forEach((elemento) => {
            elemento.style.backgroundColor = "midnightblue";
        });
        fondosRosas.forEach((elemento) => {
            elemento.style.backgroundColor = "indigo";
        });
        document.body.style.backgroundColor = "darkslateblue";
    }
}
// CAMBIAR TEXTO EN CARD ROSA , NARRACIÓN DEL JUEGO
function cambiarTextoCard(mensaje) {
    const mensajeConsol = document.getElementById("mensajeConsol");
    mensajeConsol.innerHTML = mensaje;
}

// CAMBIOS EN LOS ICONOS DE LA PANTALLA DE SALUD, ENERGÍA Y DÍAS DE VIDA
function actualizarInfoEnPantalla() {
    const infoSalud = document.getElementById("infoSalud");
    const infoEnergia = document.getElementById("infoEnergia");
    const infoEdad = document.getElementById("infoEdad");
    const infoDinero = document.getElementById("infoDinero")
    infoSalud.textContent = "Salud = " + miMascota.salud;
    infoEnergia.textContent = "Energía = " + miMascota.energia;
    infoEdad.textContent = "Días de vida = " + miMascota.edad;
    infoDinero.textContent = "$" + miMascota.dinero;
    guardarProgreso();
}
function maxMin() {
    miMascota.salud = Math.min(miMascota.salud, 100);
    miMascota.energia = Math.min(miMascota.energia, 100);
    miMascota.salud = Math.max(miMascota.salud, 0);
    miMascota.energia = Math.max(miMascota.energia, 0);
}
function incrementarDinero() {
    const cantidadGanada = 3; 
    miMascota.dinero += cantidadGanada;

}
/****************************************************************************/
/*                             COMPRAR ESTILOS                              */
/****************************************************************************/
// function comprar () {
//     const mascotasDiv = document.getElementById("mascotas");
//     const seleccionMascotaDiv = document.getElementById("seleccionMascota");
//     mascotasDiv.style.display = "none";
//     seleccionMascotaDiv.style.display = "block";
// }
// function volverAtras() {
//     const mascotasDiv = document.getElementById("mascotas");
//     const seleccionMascotaDiv = document.getElementById("seleccionMascota");
//     mascotasDiv.style.display = "block";
//     seleccionMascotaDiv.style.display = "none";
// }

// FUNCIONES ASINCRONICAS 
//cargar preguntas 
async function cargarPreguntasDesdeJSON() {
    try {
        const response = await fetch("./json/preguntas.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar las preguntas:", error);
        return [];
    }
}
cargarPreguntasDesdeJSON().then((data) => {
    preguntas = data;
});

//cargar comida 
async function cargarComidasDesdeJSON() {
    try {
        const response = await fetch("./json/comidas.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar las comidas:", error);
        return [];
    }
}
cargarComidasDesdeJSON().then((data) => {
    comidas = data;
});
//cargar formasDeAmor
async function cargarFormasDeAmorDesdeJSON() {
    try {
        const response = await fetch("./json/formasdeamor.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar las formas de dar amor:", error);
        return [];
    }
}
cargarFormasDeAmorDesdeJSON().then((data) => {
    formasDeAmor = data;
});
//cargar deNoche 
async function cargarDeNocheDesdeJSON() {
    try {
        const response = await fetch("./json/denoche.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar de noche:", error);
        return [];
    }
}
cargarFormasDeAmorDesdeJSON().then((data) => {
    deNoche = data;
});
//DAR COMIDA A LA MASCOTA
function darComida(opcionComida) {
    const azar = Math.floor(Math.random() * preguntas.length);
    Swal.fire({
        icon: "question",
        title: "Responder la pregunta",
        html: `${preguntas[azar].pregunta}`,
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            const respuesta = result.value.toLowerCase();
            if (respuesta === `${preguntas[azar].respuesta}`) {
                const comidaElegida = comidas.find(
                    (darComida) => darComida.nombre === opcionComida
                );
                if (comidaElegida) {
                    miMascota.salud += comidaElegida.efecto.salud;
                    miMascota.energia += comidaElegida.efecto.energia;
                    maxMin()
                    if (miMascota.salud <= 0 || miMascota.energia <= 0) {
                        sonido = new Audio("./audios/rip.mp3");
                        sonido.play();
                        Swal.fire({
                            icon: "error",
                            title: "¡Tu mascota ha muerto! ✝",
                            text: `${comidaElegida.mensaje} Tu mascota se ha quedado sin energía y/o salud.`,
                            footer:
                                '<a href="https://www.youtube.com/watch?v=-NVHn19CnDY">INSTRUCTIVO PARA CUIDAR MASCOTAS</a>',
                            confirmButtonText: "Volver a intentarlo",
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                        localStorage.clear();
                        return;
                    } else {
                        sonido = new Audio("./audios/dia.mp3");
                        sonido.play();
                        incrementarDinero();
                        actualizarInfoEnPantalla();
                        cambiarTextoCard(comidaElegida.mensaje);
                        noche = false;
                        cambiarDiaNoche();
                    }
                }
            } else {
                Swal.fire(
                    "Respuesta incorrecta",
                    `La respusta correcta era: ${preguntas[azar].respuesta}`,
                    "error"
                );
            }
        }
    });
}
//DAR AMOR A LA MASCOTA
function darAmor(opcionAmor) {
    const azar = Math.floor(Math.random() * preguntas.length);
    Swal.fire({
        icon: "question",
        title: "Responder la pregunta",
        html: `${preguntas[azar].pregunta}`,
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            const respuesta = result.value.toLowerCase();
            if (respuesta === `${preguntas[azar].respuesta}`) {
                const amorElegido = formasDeAmor.find(
                    (darAmor) => darAmor.nombre === opcionAmor
                );
                if (amorElegido) {
                    miMascota.salud += amorElegido.efecto.salud;
                    miMascota.energia += amorElegido.efecto.energia;
                    maxMin()
                    if (miMascota.salud <= 0 || miMascota.energia <= 0) {
                        sonido = new Audio("./audios/rip.mp3");
                        sonido.play();
                        Swal.fire({
                            icon: "error",
                            title: "¡Tu mascota ha muerto! ✝",
                            text: `${amorElegido.mensaje} Tu mascota se ha quedado sin energía y/o salud.`,
                            footer:
                                '<a href="https://www.youtube.com/watch?v=-NVHn19CnDY">INSTRUCTIVO PARA CUIDAR MASCOTAS</a>',
                            confirmButtonText: "Volver a intentarlo",
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                        localStorage.clear();
                        return;
                    } else {
                        sonido = new Audio("./audios/dia.mp3");
                        sonido.play();
                        incrementarDinero();
                        actualizarInfoEnPantalla();
                        cambiarTextoCard(amorElegido.mensaje);
                        noche = false;
                        cambiarDiaNoche();
                    }
                }
            } else {
                Swal.fire(
                    "Respuesta incorrecta",
                    `La respusta correcta era: ${preguntas[azar].respuesta}`,
                    "error"
                );
            }
        }
    });
}
function dormir() {
    const azar = Math.floor(Math.random() * deNoche.length);
    miMascota.salud += deNoche[azar].efecto.salud;
    miMascota.energia += deNoche[azar].efecto.energia;
    maxMin()
    noche = true;
    if (miMascota.salud <= 0 || miMascota.energia <= 0) {
        sonido = new Audio("./audios/rip.mp3");
        sonido.play();
        Swal.fire({
            icon: "error",
            title: "¡Tu mascota ha muerto! ✝",
            text: `${deNoche[azar].mensaje}`,
            footer:
                '<a href="https://www.youtube.com/watch?v=-NVHn19CnDY">INSTRUCTIVO PARA CUIDAR MASCOTAS</a>',
            confirmButtonText: "Volver a intentarlo",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
        localStorage.clear();
        return;
    } else {
        sonido = new Audio("./audios/noche.mp3");
        sonido.play();
        cambiarTextoCard(deNoche[azar].mensaje);
        actualizarInfoEnPantalla();
        cambiarDiaNoche();
    }
}

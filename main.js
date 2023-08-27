//Variables let a utilizar mas adelante
let comer;
let noche = false;
let sonido;
let preguntas = []; //JSON
//Constantes
// Objeto Mascota
const miMascota = {
    nombre: "",
    energia: 80,
    salud: 80,
    edad: 1,
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
const comidas = [
    {
        nombre: "zanahoria",
        efecto: {
            salud: 10,
            energia: 30,
        },
        mensaje:
            "Le diste zanahoria. ¡Buena elección! La energía aumenta +30 y, como la zanahoria es muy sana, su salud aumenta +10.",
    },
    {
        nombre: "hamburguesa",
        efecto: {
            salud: -30,
            energia: 80,
        },
        mensaje: `Le diste una hamburguesa. Eso da mucha energía pero no es muy sano... le sube el colesterol a  tu mascota. La energía aumenta +80 pero la salud baja -30.`,
    },
    {
        nombre: "sandia con vino",
        efecto: {
            salud: -100,
            energia: -100,
        },
        mensaje:
            "Le diste sandía con vino. ¡¿¿¿Qué estás mal de la cabeza???! ¡SOS UN ASESINO! ¡ESTOY LLAMANDO A LA POLICÍA!",
    },
    {
        nombre: "pepino",
        efecto: {
            salud: 0,
            energia: 20,
        },
        mensaje:
            "Le diste pepino. Buena elección, es una comida muy sana pero no llena mucho. La energía aumenta +20",
    },
    {
        nombre: "helado",
        efecto: {
            salud: -30,
            energia: 40,
        },
        mensaje:
            "Le diste helado. ¡Qué rico! Pero las mascotas no pueden comer eso, por lo que le da diabetes de mascotas. La energía aumenta +40 pero la salud se reduce -30",
    },
];

    // Array de formas de dar amor
const formasDeAmor = [
    {
        nombre: "abrazo",
        efecto: {
            salud: 20,
            energia: 5,
        },
        mensaje: `Le diste un abrazo a tu mascota. Tu mascota es muy feliz y no sólo aumenta su salud +20, sino también, su energía +5.`,
    },
    {
        nombre: "leerle un cuento",
        efecto: {
            salud: -20,
            energia: -10,
        },
        mensaje: `Le leíste un cuento a tu mascota. Tu mascota no te escuchó, tu mascota se puso a jugar y se golpeó la cabeza corriendo. Baja su salud -20 y su energía -10.`,
    },
    {
        nombre: "palmada en la espalda",
        efecto: {
            salud: -20,
            energia: -5,
        },
        mensaje: `Le diste una palmada en la espalda a tu mascota. Esa frialdad le destruye el corazón a tu mascota. Baja su salud -20 y su energía -5.`,
    },
    {
        nombre: "beso",
        efecto: {
            salud: 40,
            energia: 0,
        },
        mensaje: `Le diste un beso a tu mascota. Tu mascota es muy feliz. Su salud aumenta +40`,
    },
    {
        nombre: "jugar",
        efecto: {
            salud: 80,
            energia: -20,
        },
        mensaje: `Jugaste con tu mascota. Tu mascota es muy feliz pero gastó mucha energía. Su salud aumenta +80 y su enegía baja -20`,
    },
];
    //Array de posibilidades para cada día
const deNoche = [
    {
        nombre: "sueño",
        mensaje: `Durante la noche tu mascota soñó que el perro del vecino le pinchaba su pelota favorita. Se puso muy triste y se levantó asustado. Perdió -25 de salud y de energía.`,
        efecto: {
            salud: -25,
            energia: -25,
        },
    },
    {
        nombre: "techo",
        mensaje: `Durante la noche, mientras tu mascota dormía, se inundó el departamento del vecino de arriba y el techo de tu casa se cayó sobre tu mascota, que se asustó y se lastimó un poco. Perdió -40 de salud y de energía`,
        efecto: {
            salud: -40,
            energia: -40,
        },
    },
    {
        nombre: "ovnis",
        mensaje: `Durante la noche vinieron ovnis que abdujeron a tu mascota. Le hicieron estudios completos y, cuando se puso a morder los botones de la nave, trajeron a tu mascota devuelta a casa. Perdió -30 de salud y de energía`,
        efecto: {
            salud: -30,
            energia: -30,
        },
    },
    {
        nombre: "fiebre",
        mensaje: `Durante la noche a tu mascota le subió la fiebre. Por suerte ya está mejor pero gastó mucha energía y salud. Perdió -50 de salud y de energía`,
        efecto: {
            salud: -50,
            energia: -50,
        },
    },
    {
        nombre: "insomnio",
        mensaje: `Durante la noche tu mascota no pudo dormir por tener insomnio. Su energía disminuyó -30.`,
        efecto: {
            salud: 0,
            energia: -30,
        },
    },
    {
        nombre: "bien",
        mensaje: `Durante la noche tu mascota durnmió plácidamente. Recuperando +40 de salud y de energía.`,
        efecto: {
            salud: +40,
            energia: +40,
        },
    },
    {
        nombre: "fiesta",
        mensaje: `Durante la noche tu mascota no pudo dormir casi nada porque los vecinos hicieron una fiesta hasta la madrugrada. Perdió -35 de energía.`,
        efecto: {
            salud: 0,
            energia: -35,
        },
    },
    {
        nombre: "sillón",
        mensaje: `Durante la noche tu mascota mordió el sillón y lo rompió. Te enojaste y le ordenaste ir a dormir afuera. Tu mascota se puso triste. Perdió -30 de salud y de energía`,
        efecto: {
            salud: -30,
            energia: -30,
        },
    },
    {
        nombre: "sueño lindo",
        mensaje: `Durante la noche tu mascota tuvo un hermoso sueño donde comía croquetas. ¡Recuperó +30 de salud y de energía!.`,
        efecto: {
            salud: +30,
            energia: +30,
        },
    },
    {
        nombre: "ratón",
        mensaje: `Durante la noche tu mascota comenzó a perseguir un ratón. En su desenfreno no vió los muebles y se llevó puesta una silla. Perdió -40 de salud y de energía`,
        efecto: {
            salud: -40,
            energia: -40,
        },
    },
];

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
    infoSalud.textContent = "Salud = " + miMascota.salud;
    infoEnergia.textContent = "Energía = " + miMascota.energia;
    infoEdad.textContent = "Días de vida = " + miMascota.edad;
    guardarProgreso();
}
function maxMin() {
    miMascota.salud = Math.min(miMascota.salud, 100);
    miMascota.energia = Math.min(miMascota.energia, 100);
    miMascota.salud = Math.max(miMascota.salud, 0);
    miMascota.energia = Math.max(miMascota.energia, 0);
}

// FUNCIONES ASINCRONICAS 
//cargar preguntas 
async function cargarPreguntasDesdeJSON() {
    try {
        const response = await fetch("./preguntas.json");
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

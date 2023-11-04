
// Variables y arreglos globales
let botonesCuadricula = document.querySelectorAll('.modos');
let selecciones = [];
let puntaje = 0;
let numCartas = 0;
let url = "https://memorama-4388a-default-rtdb.firebaseio.com/";
let imagenes = [
    'image_1.jpg',
    'image_2.jpg',
    'image_3.jpg',
    'image_4.jpg',
    'image_5.jpg',
    'image_6.jpg',
    'image_7.jpg',
    'image_8.jpg',
    'image_9.jpg',
    'image_10.jpg',
];

// Funciones
const generarCuadricula = (cuadricula) => {
    //alert("Entré e hice la cuadricula");
    let container = document.getElementById('container');
    let copiasImg = imagenes.slice();
    let cartas = [];
    selecciones = [];
    numCartas = cuadricula;
    if(numCartas == 20){
        grid= document.getElementById("container");
        grid.style.gridTemplateColumns = "repeat(5, minmax(150px, 1fr))";
    }
    else{
        grid= document.getElementById("container");
        grid.style.gridTemplateColumns = "repeat(4, minmax(150px, 1fr))";
    }
    puntaje = 0;
    container.classList.remove('fadeIn');
    container.classList.add('fadeOut');
    for( let numCarta = 0; numCarta < cuadricula; numCarta++ ){ 
        cartas.push(`
            <div class="div-carta" onclick="seleccionarCarta(${numCarta})" >
                <div id="carta_${numCarta}" class="carta">
                    <div id="trasera_${numCarta}" class="cara trasera">
                        <img src="assets/img/${copiasImg[0]}" alt="">
                    </div>
                    <div class="cara frontal">
                        <i class="fa-solid fa-question"></i>
                    </div>
                </div>
            </div>
        `);
        if( numCarta%2 === 1 ) {
            copiasImg.splice(0,1);
        }
    }
    cartas.sort(() => Math.random() - 0.5);
    container.innerHTML = cartas.join("");
    container.classList.remove('fadeOut');
    container.classList.add('fadeIn');
    resetTimer();
}

const seleccionarCarta = (numCarta) => {
    //alert("Aqui estoy seleccionando las cartas");
    let carta = document.getElementById(`carta_${numCarta}`);
    if( carta.style.transform != "rotateY(180deg)" ) {
        carta.style.transform = "rotateY(180deg)";
        selecciones.push(numCarta);
    }
    if(selecciones.length == 2) {
        deseleccionar(selecciones);
        selecciones = [];
    }
}
//Cronometro
let startTime;
let elapsedTime = 0;
let timerInterval;

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        document.getElementById("temporizador").textContent = formatTime(elapsedTime);
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById("temporizador").textContent = formatTime(elapsedTime);
    startTimer();
}

function formatTime(time) {
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);
    return (
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds +
        "." +
        (milliseconds < 10 ? "0" : "") +
        milliseconds
    );
}

// Start the timer
startTimer();

const deseleccionar = (selecciones) => {
    //alert("Aqui me metí al deseleccionar");
    setTimeout(() => {
        let cartaUno = document.getElementById(`carta_${selecciones[0]}`);
        let cartaDos = document.getElementById(`carta_${selecciones[1]}`);
        let traseraUno = document.getElementById(`trasera_${selecciones[0]}`);
        let traseraDos = document.getElementById(`trasera_${selecciones[1]}`);
        /*Aqui se valida que las cartas volteadas sean iguales*/
        if( traseraUno.innerHTML != traseraDos.innerHTML ) {
            cartaUno.style.transform = "rotateY(0deg)";
            cartaDos.style.transform = "rotateY(0deg)";
        } else {
            traseraUno.style.opacity = "70%";
            traseraDos.style.opacity = "70%";
            puntaje++;
        }
        if(puntaje == (numCartas/2)){
            stopTimer();
            const main= document.getElementById("main");
            const alerta = document.createElement("div");
            alerta.classList.add("alerta");
            alerta.id= "alerta";
            alerta.innerHTML = 
            `
            <div class="mssgAlerta">
                <h1>Felicidades!! Has encontrado los pares</h1>
                <button type="button" id="botonAlerta" onclick="reintentar()">Intentar de nuevo</button>
            </div>
            `;
            main.append(alerta);
        }
    }, 800);
}

function reintentar() {
    const alerta=document.getElementById("alerta");
    alerta.remove();
    const boton=document.getElementById("btn4x3");
    boton.click();
    resetTimer();
}

function renderTable(data) {
    let tbody = document.getElementById('alumnosTable');
    let rowHTML = '';

    Object.keys(data).forEach(key => {
        rowHTML += `
            <tr>
                <td>${data[key].Nombre}</td>
                <td>${data[key].Tiempo}</td>
            </tr>
        `;
        tbody.innerHTML = rowHTML;
        console.log(rowHTML);
    })
}

// Eventos
botonesCuadricula.forEach((boton) => {
    boton.addEventListener('click', () => {
        generarCuadricula(parseInt(boton.value));
    });
});



// LLamar a la funcion principal
generarCuadricula(12);
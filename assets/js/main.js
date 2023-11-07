
// Variables y arreglos globales
let botonesCuadricula = document.querySelectorAll('.modos');
const timer = document.getElementById("timer");
let selecciones = [];
let puntaje = 0;
let numCartas = 0;
let timerInterval;
let rows = 0;
let columns = 0;
let tiempo = 0.0;
let seconds = 0.0;
let usuarios = 0;
//Conexión a la base de datos
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
/*  Tengo que pedir el nombre al terminar el memorama, que el tiempo empiece cuando le pique a jugar
    y que pare cuando el memorama esté terminado.
*/
// Funciones
//Función que generá el cuadro
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
    renderTable();
    comenzar();
}

function reiniciar() {
    generarCuadricula(numCartas);
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
//Borré lo que hizo el pablito e hice este timer
function comenzar() {
    clearInterval(timerInterval);
    tiempo = 0.0;
    seconds = 0.0;
    timerInterval = setInterval(function () {
        tiempo += 100;
        const totSegundos = tiempo / 1000;
        const seconds = totSegundos.toFixed(1);
        timer.textContent = `Time: ${seconds}`; 
    }, 100);
}

function detenertiempo(){
    clearInterval(timerInterval);
}

//aquí le puse un input para que mostrara el nombre a ingresar
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
        if(puntaje === (numCartas/2)){
            const main= document.getElementById("main");
             const alerta = document.createElement("div");
            alerta.classList.add("alerta");
            alerta.id= "alerta";
            detenertiempo();
            alerta.innerHTML = 
            `
            <div class="mssgAlerta">
                <h1>¡FELICIDADES!  HAS GANADO</h1>
                <input type="text" id="playerName" placeholder="Ingrese su nombre:">
                <button type="button" id="botonAlerta" onclick="reintentar()">Intentar de nuevo</button>
            </div>
            `;
            main.append(alerta);
        }
    }, 800);
}

//función con la acción de volver estando ingresando el nombre del jugador
/*
function Volver() {
    const playerNameInput = document.getElementById("playerName");
    NewUser(playerNameInput.value);
    playerNameInput.value = "";
    const ventana = document.getElementById("ventana");
    //ventana.style.top = "100%";
    generarCuadricula(12);
    UpdateScores();
}*/

function reintentar() {
    const playerName = document.getElementById("playerName");
    NewUser(playerName.value);
    const alerta = document.getElementById("alerta");
    alerta.remove();
    const boton=document.getElementById("btn-comenzar");
    boton.click();
    comenzar();
}


//Esto va conectado a la base de datos
function NewUser(data) {
    const playerName = data;
    const timefor = tiempo / 1000;
    if (numCartas == 12) {

        let user = {
            nombre: playerName,
            tiempo: timefor
        }
        console.log(JSON.stringify(user, null, 4));
        fetch(`${url}/users3.json`, {
            method: 'POST',
            body: JSON.stringify(user, null, 4),
            headers: { 'Content-type' : 'application/json; charset=UTF-8' }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Ha ocurrido un error: ", error));
    }
    else if (numCartas == 16) {
        let user = {
            nombre: playerName,
            tiempo: timefor
        }
        fetch(`${url}/users4.json`, {
            method: 'POST',
            body: JSON.stringify(user, null, 2),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then(response => response.json())
            .catch(error => console.error("Ha ocurrido un error: ", error));
    }
    else if (numCartas == 20) {
        let user = {
            nombre: playerName,
            tiempo: timefor
        }
        fetch(`${url}/users5.json`, {
            method: 'POST',
            body: JSON.stringify(user, null, 2),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then(response => response.json())
            .catch(error => console.error("Ha ocurrido un error: ", error));
    }
}

function renderTable() {
    let tabla=""
    if (numCartas == 12) {
        tabla="users3.json"
    }
    if (numCartas == 16) {
        tabla="users4.json"
    }
    if (numCartas == 20) {
        tabla="users5.json"
    }
    fetch(`${url}/${tabla}`).then((response) => {
        return response.json();
    }).then((data) => {
        let tbody = document.getElementById('leaderboard-body');
        tbody.innerHTML="";
        let rowHTML = '';
        const sortedData = Object.keys(data).map(key => data[key]).sort((a, b) => a.tiempo - b.tiempo).slice(0, 10);
        sortedData.forEach((index) => {
            rowHTML += `<tr>
                <td>${index.nombre}</td>
                <td>${index.tiempo}</td>
            </tr>`;
        });
        tbody.innerHTML += rowHTML;
        console.log(data);
    }).catch((error) => {
        console.error("Ha ocurrido un error: ", error);
    });
}
//Actualizar tabla de posiciones
//Esto va conectado a la base de datos
async function UpdateScores() {
    try {
        if (rows == 4 && columns == 3) {
            const response = await fetch(`${url}/users3.json`);
            const usuarios = await response.json();
            renderTable(usuarios);
        }
        else if (rows == 4 && columns == 4) {
            const response = await fetch(`${url}/users4.json`);
            const usuarios = await response.json();
            renderTable(usuarios);
        }
        else if (rows == 4 && columns == 5) {
            const response = await fetch(`${url}/users5.json`);
            const usuarios = await response.json();
            renderTable(usuarios);
        }
    } catch (error) {
        console.error("Ha ocurrido un error: ", error);
    }
}
// Eventos
botonesCuadricula.forEach((boton) => {
    boton.addEventListener('click', () => {
        generarCuadricula(parseInt(boton.value));
    });
});

// LLamar a la funcion principal
generarCuadricula(12);

// Variables y arreglos globales
let botonesCuadricula = document.querySelectorAll('.modos');
let selecciones = [];
let puntaje = 0;
let numCartas = 0;

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
            alert("Felicidades, has encontrado todos los pares");
        }
    }, 800);
}
/*
const paresEncontrados = () => {
    if (contador === selecciones.length / 2) {
        alert("Felicidades, has encontrado todos los pares");
        console.log("Felicidades, has encontrado todos los pares.");
    }
}
*/
// Eventos
botonesCuadricula.forEach((boton) => {
    boton.addEventListener('click', () => {
        generarCuadricula(parseInt(boton.value));
    });
});

// LLamar a la funcion principal
generarCuadricula(12);
let selecciones = [];
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

/*  aquí se buscan lo elementos que coinciden en la clase "modos" y en cada uno de ellos se toma el valor 
    con la función this.value y ese valor lo pasa a la función que genera la cuadricula */
document.addEventListener('click', function() {
    const botones = document.querySelectorAll('.modos');
    botones.forEach((boton) => {
        boton.addEventListener('click', function() {
            const valor = parseInt(this.value);
            generarCuadricula(valor);
        });
    });
});

const generarCuadricula = (numCartas) => {
    let container = document.getElementById('container');
    let cartas = [];
    let copiaImg = imagenes.slice();
    selecciones = [];
    for( let numCarta = 0; numCarta < numCartas; numCarta++ ){ 
        cartas.push(`
            <div class="div-carta" onclick="seleccionarCarta(${numCarta})" >
                <div id="carta_${numCarta}" class="carta">
                    <div id="trasera_${numCarta}" class="cara trasera">
                        <img src="assets/img/${copiaImgImg[0]}" alt="">
                    </div>
                    <div class="cara frontal">
                        <i class="fa-solid fa-question"></i>
                    </div>
                </div>
            </div>
        `);
        if( numCarta%2 === 1 ) {
            copiaImgImg.splice(0,1);
        }
    }
    cartas.sort(() => Math.random() - 0.5);
    container.innerHTML = cartas.join("");
}

const seleccionarCarta = (numCarta) => {
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
    setTimeout(() => {
        let cartaUno = document.getElementById(`carta_${selecciones[0]}`);
        let cartaDos = document.getElementById(`carta_${selecciones[1]}`);
        let traseraUno = document.getElementById(`trasera_${selecciones[0]}`);
        let traseraDos = document.getElementById(`trasera_${selecciones[1]}`);

        if( traseraUno.innerHTML != traseraDos.innerHTML ) {
            cartaUno.style.transform = "rotateY(0deg)";
            cartaDos.style.transform = "rotateY(0deg)";
        } else {
            traseraUno.style.opacity = "70%";
            traseraDos.style.opacity = "70%";
        }
    }, 800);
}

// LLamar a la funcion principal
generarCuadricula(12);

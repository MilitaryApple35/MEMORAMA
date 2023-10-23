
let containerCartas = document.getElementById('container');

const crearDivCartas = () => {

    for( let i = 0; i < 12; i++ ) {
        const divCarta = document.createElement('div');
        divCarta.classList.add('div-carta');

        containerCartas.appendChild(divCarta);
    }
}
crearDivCartas();

const crearMazo = () => {

    let mazo = [];
    for(let i = 0; i < 2; i++) {
    
        for(let j = 0; j < 6; j++) {
    
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/img/image_${j + 1}.jpg`;
            imgCarta.classList.add('carta');

            mazo.push( imgCarta );
        }
    }
    return mazo;
}

const revolverCartas = (array) => {
    const compareRandom = () => Math.random() - 0.5;
    array.sort(compareRandom);
}

const agregarCartasDiv = () => {

    let divCartas = document.querySelectorAll('.div-carta');
    revolverCartas(mazo);

    for( let i = 0; i < 12; i++ ) {
        divCartas[i].append( mazo[i] );
    }
}

let mazo = crearMazo();
agregarCartasDiv();
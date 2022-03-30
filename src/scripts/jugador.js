
"use strict";
import { disparoMaquina } from "./ordenador.js"
import { acabarPartida } from "./acabarPartida.js";
var adversario = document.querySelector(".ordenador");
var mensaje = document.getElementsByClassName("resultado");
const posicionTablero = (posicion) => {
   

    let fila = 1;
    let columna = 1;
    if (posicion !== 0) {

        fila = Math.floor(posicion / 10) + 1;
        columna = (posicion % 10) + 1;
    }

    return `En la fila: ${fila} y columna: ${columna}.`;
}
const isSunk = (tipo) => {
    let longitud = 0;
    if (tipo === "carrier" || tipo === "buque") longitud = 4;
    else if (tipo === "submarine") longitud = 3;
    else if (tipo === "destructor") longitud = 2;
    let vecesgolpeado = document.querySelectorAll(`.ordenador .${tipo}.golpeado`);


    if (vecesgolpeado.length === longitud) {
        vecesgolpeado.forEach((celda) => {
            celda.classList.add("hundido");
        });
        let hundido = document.querySelectorAll(`.ordenador .golpeado`);
        mensaje[0].innerHTML = `Jugador:<p>Has hundido al ${tipo} enemigo`;
        if (hundido.length === 13) {
            mensaje[0].innerHTML = `Jugador:<p>Has hundido al ${tipo} era el último barco del enemigo has ganado.</p>`;
            mensaje[0].classList.add("textoGanador");
            acabarPartida("jugador");
        }

    } else {
        mensaje[0].innerHTML = "Jugador:<p>Has acertado .</p>";
    }

}
const anyadirDisparo = (disparo, celda,index) => {

    if (celda.classList.contains("fallado") || celda.classList.contains("golpeado") || celda.classList.contains("fallo") || celda.classList.contains("acierto")) {
        mensaje.innerHTML = "Jugador:<p>Tienes que disparar en una casilla que no este marcada.</p>";
        return;
    }
    else {

        if (disparo) {

            celda.classList.add("golpeado");
            celda.innerHTML = '<p class="acierto"></p>';
            isSunk(celda.classList[2]);

        } else {
            celda.classList.add("fallado");
            
            let posicionEntendible = posicionTablero(index);
            mensaje[0].innerHTML = `Agua:<p> Has fallado.${posicionEntendible}<p>`;
            celda.innerHTML = '<p class="fallo"> </p>';

        }
    }
    adversario.classList.add("turnoContrario");
    const myTimeout = setTimeout(() => {
        disparoMaquina(true, false);
    }, 700);
    // disparoMaquina(true,false);
}
export const disparoJugador = (juegoEmpezado, turno) => {
    if (!turno || !juegoEmpezado) return;
    const celdas = document.querySelectorAll(".ordenador .celda");
    celdas.forEach((celda,index) => {
        console.log(index);

        celda.addEventListener("click", (event) => {
          
            if (event.target.classList.contains("ocupada")) anyadirDisparo(true, event.target,index);
            else anyadirDisparo(false, event.target,index);


        }, false);
        
    });


}
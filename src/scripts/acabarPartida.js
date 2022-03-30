"use strict";

export const acabarPartida = (ganador) => {

    let cabecera = document.getElementsByClassName("cabecera")
    let jugador = document.querySelector(".jugador");
    let ordenador = document.querySelector(".ordenador");
    if (ganador === "jugador") {
        jugador.classList.add("ganador");
        cabecera[0].classList.add("ganador");
    }

    else {
        var celdas = document.querySelectorAll(".ordenador .celda");
        celdas.forEach((celda)=>{
        if(celda.classList.contains("ocupada")) celda.classList.add("hundido");
        });
        ordenador.classList.add("ganador");
        cabecera[1].classList.add("ganador");
    }
    ordenador.classList.add("juegoAcabado");
    jugador.classList.add("juegoAcabado");
}
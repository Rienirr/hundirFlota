"use strict";
import { disparoJugador } from "./jugador.js";
import { acabarPartida } from "./acabarPartida.js";
var mensaje = document.getElementsByClassName("turno");
var adversario = document.querySelector(".ordenador");
var fallosseguidos = 0;
var fallosDespuesGolpe=0;
var lastShotInTarget = false;
var axis = "";
var array = [];
array[0] = [];
array[1] = [];
console.log(array[1].length);
const posicionTablero = (posicion) => {
    let fila = 1;
    let columna = 1;
    if (posicion !== 0) {

        fila = Math.floor(posicion / 10) + 1;
        columna = (posicion % 10) + 1;
    }

    return `En la fila: ${fila} y columna: ${columna}.`;
}
const isSunk = (tipo, posicion) => {
    lastShotInTarget = true;
    let longitud = 0;
    if (tipo === "carrier" || tipo === "buque") longitud = 4;
    else if (tipo === "submarine") longitud = 3;
    else if (tipo === "destructor") longitud = 2;
    let vecesgolpeado = document.querySelectorAll(`.jugador .${tipo}.golpeado`);
    if (vecesgolpeado.length === longitud) {
        vecesgolpeado.forEach((celda) => {
            celda.classList.add("hundido");
        });
        array[1] = [];//El array vuelve a 0 ya que hemos hundido el objetivo.
        array[0] = [];//El array vuelve a 0 ya que hemos hundido el objetivo.
        lastShotInTarget = false;//y ponemos para que siga disparando automático.
        axis = "";

        let hundido = document.querySelectorAll(`.jugador .golpeado`);
        mensaje[0].innerHTML = `La IA:<p> Ha hundido a tu ${tipo}.</p>`;
        if (hundido.length === 13) {
            mensaje[0].innerHTML = `La IA:<p> Ha  ganado,al hundir el ${tipo} que era el último barco.</p> `;
            mensaje[0].classList.add("textoGanador");
            acabarPartida("ordenador");
        }

    } else {
        mensaje[0].innerHTML = "La IA:<p>Ha  acertado.</p>";

        array[0].push(posicion);

        if (array[0].length === 2 && (array[0][0] + 1 === array[0][1] || array[0][0] - 1 === array[0][1])) axis = "x";//Si en el segundo golpe no es una unidad superior o inferior significa que el barco está en el eje y
        else if (array[0].length === 2) axis = "y";



    }

}
const anyadirDisparo = (celdas) => {
    var disparoIA = 0;
    /*Si es el primer golpe no sabemos dirección golpea en x+1 si falla en x-1 si ambas fallan sabemos que es dirección "y" y probamos x+10 o x-10 */
    if (lastShotInTarget) {
        console.log(axis);
        if (axis === "") {
            if ((array[0][0] + 1) % 10 !== 0 && !array[1].includes(array[0][0] + 1)) {
                disparoIA = array[0][0] + 1;
            } else if ((array[0][0] - 1) % 10 !== 9 && !array[1].includes(array[0][0] - 1)) {
                disparoIA = array[0][0] - 1;

            } else if ((array[0][0] - 10) > 0 && !array[1].includes(array[0][0] - 10)) {
                disparoIA = array[0][0] - 10;
            }
            else {
                disparoIA = array[0][0] + 10;
            }
        } else if (axis === "x") {
            var aciertos = array[0].length - 1;

            if ((array[0][aciertos] + 1) % 10 !== 0 && !array[1].includes(array[0][aciertos] + 1)) {
                disparoIA = array[0][aciertos] + 1;
            } else if ((array[0][aciertos] - 1) % 10 !== 9 && !array[1].includes(array[0][aciertos] - 1)) {
                disparoIA = array[0][aciertos] - 1;
            } else if ((array[0][0] - 1) % 9 !== 0 && !array[1].includes(array[0][0] - 1)) {
                disparoIA = array[0][0] - 1;
            } else if ((array[0][0] + 1) % 10 !== 0 && !array[1].includes(array[0][0] + 1)) {
                disparoIA = array[0][0] + 1;
            }
            else if ((array[0][0] - 2) % 9 !== 0 && !array[1].includes(array[0][0] - 2)) {
                disparoIA = array[0][0] - 2;
            } else if ((array[0][0] + 2) % 10 !== 0 && !array[1].includes(array[0][0] + 2)) {
                disparoIA = array[0][0] + 2;
            }
            else if ((array[0][0] - 3) % 9 !== 0 && !array[1].includes(array[0][0] - 3)) {
                disparoIA = array[0][0] - 3;
            } else if ((array[0][0] + 2) % 10 !== 0 && !array[1].includes(array[0][0] + 3)) {
                disparoIA = array[0][0] + 3;
            }
            else {
                axis = "y";
            }



        } else {
            var aciertos = array[0].length - 1;

            if ((array[0][aciertos] - 10) > 0 && !array[1].includes(array[0][aciertos] - 10)) {
                disparoIA = array[0][aciertos] - 10;
            } else if ((array[0][aciertos] + 10) < 100 && !array[1].includes(array[0][aciertos] + 10)) {
                disparoIA = array[0][aciertos] + 10;
            } else if ((array[0][0] - 10) > 0 && !array[1].includes(array[0][0] - 10)) {
                disparoIA = array[0][0] - 10;
            } else if ((array[0][0] + 10) < 100 && !array[1].includes(array[0][0] + 10)) {
                disparoIA = array[0][0] + 10;
            }else if ((array[0][0] - 20) > 0 && !array[1].includes(array[0][0] - 20)) {
                disparoIA = array[0][0] - 20;
            } else if ((array[0][0] + 10) < 100 && !array[1].includes(array[0][0] + 20)) {
                disparoIA = array[0][0] + 20;
            }else if ((array[0][0] - 30) > 0 && !array[1].includes(array[0][0] - 30)) {
                disparoIA = array[0][0] - 30;
            } else if ((array[0][0] + 30) < 100 && !array[1].includes(array[0][0] + 30)) {
                disparoIA = array[0][0] + 30;
            }

             else {
                axis = "x";
            }

        }

        if (celdas[disparoIA].classList.contains("fallado") || celdas[disparoIA].classList.contains("golpeado") || celdas[disparoIA].classList.contains("fallo") || celdas[disparoIA].classList.contains("acierto")) {
            array[1].push(disparoIA);
            fallosDespuesGolpe++;
            if(fallosDespuesGolpe>19){
            fallosDespuesGolpe=0;
            array[1] = [];//El array vuelve a 0 ya que hemos hundido el objetivo.
        array[0] = [];//El array vuelve a 0 ya que hemos hundido el objetivo.
        lastShotInTarget = false;//y ponemos para que siga disparando automático.
        axis = "";
            }
            anyadirDisparo(celdas);
            return;
        } else {


            if (celdas[disparoIA].classList.contains("ocupada")) {

                celdas[disparoIA].classList.add("golpeado");
                celdas[disparoIA].innerHTML = '<p class="acierto"></p>';
                isSunk(celdas[disparoIA].classList[2], disparoIA);

            } else {
                array[1].push(disparoIA);
                celdas[disparoIA].classList.add("fallado");
                let posicionEntendible = posicionTablero(disparoIA);
                mensaje[0].innerHTML = `¡Agua!:<p>La IA  Ha  fallado.${posicionEntendible}</p>`;
                celdas[disparoIA].innerHTML = '<p class="fallo"> </p>';

            }

            adversario.classList.remove("turnoContrario");
            disparoJugador(true, true);
        }
    }
    else {
        let disparoRandom = Math.round(Math.random() * 99);

        if (celdas[disparoRandom].classList.contains("fallado") || celdas[disparoRandom].classList.contains("golpeado") || celdas[disparoRandom].classList.contains("fallo") || celdas[disparoRandom].classList.contains("acierto")) {
            anyadirDisparo(celdas);
            return;
        }
        else {

            if (celdas[disparoRandom].classList.contains("ocupada")) {

                celdas[disparoRandom].classList.add("golpeado");
                celdas[disparoRandom].innerHTML = '<p class="acierto"></p>';
                isSunk(celdas[disparoRandom].classList[2], disparoRandom);

            } else {
                celdas[disparoRandom].classList.add("fallado");
                fallosseguidos++;
                if (fallosseguidos > 4) {
                    mensaje[0].innerHTML = "La IA:<p>  Voy a subir el nivel y verás.</p>";
                    fallosseguidos = 0;
                } else {
                    let posicionEntendible = posicionTablero(disparoRandom);
                    mensaje[0].innerHTML = `¡Agua!:<p> La IA Ha  fallado.${posicionEntendible} </p>`;
                }

                celdas[disparoRandom].innerHTML = '<p class="fallo"> </p>';

            }
        }
        adversario.classList.remove("turnoContrario");
        disparoJugador(true, true);
    }
}


export const disparoMaquina = (juegoEmpezado, turno,) => {

    if (turno || !juegoEmpezado) return;

    const celdas = document.querySelectorAll(".jugador .celda");
    anyadirDisparo(celdas);



}
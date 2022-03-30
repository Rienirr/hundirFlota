import {disparoJugador} from "./jugador.js";
"use strict";


export const iniciarJuego=(juegoEmpezado, turnoJugador)=>{
    let empezar = document.getElementsByTagName("button");
    var mensaje = document.getElementsByClassName("turno");
    let reiniciar= document.getElementsByClassName("reload");
    reiniciar[0].addEventListener("click",(event)=>{
location.reload();
    },false);
   
    
   
      empezar[0].addEventListener("click",()=>{
        let ocupado = document.querySelectorAll(`.jugador .ocupada`);
        console.log(ocupado);
        if (ocupado.length === 13) {
        juegoEmpezado= true;
        mensaje[0].innerHTML="El juego ha comenzado es tu turno de disparar."
        empezar[0].classList.add("hidden");
        
        disparoJugador(juegoEmpezado,turnoJugador);
      }else{
        mensaje[0].innerHTML="No hagas trampas pon los barcos en el tablero."
      }
      });


   
    }
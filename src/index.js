import  {colocarBarcosUsuario}  from "./scripts/colocacion_Inicial_Usuario.js";
import {colocarBarcosMaquina} from "./scripts/colocacion_Inicial_Maquina.js";
import {iniciarJuego} from "./scripts/inicio.js";

"use strict";

window.onload = () => {
    var  juegoEmpezado=false;
    var turnoJugador=true;
    iniciarJuego(juegoEmpezado,turnoJugador);
    colocarBarcosUsuario();
    colocarBarcosMaquina();
 
    
}
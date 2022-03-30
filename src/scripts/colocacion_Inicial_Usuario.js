"use strict";
export const colocarBarcosUsuario = () => {

    let barcoArrastrado = "";
    let insertado = false;
    const celdas = document.querySelectorAll(".jugador .celda");
    const endDragOrTouch=(event)=>{
        event.preventDefault();
        let arrayCeldas = Array.from(celdas);
        let filasABorrar = arrayCeldas.filter((celdaConBarco) => {
            return celdaConBarco.classList.contains("sinespacio");
        });
        filasABorrar.map((v) => {
            v.classList.remove("sinespacio");
        })
        let barco = arrayCeldas.filter((celdaConBarco) => {
            return celdaConBarco.classList.contains("viable");
        });
        let contador = 1;
        barco.map((v, i, a) => {
    
            mostrarBarcoEnFondo(v, contador);

            contador++;
        }, false);
        if (insertado) {
           
            barcoArrastrado.classList.add("hidden");
            let barcosQueFaltan = document.getElementsByTagName("img");
            barcosQueFaltan = Array.from(barcosQueFaltan);
            barcosQueFaltan = barcosQueFaltan.filter((imagenes) => {
                return imagenes.classList.contains("hidden");
            });
            var mensaje = document.getElementsByClassName("turno");
            var resultado= document.getElementsByClassName("resultado")
            let empezar = document.getElementsByTagName("button");
            mensaje[0].innerHTML = `Te faltan por colocar ${4 - barcosQueFaltan.length} barcos`;
            if (barcosQueFaltan.length === 4) {
                mensaje[0].innerHTML = " Pulsa el botón EMPEZAR  o reinicia el juego con el botón arriba a la izquierda para reorganizar los barcos";
                resultado[0].innerHTML = " Pulsa el botón EMPEZAR  o reinicia el juego con el botón arriba a la izquierda para reorganizar los barcos";
                empezar[0].classList.remove("hidden");
            }
            barcoArrastrado = "";
            insertado = false;
        }
    };
    const mostrarSombraBarco = (barco, posicion) => {
        let longitud = 2;
        let celdasOcupada = false;
        let axis = barco.classList.contains("y") ? "y" : "x";
        if (barco.classList.contains("lg-4")) longitud = 4;
        else if (barco.classList.contains("lg-3")) longitud = 3;
        else if (barco.classList.contains("lg-2")) longitud = 2;

       

        if (axis === "x") {

            if ((posicion % 10) + longitud > 10) celdas[posicion].classList.add("sinespacio");
            else {
                for (let j = 0; j < longitud; j++) {
                    if (celdas[posicion + j].classList.contains("ocupada")) celdasOcupada = true;
                }

                for (let i = 0; i < longitud; i++) {
                    if (!celdasOcupada) celdas[posicion + i].classList.add("viable");
                    else celdas[posicion + i].classList.add("sinespacio");
                }
            }
        }
        else {
            if ((posicion) + ((longitud - 1) * 10) > 100 || celdasOcupada) celdas[posicion].classList.add("sinespacio");
            else {
                for (let j = 0; j < longitud; j++) {
                    if (celdas[posicion + (j * 10)].classList.contains("ocupada")) celdasOcupada = true;
                }


                for (let i = 0; i < longitud; i++) {
                    if (!celdasOcupada) celdas[posicion + (i * 10)].classList.add("viable");
                    else celdas[posicion + (i * 10)].classList.add("sinespacio");
                }

            }

        }
    };
    const mostrarBarcoEnFondo = (barco, contador) => {
        let clase = "";
        let axis = barcoArrastrado.classList.contains("y") ? "y" : "x";
        if (barcoArrastrado.classList.contains("battle")) clase = "buque";
        else if (barcoArrastrado.classList.contains("lg-4")) clase = "carrier";
        else if (barcoArrastrado.classList.contains("lg-3")) clase = "submarine";
        else if (barcoArrastrado.classList.contains("lg-2")) clase = "destructor";
        barco.classList.remove("viable");
        barco.classList.add("ocupada");
        barco.classList.add(`${clase}`);
        barco.classList.add(`${clase}${contador}`);
        if (axis === "y") barco.classList.add(`y`);

        insertado = true;
    }
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].addEventListener("dragover", (event) => {
            if (barcoArrastrado === "") return;

            mostrarSombraBarco(barcoArrastrado, i);

        }, false);
        celdas[i].addEventListener("dragleave", (event) => {
            for (let j = 0; j < 4; j++) {
                if (i + (j) < 100) {
                    celdas[i + j].classList.remove("viable");
                    celdas[i + j].classList.remove("sinespacio");
                }

                if (i + (j * 10) < 100) {
                    celdas[i + (j * 10)].classList.remove("viable");
                    celdas[i + (j * 10)].classList.remove("sinespacio")
                }

            }
        }, false);
    }
    const img = document.getElementsByTagName("img");
    //console.log(img);
    for (let i = 0; i < img.length; i++) {
        img[i].addEventListener("click", (event) => {
            img[i].classList.toggle("y");
        }, false);
    }

    document.addEventListener("drag", (event) => {
        barcoArrastrado = (event.target);

    }, false);
    document.addEventListener("touchstart", (event) => {
        barcoArrastrado = (event.target);

    }, false);
    document.addEventListener("dragover", (event) => {
        event.preventDefault();
    }, false);
    document.addEventListener("touchmove", (event) => {
        event.preventDefault();
    }, false);
    
    document.addEventListener("touchend", (event) => {
        endDragOrTouch(event);
    }, false);
    document.addEventListener("drop", (event) => {
     
    endDragOrTouch(event);
}, false);
}
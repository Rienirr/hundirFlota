"use strict";
export const colocarBarcosMaquina = () => {
    const celdas = document.querySelectorAll(".ordenador .celda");
    const casillaValida = (longitud) => {
        
        let posicion = Math.round(Math.random() * 98);
        
        let axis = Math.round(Math.random()) === 0 ? "x" : "y";
        
        let celdasOcupada = false;
        let asignacionValida = true;
        if (axis === "x") {

            if ((posicion % 10) + longitud > 10) asignacionValida = false;
            else {
                for (let j = 0; j < longitud; j++) {
                    if (celdas[posicion + j].classList.contains("ocupada")) {
                        celdasOcupada = true;
                        asignacionValida = false;
                    }
                }
                for (let i = 0; i < longitud; i++) {
                    if (!celdasOcupada) celdas[posicion + i].classList.add("viable");

                }
            }
        }
        else {
            if ((posicion) + ((longitud - 1) * 10) >= 99 || celdasOcupada) asignacionValida = false;

            else {
                for (let j = 0; j < longitud; j++) {
                    if (celdas[posicion + (j * 10)].classList.contains("ocupada")) celdasOcupada = true;
                }
                for (let i = 0; i < longitud; i++) {
                    if (!celdasOcupada) celdas[posicion + (i * 10)].classList.add("viable");

                }

            }

        }
        if (!asignacionValida) casillaValida(longitud);

    }
    const colocarBarcosAleatorios = (longitud,tipo) => {
        casillaValida(longitud);
        let casillasBarco=document.getElementsByClassName("viable");
       if(casillasBarco.length===0){
        casillaValida(longitud)  
       
       }else{
              // console.log(casillasBarco);
        casillasBarco= Array.from(casillasBarco);
        casillasBarco.map((v)=>{
            v.classList.remove("viable");
            v.classList.add("ocupada");
            v.classList.add(`${tipo}`);
        });
        return true;
       }
       
     
    
    }
  
  colocarBarcosAleatorios(4, "buque");
     colocarBarcosAleatorios(4, "carrier");
     colocarBarcosAleatorios(3, "submarine");
     colocarBarcosAleatorios(2, "destructor");
    let celdasViables= Array.from(celdas);
    celdasViables= celdasViables.filter((celda)=>{
    return celda.classList.contains("ocupada");
    });
if(celdasViables.length!==13){
celdas.forEach((celda)=>{
celda.classList.remove("ocupada");
celda.classList.remove("viable");
});
colocarBarcosAleatorios(4, "buque");
colocarBarcosAleatorios(4, "carrier");
colocarBarcosAleatorios(3, "submarine");
colocarBarcosAleatorios(2, "destructor");

}
   
}

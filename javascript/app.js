window.onload = () => {
    InicializarDatos();
}

/* Slider */

function InicializarDatos() {
    funcionSlider();

}

function funcionSlider() {
    /* Primero se verifica si existe algún slider en el código */
    if (document.getElementsByClassName("slider").length > 0) {
        /* Se obtiene cada elemento "slider y se guarda en un arreglo */
        var sliders = document.getElementsByClassName("slides");
        /* Se crea un arreglo que guardará un arreglo con los slides se encuentran en cada slider */
        var cantSlides = [];

        /* Guardará los contadores para cada slider */
        var contadores = [];

        /* Un ciclo por cada slider */
        for (var i = 0; i < sliders.length; i++) {
            /* Se obtiene cada bloque de slides de cada slider y se guardan en una variable */
            var cadaSlide = sliders[i].getElementsByClassName("slide");

            /* la variable se deposita en un arreglo, creando una matriz */
            cantSlides.push(cadaSlide.length);

            /* Se indica el width de cada slider */
            sliders[i].style.width = (cadaSlide.length * 100) + '%';

            /* Se inicializa los contadores en 0 */
            contadores.push(0);
        }

        var recorrerSlides = () => {
            for (var i = 0; i < sliders.length; i++) {
                sliders[i].style.marginLeft = '-' + (contadores[i] * 100) + '%';
                contadores[i]++;
                if (contadores[i] === cantSlides[i]) contadores[i] = 0;
            }
        }
        recorrerSlides();
        setInterval(recorrerSlides, 5000);
    }
}
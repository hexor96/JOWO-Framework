class Tab {
    private actual: number;
    private tituloActual: any;
    private contenidos: any;
    constructor(nombre: string) {
        var tabs = document.getElementById(nombre);
        var titulos = tabs.getElementsByClassName("titulo");
        this.contenidos = tabs.getElementsByClassName("contenido");
        this.actual = 0;
        this.iniciarTabs(titulos);
    }
    iniciarTabs = (titulos: any) => {
        for (var i = 0; i < this.contenidos.length; i++) {
            titulos[i].setAttribute("data-titulo", i + '');

            titulos[i].addEventListener("click", (evento) => {
                if (parseInt(evento.target.getAttribute("data-titulo")) !== this.actual) {
                    /* Titulos */
                    this.tituloActual.classList.toggle("activo");
                    this.tituloActual = evento.target;
                    this.tituloActual.classList.toggle("activo");
                    /* Contenido */
                    this.contenidos[this.actual].style.display = "none";
                    this.actual = parseInt(evento.target.getAttribute("data-titulo"));
                    this.contenidos[this.actual] = this.contenidos[this.actual];
                    this.contenidos[this.actual].style.display = "block";
                }
            });
            this.contenidos[i].style.display = "none";
        }
        this.tituloActual = titulos[0];
        this.tituloActual.classList.toggle("activo");
        this.contenidos[this.actual].style.display = "block";
    }
}

class Slider {
    private slider: any;
    private slides: any;
    private duracion: number;
    private cantSlides: any;
    private actualSlide: number;
    private botones: any;

    constructor(nombre: string, parametros: any) {
        this.slider = document.getElementById(nombre).getElementsByClassName("sliderWrapper")[0];
        this.slides = this.slider.getElementsByClassName("sliderItem");
        this.cantSlides = this.slides.length;
        this.actualSlide = 0;
        this.duracion = parametros.duracion || 3000;
        if (parametros.paginacion) this.agregarBotones(parametros.paginacion);
        this.iniciarMovimiento();
    }
    inicializarDatos = () => {
        for (let i = 0; i < this.cantSlides; i++) {
            this.slides[i].style.display = "none";
        }
        this.slides[this.actualSlide].style.display = "block";
    }
    iniciarMovimiento = () => {
        this.inicializarDatos();
        setInterval(() => { this.movimiento(NaN); }, this.duracion);
    }
    movimiento = (numero: number) => {
        this.toggleButton();
        this.slides[this.actualSlide].style.display = "none";
        this.actualSlide++;
        if (this.actualSlide === this.cantSlides) this.actualSlide = 0;
        this.actualSlide = numero || this.actualSlide;
        this.toggleButton();
        this.slides[this.actualSlide].style.display = "block";
        this.slides[this.actualSlide].style.animation = 'aparecer 1s forwards';
    }
    toggleButton = () => {
        if (this.botones) this.botones[this.actualSlide].classList.toggle("activo");
    }
    agregarBotones = (parametros: any) => {
        this.botones = [];
        var contenedor = document.createElement("div");
        contenedor.classList.add("sliderButtons");
        for (var i = 0; i < this.cantSlides; i++) {
            var boton = document.createElement("button");
            boton.innerText = (i + 1) + '';
            if (parametros.clickeable) {
                boton.setAttribute("data-slide", i + '');
                boton.addEventListener("click", (evento: any) => {
                    var numero = parseInt(evento.target.getAttribute("data-slide"));
                    if (this.actualSlide !== numero) {
                        this.movimiento(numero);
                    }
                });
            }
            this.botones.push(boton);
            if (this.actualSlide === i) {
                this.botones[i].classList.toggle("activo");
            }
            contenedor.appendChild(boton);
        }
        this.slider.parentElement.appendChild(contenedor);
    }
}
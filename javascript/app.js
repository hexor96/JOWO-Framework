var alv;

window.onload = function () {
    alv = new Slider('miSlider', {
        botones: true,
        duracion: 5000
    });
};

var Slider = /** @class */ (function () {
    function Slider(nombre, parametros) {
        var _this = this;
        this.inicializarDatos = function () {
            for (var i = 0; i < _this.cantSlides; i++) {
                _this.slides[i].style.display = "none";
            }
            _this.slides[_this.actualSlide].style.display = "block";
        };
        this.iniciarMovimiento = function () {
            _this.inicializarDatos();
            setInterval(function () { _this.movimiento(); }, _this.duracion);
        };
        this.movimiento = function (numero) {
            if (numero === void 0) { numero = NaN; }
            _this.slides[_this.actualSlide].style.display = "none";
            _this.actualSlide++;
            if (_this.actualSlide === _this.cantSlides)
                _this.actualSlide = 0;
            _this.actualSlide = numero || _this.actualSlide;
            _this.slides[_this.actualSlide].style.display = "block";
            _this.slides[_this.actualSlide].style.animation = 'aparecer 1s forwards';
        };
        this.agregarBotones = function () {
            var contenedor = document.createElement("div");
            contenedor.classList.add("sliderButtons");
            for (var i = 0; i < _this.cantSlides; i++) {
                var boton = document.createElement("button");
                boton.setAttribute("onclick", "abrirSlide(" + (i) + ")");
                contenedor.appendChild(boton);
            }
            _this.slider.parentElement.appendChild(contenedor);
        };
        this.slider = document.getElementById(nombre).getElementsByClassName("sliderWrapper")[0];
        this.slides = this.slider.getElementsByClassName("sliderItem");
        this.cantSlides = this.slides.length;
        this.actualSlide = 0;
        this.duracion = parametros.duracion || 3000;
        if (parametros.botones)
            this.agregarBotones();
        this.iniciarMovimiento();
    }
    return Slider;
}());
var abrirSlide = function (numero) {
    alv.movimiento(numero);
};

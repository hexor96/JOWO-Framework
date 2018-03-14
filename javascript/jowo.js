var Tab = /** @class */ (function () {
    function Tab(nombre) {
        var _this = this;
        this.iniciarTabs = function (titulos) {
            for (var i = 0; i < _this.contenidos.length; i++) {
                titulos[i].setAttribute("data-titulo", i + '');
                titulos[i].addEventListener("click", function (evento) {
                    if (parseInt(evento.target.getAttribute("data-titulo")) !== _this.actual) {
                        /* Titulos */
                        _this.tituloActual.classList.toggle("activo");
                        _this.tituloActual = evento.target;
                        _this.tituloActual.classList.toggle("activo");
                        /* Contenido */
                        _this.contenidos[_this.actual].style.display = "none";
                        _this.actual = parseInt(evento.target.getAttribute("data-titulo"));
                        _this.contenidos[_this.actual] = _this.contenidos[_this.actual];
                        _this.contenidos[_this.actual].style.display = "block";
                    }
                });
                _this.contenidos[i].style.display = "none";
            }
            _this.tituloActual = titulos[0];
            _this.tituloActual.classList.toggle("activo");
            _this.contenidos[_this.actual].style.display = "block";
        };
        var tabs = document.getElementById(nombre);
        var titulos = tabs.getElementsByClassName("titulo");
        this.contenidos = tabs.getElementsByClassName("contenido");
        this.actual = 0;
        this.iniciarTabs(titulos);
    }
    return Tab;
}());
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
            setInterval(function () { _this.movimiento(NaN); }, _this.duracion);
        };
        this.movimiento = function (numero) {
            _this.toggleButton();
            _this.slides[_this.actualSlide].style.display = "none";
            _this.actualSlide++;
            if (_this.actualSlide === _this.cantSlides)
                _this.actualSlide = 0;
            _this.actualSlide = numero || _this.actualSlide;
            _this.toggleButton();
            _this.slides[_this.actualSlide].style.display = "block";
            _this.slides[_this.actualSlide].style.animation = 'aparecer 1s forwards';
        };
        this.toggleButton = function () {
            if (_this.botones)
                _this.botones[_this.actualSlide].classList.toggle("activo");
        };
        this.agregarBotones = function (parametros) {
            _this.botones = [];
            var contenedor = document.createElement("div");
            contenedor.classList.add("sliderButtons");
            for (var i = 0; i < _this.cantSlides; i++) {
                var boton = document.createElement("button");
                boton.innerText = (i + 1) + '';
                if (parametros.clickeable) {
                    boton.setAttribute("data-slide", i + '');
                    boton.addEventListener("click", function (evento) {
                        var numero = parseInt(evento.target.getAttribute("data-slide"));
                        if (_this.actualSlide !== numero) {
                            _this.movimiento(numero);
                        }
                    });
                }
                _this.botones.push(boton);
                if (_this.actualSlide === i) {
                    _this.botones[i].classList.toggle("activo");
                }
                contenedor.appendChild(boton);
            }
            _this.slider.parentElement.appendChild(contenedor);
        };
        this.slider = document.getElementById(nombre).getElementsByClassName("sliderWrapper")[0];
        this.slides = this.slider.getElementsByClassName("sliderItem");
        this.cantSlides = this.slides.length;
        this.actualSlide = 0;
        this.duracion = parametros.duracion || 3000;
        if (parametros.paginacion)
            this.agregarBotones(parametros.paginacion);
        this.iniciarMovimiento();
    }
    return Slider;
}());

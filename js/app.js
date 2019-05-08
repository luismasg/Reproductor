//aqui recupero una lista de botonoes
var botones = document.getElementsByClassName("btn-reproducir");

//aqui recorri cada elemento de la lista de botones
for (var i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", function(e) {
    play(e);
  });
  //botones[i].onclick=function (){alert("cosa")}
}

//defino la funcion para disparar la accion cuando un click
function play(e) {
  var cards = document.getElementsByClassName("card-body");


  //quito el color a todas las tarjetas
  for (var iterador = 0; iterador < cards.length; iterador++) {
    cards[iterador].classList.remove("seleccionada");
  } // hago trampa  , se le quito la clase sele a todas

  e.target.parentElement.classList.add("seleccionada") // pinto la tarjeta que acabo de tocar

  var cancion = e.target.parentElement.parentElement.dataset.cancion; // extraigo nombre cancion
  var reproductor = new Audio("music/" + cancion + ".mp3");
  reproductor.play();
  //reproductor.volume = 0.08;  // activa estas dos lineas para probar
  //reproductor.playbackRate = 5;

  setInterval(function() {
    //cada 500 milisegundos actualizamos la barra de progresso
    actualizarBarra(reproductor);
  }, 500);

  //aqui cambiamos el texto , pasamos el evento (con el boton para acutalizar los campos)
  cambiarInfo(e.target.parentElement);
}

function actualizarBarra(reproductor) {
  var progresoNumero =
    Math.round((reproductor.currentTime / reproductor.duration) * 100) + "%"; // guardo porcentaje para gutura referencia
  var progressBar = document.getElementsByClassName("progress-bar")[0]; 
  progressBar.style.width = progresoNumero; // Aqui actualizamos el css para bootstrap
  progressBar.innerHTML = progresoNumero; // aqui actualizamos El texto interior que muestra el porcentaje
}

/*
var titulo = e.target.hermano[0].children[0].children[0].innerText => "Blacnk in back"
				//	var titulo = e.target.(papa.hijos[0]).getelementbyClassName(titulo)[0].innerText 
					var autor =e.target.hermano[0].children[0].chyildren[1].innerText= > ACDC   
					var imagen = e.target.hermano[0].children[1].children[0].src;  =>>> la foto   

  
					//var contender  =  getEmeltltbnyID(cosa-ecushandkoakdfhdkisd)
					var titulo= document.getElementById("tituloCancion");
					titulo.innerText= titulo ;

					document.getElementById("tituloArtista").innerText=autor; 
					document.getelemevebhibyId    ("contenedorImagen").children[0].src=imagen




*/

function cancionseleccionada(cancion, elementoCancion) {
  if (ultimaCancion != "") {
    var selector = 'li [data-cancion="' + ultimaCancion + '"]';
    var elementoAnterior = contenedorPlaylist.querySelector(selector);
    elementoAnterior.classList.remove("selecionada");
  }
}
function cambiarInfo(elemento) {
  var contenedor = elemento.getElementsByClassName("contenedor-informacion")[0];
  var elementoCancion = contenedor.children[0].children[0];
  var elementoNArtista = contenedor.children[0].children[1];
  var nombreCancion = elementoCancion.innerHTML;
  var nombreArtista = elementoNArtista.innerHTML;
  var rutaImagen = elementoImagen.src;

  document.getElementsById("tituloCancion").innerHTML = nombreCancion;
  document.getElementsById("tituloartista").innerHTML = nombreArtista;

  elementoImagen = document.createElement("img");
  elementoImagen.classList.add("imagen-actual");
  elementoImagen.src = rutaImagen;

  var contenedorImagen = document.getElementsById("contenedorImagen");
  if (contenedorImagen.children.length > 0) {
    contenedorImagen.children[0].remove();
  }
  contenedorImagen.appchild(elementoImagen);

  console.log(nombreCancion);
  console.log(nombreArtista);
}

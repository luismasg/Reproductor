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
  var cancion = e.target.parentElement.parentElement.dataset.cancion;
  var reproductor = new Audio("music/" + cancion + ".mp3");
  reproductor.play();
  reproductor.volume = 0.08;
  reproductor.playbackRate = 5;

  setInterval(function() {
	  //cada 500 milisegundos actualizamos la barra de progresso
	var progresoNumero=Math.round(reproductor.currentTime / reproductor.duration*100) +"%";
	var progressBar= document.getElementsByClassName("progress-bar")[0];
	progressBar.style.width=progresoNumero;  // Aqui actualizamos el css para bootstrap 	
	progressBar.innerHTML=progresoNumero;  // aqui actualizamos El texto interior que muestra el porcentaje
  }, 500);
}

function cancionseleccionada(cancion, elementoCancion) {
  if (ultimaCancion != "") {
    var selector = 'li [data-cancion="' + ultimaCancion + '"]';
    var elementoAnterior = contenedorPlaylist.querySelector(selector);
    elementoAnterior.classList.remove("selecionada");
  }
}
function cambiarInfo(elemento) {
  var contenedor = elemento.getElementsByClassName("contedor-informacion");
  var elementoNCancion = contenedor.children[0].children[0];
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

function cosa() {
  var temp = new Audio("music/feel.mp3");
  temp.play();
}

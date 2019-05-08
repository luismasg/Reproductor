 //aqui recupero una lista de botonoes
 var botones = document.getElementsByClassName("btn-reproducir");

//aqui recorri cada elemento de la lista de botones
 for (var i = 0; i < botones.length; i++) {
 	botones[i].addEventListener("click", function (e){
 		play(e);
 	})
 	//botones[i].onclick=function (){alert("cosa")}

 }

 //defino la funcion para disparar la accion cuando un click
 function play(e){
 	var cancion = e.target.parentElement.parentElement.dataset.cancion;
 	var temp = new Audio("music/" + cancion + ".mp3");
	temp.play();

 }
	


function cancionseleccionada (cancion, elementoCancion){
	if (ultimaCancion !=""){
		var selector = 'li [data-cancion="'+ultimaCancion+'"]';
		var elementoAnterior = contenedorPlaylist.querySelector(selector);
		elementoAnterior.classList.remove("selecionada");
	}
	

}
function cambiarInfo(elemento){
	var contenedor = elemento.
	getElementsByClassName("contedor-informacion");
	var elementoNCancion = contenedor.children[0].children[0];
	var elementoNArtista = contenedor.children[0].children[1];
	var nombreCancion = elementoCancion.innerHTML;
	var nombreArtista = elementoNArtista,innerHTML;
	var rutaImagen = elementoImagen.src;

	document.getElementsById("tituloCancion").innerHTML= nombreCancion;
	document.getElementsById("tituloartista").innerHTML= nombreArtista;

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

function cosa(){
	var temp= new Audio("music/feel.mp3");
	temp.play();
}
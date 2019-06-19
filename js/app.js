const reproductor = new Audio(); /* we ned a player */
const songsLists = document.querySelector(".songs-list"); /* might as well grab the empty  <ul> right now */
let songs = []; /* this is a let variable because I will fill it with data later */

/**
 * populateCards : Makes asynchronous ajax call to get data
 * pause : Stops playing if the button click is enabled
 * play : stops player and changes track then restarts
 * CreateCard :  builds the htmlfor the song cards
 * attachToDOM : appends the html to the DOM
 * actualizarBarra : updates the progress bar every 500 mils
 * cambiarInfo : updates the data in the center player ui
 * HighlightSelectedCard : Highlights the song that is playing with a green halo
 * disablePauseButtons : Disable all pause buttons except the one needed
 *
 *
 *
 *
 */

//this is for netlify
/* const populateCards = () => {
  return fetch("db.json")
    .then(response => response.json())
    .then(data => {
      songs = data.songs;
      songs.map((song, index) => CreateCard(song, index));
    });
}; */

const populateCards = () => {
  return fetch("http://localhost:3000/songs")
    .then(response => response.json())
    .then(songsData => {
      songs = songsData;
      songs.map((song, index) => CreateCard(song, index));
    });
};

const pause = () => {
  if (event.target.classList.contains("disabled")) return; //** if clicked button contains 'disabled', don't do anything */
  reproductor.pause();
};
const play = (audio, index) => {
  HighlightSelectedCard(document.getElementsByClassName("card"), index); /* first we highlight the card */
  reproductor.src = `music/${audio}`; /* change tracks with a template string */
  reproductor.play(); /*start reproduction */
  cambiarInfo(index); /* we update the central ui with the artist's information and picture */
  disablePauseButtons(document.getElementsByClassName("btn-detener"), index); /* might as well turn off all pause buttuns but this one */
};
const CreateCard = ({ title, artist, image, audio }, index) => {
  /* destructuring */
  /*this entire template string in the argument for the attachtoDOM function */
  attachToDOM(` 
  <div class="card-body">
    <div class="d-flex justify-content-between contenedor-informacion">
      <div>
        <h4>${title}</h4>
        <h5>${artist}</h5>
      </div>
      <div>
        <img src="img/${image}" class="img-album" />
      </div>
    </div>
    <button class="btn-reproducir" onclick="
      play('${audio}',${index})  
    "><i class="fas fa-play"></i></button>
    <button class=" btn-detener disabled" onclick="
    pause()"><i class="fas fa-pause"></i></button>
  </div>
`);
};
//actualizar barra de progreso
const actualizarBarra = () => {
  const progresoNumero = Math.round((reproductor.currentTime / reproductor.duration) * 100) + "%"; // guardo porcentaje para futura referencia
  const progressBar = document.querySelector("#myBar");
  progressBar.style.width = `${progresoNumero}`; // Aqui actualizamos el css para bootstrap
};
const cambiarInfo = index => {
  document.querySelector("#tituloCancion").innerHTML = songs[index].title;
  document.querySelector("#tituloArtista").innerHTML = songs[index].artist;
  document.querySelector(".player-cover-image").src = `img/${songs[index].largeImage}`; /*template strings*/
};
const HighlightSelectedCard = (nodeCollection, index) => {
  for (let i = 0; i < nodeCollection.length; i++) {
    /*manually looping because the node collection is not an array */
    index === i ? nodeCollection[i].classList.add("playing") : nodeCollection[i].classList.remove("playing"); /* adding a class to the card I just clicked on */
  }
};

const disablePauseButtons = (nodeCollection, index) => {
  for (let i = 0; i < nodeCollection.length; i++) {
    /*manually looping because the node collection is not an array */
    index === i ? nodeCollection[i].classList.remove("disabled") : nodeCollection[i].classList.add("disabled");
  }
};
const attachToDOM = html => {
  /* since the function takes only one parameter we don't need parenthesis */
  const card = document.createElement("li"); /*create new element  with the card class*/
  card.classList.add("card");
  card.innerHTML = html; /*fill content of card with the template string above*/
  songsLists.appendChild(card); /*bind the newly created node to the dom*/
};
populateCards(); /*invoke the fetch call after all the other code has finished loading */
setInterval(() => {
  actualizarBarra();
}, 500); /*we update the progress bar every 500 milliseconds*/
reproductor.onended = () => {
  HighlightSelectedCard(document.getElementsByClassName("card"), 900);
  reproductor.currentTime = 0;
};

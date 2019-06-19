const reproductor = new Audio();
const songsLists = document.querySelector(".songs-list");
let songs = [];

const populateCards = () => {
  return fetch("http://localhost:3000/songs")
    .then(response => response.json())
    .then(songsData => {
      songs = songsData;
      songs.map((song, index) => CreateCard(song, index));
    });
};

//this is for netlify
/* const populateCards = () => {
  return fetch("db.json")
    .then(response => response.json())
    .then(data => data.songs.map(song => CreateCard(song,index)));
}; */
const pause = () => {
  if (event.target.classList.contains("disabled")) return;
  reproductor.pause();
};
const play = (audio, index) => {
  HighlightSelectedCard(document.getElementsByClassName("card"), index);
  reproductor.src = `music/${audio}`;
  reproductor.play();
  // document.querySelector(".progress").style.visibility = "visible";
  setInterval(() => {
    //we update the progress bar every 500 milliseconds
    actualizarBarra();
  }, 500);
  cambiarInfo(index);

  disablePauseButtons(document.getElementsByClassName("btn-detener"), index);
};
const CreateCard = ({ title, artist, image, audio }, index) => {
  attachToDom(`  
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
  const progresoNumero =
    Math.round((reproductor.currentTime / reproductor.duration) * 100) + "%"; // guardo porcentaje para futura referencia
  const progressBar = document.querySelector("#myBar");
  progressBar.style.width = `${progresoNumero}`; // Aqui actualizamos el css para bootstrap
};
function cambiarInfo(index) {
  document.querySelector("#tituloCancion").innerHTML = songs[index].title;
  document.querySelector("#tituloArtista").innerHTML = songs[index].artist;
  document.querySelector(".player-cover-image").src = `img/${
    songs[index].largeImage
  }`;
}
const HighlightSelectedCard = (nodeCollection, index) => {
  for (let i = 0; i < nodeCollection.length; i++) {
    index === i
      ? nodeCollection[i].classList.add("playing")
      : nodeCollection[i].classList.remove("playing");
  }
};

const disablePauseButtons = (nodeCollection, index) => {
  for (let i = 0; i < nodeCollection.length; i++) {
    index === i
      ? nodeCollection[i].classList.remove("disabled")
      : nodeCollection[i].classList.add("disabled");
  }
};
const attachToDom = html => {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = html;
  songsLists.appendChild(card);
};
populateCards();

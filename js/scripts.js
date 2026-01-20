console.log('JS executando');

const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
//const audio = document.getElementById('audio');
const song = document.getElementById('audio');
const play = document.getElementById('pause');
const cover = document.getElementById('cover');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

// Array com informacoes das musicas
const reflactions = {
    songName: "Reflections",
    artist: "Banana Splanite",
    file: "capa_disco_dois"
};

const yourBody = {
    songName: "Encaixe Perfeito",
    artist: "Elara Vento",
    file: "capa_disco_um"
};

const luzDourada = {
    songName: "Beijo de Devagar",
    artist: "Paixao",
    file: "capa_disco_tres" 
};

let isPlaying = false;

const playlist = [reflactions, yourBody, luzDourada];
let index = 0;


function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isPlaying = false;
};

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else{
        playSong();
    }
};

function loadSong(){ 
    
    cover.src = `img/${playlist[index].file}.jpg`;
    song.src = `sound/${playlist[index].songName}.mp3`;
    songName.innerText = playlist[index].songName; 
    bandName.innerText = playlist[index].artist; 
};

function previousSong() {
    if (index === 0){
        index = playlist.length - 1;
    }
    else {
        index -= 1;
    }
    loadSong();
    playSong();
};

function nextSong() {
    if (index === playlist.length - 1){
        index = 0;
    }
    else {
        index += 1;
    }
    loadSong();
    playSong();
};

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);

const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const play = document.getElementById('pause');
const cover = document.getElementById('cover');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const like = document.getElementById("like");
const bar = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

// Array com informacoes das musicas
const reflactions = {
    songName: "Reflections",
    artist: "Banana Splanite",
    file: "capa_disco_dois",
    isLiked: false

};

const beijoDeDevagar = {
    songName: "Encaixe Perfeito",
    artist: "Elara Vento",
    file: "capa_disco_um",
    isLiked: false
};

const encaixePerfeito = {
    songName: "Beijo de Devagar",
    artist: "Paixao",
    file: "capa_disco_tres",
    isLiked: false
 };

// Variaveis auxiliares
let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

const playlist = JSON.parse(localStorage.getItem('playlist'));
// const playlist = [reflactions, beijoDeDevagar, encaixePerfeito];
let sortedPlaylist = [...playlist];

let index = 1;

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

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    }
    else {
        playSong();
    }
};

function loadSong() {
    cover.src = `img/${sortedPlaylist[index].file}.jpg`;
    song.src = `sound/${sortedPlaylist[index].songName}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likedButtonRender();
};

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    loadSong();
    playSong();
};

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
    loadSong();
    playSong();
};

function updateProgress() {
    const barWidth = (song.currentTime / song.duration) * 100
    bar.style.setProperty('--progress', `${barWidth}%`)
    songTime.innerText = toHHMMSS(song.currentTime);
};

function likedButtonRender(){
    if(sortedPlaylist[index].isLiked === true){
        like.querySelector('.bi').classList.remove('bi-heart');
        like.querySelector('.bi').classList.add('bi-heart-fill');
        like.classList.add('button-active');
    } 
    else {
        like.querySelector('.bi').classList.remove('bi-heart');
        like.querySelector('.bi').classList.add('bi-heart-fill');
        like.classList.remove('button-active');
    }
};

function likeDesliked(){
    if(sortedPlaylist[index].isLiked === false){
        sortedPlaylist[index].isLiked = true;
    } else {
        sortedPlaylist[index].isLiked = false;
    }
    likedButtonRender();
    localStorage.setItem('playlist', JSON.stringify(playlist));
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX
    const jumpToTime = (clickPosition/width)*song.duration
    song.currentTime = jumpToTime;
};

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex =- 1;
    }    
};

function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else{
        isShuffled = false;
        shuffleArray(...playlist);
        shuffleButton.classList.remove('button-active');
    }
};

function repeatButtonClicked() {
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
    else{
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
};

function nextOrRepeat() {
    if(repeatOn === false){
        nextSong();
    }else{
        playSong();
    }
};

function toHHMMSS(originaNumber){
     let hours = Math.floor(originaNumber/3600);
     let mins = Math.floor((originaNumber - hours * 3600)/60);
     let secs = Math.floor(originaNumber - hours * 3600 - mins * 60);

     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
     //${hours.toString().padStart(2, '0')}:
};

function updateTotalTime(){
    toHHMMSS(song.duration);
    totalTime.innerText = toHHMMSS(song.duration);
};

loadSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
like.addEventListener('click', likeDesliked);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked)
repeatButton.addEventListener('click', repeatButtonClicked);

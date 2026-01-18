const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const play = document.getElementById('pause');

songName.innerText = 'Reflections';

song.pause();

function playSong() {
    play.querySelector('i').classList.remove('bi-play-circle-fill');
    play.querySelector('i').classList.add('bi-pause-circle-fill');
    song.play();
}

play.addEventListener('click', playSong);

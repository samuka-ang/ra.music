function showmenu(){
    const menulist = document.querySelector('.menulist')
    menulist.style.display = 'flex'
    const xb = document.querySelector('.xb')
    xb.style.display = 'flex'
    const menub = document.querySelector('.menub')
    menub.style.display = 'none'
}

function hidemenu(){
    const menulist = document.querySelector('.menulist')
    menulist.style.display = 'none'
    const xb = document.querySelector('.xb')
    xb.style.display = 'none'
    const menub = document.querySelector('.menub')
    menub.style.display = 'flex'
}



const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress-bar');
const playPauseButton = document.getElementById('play-pause');
const progressContainer = document.getElementById('progress-container');
const currentTimeDisplay = document.getElementById('current-time');
const durationTimeDisplay = document.getElementById('duration-time');
let isPlaying = false;
let isDragging = false;

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"><img src="icons/play.png" alt="play"></i>'; // Ícone de Play
    } else {
        audio.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"><img src="icons/pause.png" alt="pause"></i>'; // Ícone de Pause
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('loadedmetadata', () => {
    const duration = formatTime(audio.duration);
    durationTimeDisplay.textContent = duration;
});

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + '%';
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

progressContainer.addEventListener('click', (event) => {
    seek(event);
});

progressContainer.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        seek(event);
    }
});

function seek(event) {
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;
    const percent = offsetX / width;
    audio.currentTime = percent * audio.duration;
    progressBar.style.width = percent * 100 + '%';
}

audio.addEventListener('ended', () => {
    playPauseButton.innerHTML = '<button class="play-pause"><img src="icons/play.png" alt="p-p"</button>';
    isPlaying = false;
    progressBar.style.width = '0%';
    currentTimeDisplay.textContent = '00:00';
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
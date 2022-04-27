// Getting elements
let player = document.querySelector('.player');
let video = document.querySelector('.viewer');
let progress = document.querySelector('.progress');
let progressBar = document.querySelector('.progress__filled');
let toggleButton = player.querySelector('.toggle');
let skip = player.querySelectorAll('.skip');
let ranges = player.querySelectorAll('.range');

// Building functions
function togglePlay() {
    if (video.paused) {
        video.play();
        toggleButton.textContent = '❚❚'
    } else {
        video.pause();
        toggleButton.textContent = '►'
    }
}

function keyplay(key) {
    if (key == " " || key == "Enter") {
        if (video.paused) {
            video.play();
            toggleButton.textContent = '❚❚'
        } else {
            video.pause();
            toggleButton.textContent = '►'
        }
    }
}

function Skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function handleProcess() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    // console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// EventListener zone

video.addEventListener("click", togglePlay);
document.addEventListener("keydown", e => keyplay(e.key));
toggleButton.addEventListener("click", togglePlay);
for (let i = 0; i < skip.length; i++) {
    skip[i].addEventListener("click", Skip)
}

for (let i = 0; i < ranges.length; i++) {
    ranges[i].addEventListener("change", rangeUpdate)
    ranges[i].addEventListener("mousedown", rangeUpdate)
}

video.addEventListener("timeupdate", handleProcess)
progress.addEventListener("click", scrub);
let mousedown = false
// progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true)
progress.addEventListener("mouseup", () => mousedown = false)
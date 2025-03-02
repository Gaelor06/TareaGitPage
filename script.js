const audioPlayer = document.getElementById("audioPlayer");
const fileInput = document.getElementById("fileInput");
const playlist = document.getElementById("playlist");
const playPauseButton = document.getElementById("playPauseButton");

let tracks = [
  { name: "Audio 1", src: "audio4.mp3" },
  { name: "Audio 2", src: "audio3.mp3" },
  { name: "Audio 3", src: "audio2.mp3" },
];

let currentTrackIndex = 0;

function updatePlaylist() {
  playlist.innerHTML = "";
  tracks.forEach((track, index) => {
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.textContent = track.name;
    button.onclick = () => playTrack(index);
    listItem.appendChild(button);
    playlist.appendChild(listItem);
  });
}

function playTrack(index) {
  currentTrackIndex = index;
  audioPlayer.src = tracks[index].src;
  audioPlayer.play();
  playPauseButton.textContent = "Pause";
}

fileInput.addEventListener("change", function (event) {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    const objectURL = URL.createObjectURL(file);
    tracks.push({ name: file.name, src: objectURL });
  });
  updatePlaylist();
});

function togglePlayPause() {
  if (audioPlayer.paused || audioPlayer.ended) {
    audioPlayer.play();
    playPauseButton.textContent = "Pause";
  } else {
    audioPlayer.pause();
    playPauseButton.textContent = "Play";
  }
}

function stopAudio() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  playPauseButton.textContent = "Play";
}

function nextTrack() {
  if (tracks.length === 0) return;
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  playTrack(currentTrackIndex);
}

function prevTrack() {
  if (tracks.length === 0) return;
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  playTrack(currentTrackIndex);
}

updatePlaylist();

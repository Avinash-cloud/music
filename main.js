var jQueryScript = document.createElement("script");
jQueryScript.setAttribute(
  "src",
  "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"
);
document.head.appendChild(jQueryScript);

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image:
      "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "../music/Aa Gale Lag Jaa.mp3",
  },
];

function random_bg_color() {
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
  document.getElementById('nav').style.backgroundColor = bgColor;
}

function loadTrack(track_index,path_db,artist,name) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = Boolean?path_db:track_index;
  curr_track.load();

  // track_art.style.backgroundImage =
  //   "url(" + track_list[track_index].image + ")";
  track_name.textContent = name;
  track_artist.textContent = artist;
  now_playing.textContent =
    "PLAYING " + (mid)+" OF " + 103;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
var mid = 0;
function nextTrack() {
  mid=mid+1;
  $.ajax({
    type: "post",
    data: {
      id: mid,
    },
    url: "read.php",
    success: function (data) {
      var response = JSON.parse(data);
      var path_db = response.path;
      var artist = response.artist;
      var name = response.name;
      console.log(response.path, response.id);     
      if (track_index < mid- 1) track_index += 1;
      else track_index = 0;
      loadTrack(track_index, path_db,artist,name);
      
      console.log(mid); 
      playTrack();
    },
  });
}

function prevTrack() {
  if(mid<=0)
  {
    mid=103
  }
  mid=mid-1;
  $.ajax({
    type: "post",
    data: {
      id: mid,
    },
    url: "read.php",
    success: function (data) {
      var response = JSON.parse(data);
      var path_db = response.path;
      var artist = response.artist;
      var name = response.name;
      console.log(response.path, response.id);
      if (track_index > 0) track_index -= 1;
      else track_index = track_list.length;
      loadTrack(track_index, path_db,artist,name);
      
      console.log(mid);
      playTrack();
    },
  });
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

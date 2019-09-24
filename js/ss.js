/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

var timer = new Timer();
var time = parseInt(getParameterByName('time'));
var breakTime = parseInt(getParameterByName('break'));
var tmpBreakTime = breakTime;
var audioElem = document.getElementById('audio');

$(document).ready(function () {
  $('.btn').mousedown(function (e) {
    e.preventDefault();
  });

  // For demo purposes, if time is set to the minimum value of 30 min, set timer to 20 seconds.
  /*
  if (time === 30) {
    timer.start({
      countdown: true,
      startValues: {
        seconds: 20
      }
    });
  } else {*/
    timer.start({
      countdown: true,
      startValues: {
        minutes: time
      }
    });
  //}

  // Continuously update the timer while also checking to see if we reached a break time.
  $('#timer .values').html(timer.getTimeValues().toString());
  timer.addEventListener('secondsUpdated', function (e) {
    $('#timer .values').html(timer.getTimeValues().toString());
    if (timer.getTimeValues().seconds === 0) {
      if (tmpBreakTime !== 0) {
        tmpBreakTime -= 1;
        console.log(tmpBreakTime);
        if (tmpBreakTime === 0) {
          $('#modalBreakTime').modal();
          timer.pause();
          audioElem.pause();
        }
      }
    }

    // For demo purposes, if the breakTime is set to the minimum value of 0,
    // assume breakTime is every 10 seconds.
    if (timer.getTimeValues().seconds === 10 &&
        timer.getTimeValues().minutes === 0 &&
        timer.getTimeValues().hours === 0 &&
        breakTime === 0 &&
        !($('#modalComplete').hasClass('in'))) {
          $('#modalBreakTime').modal();
          timer.pause();
          audioElem.pause();
    }
  });

  // When the timer reaches 0, show the Completed modal and pause the audio.
  timer.addEventListener('targetAchieved', function (e) {
    $('#modalComplete').modal();
    audioElem.pause();
  });


  // Get the parameters from the URL to find out which Study Space we're in, which alternative we're using, and which audio and video we should use.
  var space = getParameterByName('space');
  var alt = getParameterByName('alt');
  $('#left-head .curr-ss').html(space + ' | ' + alt);

  var url = '';
  var audio = '#';
  if (space === 'Beach') {
    if (alt === 'Low-tide') {
      url = 'assets/video/beach-low.mp4';
      audio = 'assets/audio/beach-ambience.mp3';
    } else {
      url = 'assets/video/beach-high.mp4';
      audio = 'assets/audio/beach-ambience.mp3';
    }
  } else if (space === 'City') {
    if (alt === 'Day') {
      url = 'assets/video/city-day.mp4';
      audio = 'assets/audio/city-ambience.mp3';
    } else {
      url = 'assets/video/city-night.mp4';
      audio = 'assets/audio/city-ambience.mp3';
    }
  } else if (space === 'Forest') {
    if (alt === 'Creek') {
      url = 'assets/video/forest-creek.mp4';
      audio = 'assets/audio/forest-creek-ambience.mp3';
    } else {
      url = 'assets/video/forest-waterfall.mp4';
      audio = 'assets/audio/forest-waterfall-ambience.mp3';
    }
  } else if (space === 'Rain') {
    if (alt === 'Light') {
      url = 'assets/video/rain-light.mp4';
      audio = 'assets/audio/rain-light.mp3';
    } else {
      url = 'assets/video/rain-heavy.mp4';
      audio = 'assets/audio/rain-heavy.mp3';
    }
  } else if (space === 'Library') {
    if (alt === 'FirstFloor') {
      url = 'assets/video/library-1st-floor.mp4';
      audio = 'assets/audio/library-1st-floor.mp3';
    } else {
      url = 'assets/video/library-3rd-floor.mp4';
      audio = 'assets/audio/library-3rd-floor.mp3';
    }
  } else if (space === 'Cafe') {
    if (alt === 'Paris') {
      url = 'assets/video/cafe-paris.mp4';
      audio = 'assets/audio/cafe-paris.mp3';
    } else {
      url = 'assets/video/cafe-newyork.mp4';
      audio = 'assets/audio/cafe-newyork.mp3';
    }
  } else if (space === 'Park') {
    if (alt === 'Spring') {
      url = 'assets/video/park-spring.mp4';
      audio = 'assets/audio/park-spring.wav';
    } else {
      url = 'assets/video/park-fall.mp4';
      audio = 'assets/audio/park-fall.wav';
    }
  } else if (space === 'Mountains') {
    if (alt === 'LowAltitude') {
      url = 'assets/video/mountain-low-alt.mp4';
      audio = 'assets/audio/mountain-low-alt.mp3';
    } else {
      url = 'assets/video/mountain-high-alt.mp4';
      audio = 'assets/audio/mountain-high-alt.wav';
    }
  }

  // Play the audio
  audioElem.src = audio;
  audioElem.volume = 0.5;
  audioElem.play();


  // Play the video
  var images = [{
    url: url,
    isVideo: true,
    loop: true,
    mute: true
  }];
  $.backstretch(images, {
    fade: 300
  });
});

// Show the volume slider.
function showVolume () {
  var x = document.getElementById('volume-slider');
  if (x.style.display === 'none') {
    x.style.display = 'flex';
    x.style.justifyContent = 'flex-end';
  } else {
    x.style.display = 'none';
  }
}

// Update the volume
function updateVolume (val) {
  var audioElem = document.getElementById('audio');
  val = val / 100;
  audioElem.volume = val;
}

// Start the timer again and resume the audio.
function resume () {
  timer.start();
  audioElem.play();
  tmpBreakTime = breakTime;
}

// Add more time to the timer.
function addTime (h, m) {
  h = parseInt(Math.ceil(h));
  m = parseInt(Math.ceil(m));
  currTimeHours = timer.getTimeValues().hours;
  currTimeMin = timer.getTimeValues().minutes;
  currTimeSec = timer.getTimeValues().seconds;
  timer.stop();
  timer.start({
    countdown: true,
    startValues: {
      hours: currTimeHours + h,
      minutes: currTimeMin + m,
      seconds: currTimeSec
    }
  });
  audioElem.play();
}

// If user closes the Add Time modal and the clock is set to 0, show the completed modal.
$('#close-btn').click(function () {
  if (timer.getTimeValues().seconds == 0 &&
      timer.getTimeValues().minutes == 0 &&
      timer.getTimeValues().hours == 0) {
        $('#modalComplete').modal();
        audioElem.pause();
  }
})

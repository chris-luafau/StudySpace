// INDEX PAGE SCRIPTS
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function randomStudySpace () {
  var spaces = ['Beach', 'City', 'Forest', 'Library', 'Cafe', 'Park', 'Mountains', 'Rain'];
  var space = spaces[Math.floor(Math.random() * spaces.length)];
  var alts = [];

  if (space === 'Beach') {
    alts = ['LowTide', 'HighTide'];
  } else if (space === 'City') {
    alts = ['Day', 'Night'];
  } else if (space === 'Forest') {
    alts = ['Creek', 'Waterfall'];
  } else if (space === 'Library') {
    alts = ['FirstFloor', 'ThirdFloor'];
  } else if (space === 'Cafe') {
    alts = ['Paris', 'NewYork'];
  } else if (space === 'Park') {
    alts = ['Spring', 'Fall'];
  } else if (space === 'Mountains') {
    alts = ['LowAltitude', 'HighAltitude'];
  } else if (space === 'Rain') {
    alts = ['Light', 'Heavy'];
  }

  var alt = alts[Math.floor(Math.random() * alts.length)];

  return 'http://localhost:3000/set-timer.html?alt=' + alt + '&space=' + space;
}

// INITIALIZE BACKSTRETCH
$.backstretch([
  'assets/img/forest.jpg',
  'assets/img/city-skyline-at-night.jpg',
  'assets/img/NatGeo07.jpg',
  'assets/img/big-ben-bridge.jpg',
  'assets/img/NatGeo03.jpg',
  'assets/img/NatGeo12.jpg',
  'assets/img/NatGeo15.jpg'
], { duration: 3000, fade: 900 });
$('.backstretch').css('opacity', 0.8);

// INITIALIZE SWUP
let option = { animateHistoryBrowsing: true };
const swup = new Swup(option);

// RANDOM STUDY SPACE BUTTON
$('#randomBtn').click(function () {
  document.getElementById('randomBtn').setAttribute('href', randomStudySpace());
});

// UPDATE STUDY TIME ON THE SET-TIME.HTML
function updateStudyTime (val) {
  if (val < 60) {
    document.getElementById('textInput').value = val.toString() + ' min.';
  } else {
    var hours = Math.floor(val / 60);
    var minutes = val % 60;
    if (minutes !== 0) {
      document.getElementById('textInput').value = hours.toString() + ' hr. ' + minutes.toString() + ' min.';
    } else {
      document.getElementById('textInput').value = hours.toString() + ' hr.';
    }
  }
}

// UPDATE THE BREAK TIME ON THE SET-TIMER.HTML
function updateBreakTime (val) {
  if (val < 60) {
    if (val == 0) {
      document.getElementById('breakInput').value = 'No breaks.';
    } else {
      document.getElementById('breakInput').value = 'Every ' + val.toString() + ' min.';
    }
  } else {
    // var hours = Math.floor(val / 60);
    // var minutes = val % 60;
    document.getElementById('breakInput').value = 'Every hour.';
  }
}
// END OF INDEX PAGE SCRIPTS

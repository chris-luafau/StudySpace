// Parse the URL parameter
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function showContent() {
  var dynamicContent = getParameterByName('space');

  if (dynamicContent == 'Beach') {
    $('#beach-alt').show();
  } else if (dynamicContent == 'City') {
    $('#city-alt').show();
  } else if (dynamicContent == 'Forest') {
    $('#forest-alt').show();
  } else if (dynamicContent == 'Library') {
    $('#library-alt').show();
  } else if (dynamicContent == 'Cafe') {
    $('#cafe-alt').show();
  } else if (dynamicContent == 'Park') {
    $('#park-alt').show();
  } else if (dynamicContent == 'Mountains') {
    $('#mountains-alt').show();
  } else if (dynamicContent == 'Rain') {
    $('#rain-alt').show();
  } else if (dynamicContent == 'Garden') {
    $('#garden-alt').show();
  } else {
    $('#default-content').show();
  }
}

$(document).ready(function() {
  showContent();
});

function appendParams() {
  $("form").submit(function() {
    var space = getParameterByName('space');
    var alt = getParameterByName('alt');

    var input_space = $("<input>")
      .attr("type", "hidden")
      .attr("name", "space").val(space);

    var input_alt = "";

    if (alt) {
      input_alt = $("<input>")
        .attr("type", "hidden")
        .attr("name", "alt").val(alt);
    }
    $(this).append(input_space);
    $(this).append(input_alt);
  });
}

function removeParams() {
  $('#home').submit(function() {
    window.location.href = "http://localhost:3000/index.html?";
  });
  $('#alt').submit(function () {
    window.location.href = "http://localhost:3000/index.html?"
  });
  $('#setTime').submit(function () {
    var space = getParameterByName('space');
    window.location.href = "http://localhost:3000/choose-alt.html?space=" + space;
  })
}

function randomStudySpace() {
  var spaces = ['Beach','City','Forest','Library','Cafe','Park','Mountains','Rain'];
  var space = spaces[Math.floor(Math.random() * spaces.length)];
  var alts = [];

  if (space == 'Beach') {
    alts = ['LowTide','HighTide'];
  }
  else if (space == 'City') {
    alts = ['Day','Night'];
  }
  else if (space == 'Forest') {
    alts = ['Creek','Waterfall'];
  }
  else if (space == 'Library') {
    alts = ['FirstFloor','ThirdFloor'];
  }
  else if (space == 'Cafe') {
    alts = ['Paris','NewYork'];
  }
  else if (space == 'Park') {
    alts = ['Spring','Fall'];
  }
  else if (space == 'Mountains') {
    alts = ['LowAltitude','HighAltitude'];
  }
  else if (space == 'Rain') {
    alts = ['Light','Heavy'];
  }

  var alt = alts[Math.floor(Math.random() * alts.length)];

  //window.location.href = "http://localhost:3000/set-timer.html?alt=" + alt + "&space=" + space;
  return "http://localhost:3000/set-timer.html?alt=" + alt + "&space=" + space;

}

function disableInput() {
  $("#inputText").prop('disabled', true);
}

function init() {
  new appendParams();
  new removeParams();
  new disableInput();
  new showContent();
}

document.addEventListener('swup:contentReplaced', init);

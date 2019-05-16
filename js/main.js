
// Parse the URL parameter
function getParameterByName (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function showContent () {
  var dynamicContent = getParameterByName('space');

  if (dynamicContent === 'Beach') {
    $('#beach-alt').show();
  } else if (dynamicContent === 'City') {
    $('#city-alt').show();
  } else if (dynamicContent === 'Forest') {
    $('#forest-alt').show();
  } else if (dynamicContent === 'Library') {
    $('#library-alt').show();
  } else if (dynamicContent === 'Cafe') {
    $('#cafe-alt').show();
  } else if (dynamicContent === 'Park') {
    $('#park-alt').show();
  } else if (dynamicContent === 'Mountains') {
    $('#mountains-alt').show();
  } else if (dynamicContent === 'Rain') {
    $('#rain-alt').show();
  } else if (dynamicContent === 'Garden') {
    $('#garden-alt').show();
  } else {
    $('#default-content').show();
  }
}

$(document).ready(function () {
  showContent();
});

function appendParams () {
  $('form').submit(function () {
    var space = getParameterByName('space');
    var alt = getParameterByName('alt');

    var inputSpace = $('<input>')
      .attr('type', 'hidden')
      .attr('name', 'space').val(space);

    var inputAlt = '';

    if (alt) {
      inputAlt = $('<input>')
        .attr('type', 'hidden')
        .attr('name', 'alt').val(alt);
    }
    $(this).append(inputSpace);
    $(this).append(inputAlt);
  });
}

function removeParams () {
  $('#home').submit(function () {
    window.location.href = 'http://localhost:3000/index.html?';
  });
  $('#alt').submit(function () {
    window.location.href = 'http://localhost:3000/index.html?';
  });
  $('#setTime').submit(function () {
    var space = getParameterByName('space');
    window.location.href = 'http://localhost:3000/choose-alt.html?space=' + space;
  });
}

function disableInput () {
  $('#inputText').prop('disabled', true);
}

function init () {
  /* eslint-disable no-new */
  /* eslint-disable new-cap */

  new appendParams();
  new removeParams();
  new disableInput();
  new showContent();
}

document.addEventListener('swup:contentReplaced', init);

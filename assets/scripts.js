var cache = {};

var state = {
  "id": 0
}

function loadPage(url) {
  if (cache[url]) {
    return new Promise(function(resolve) {
      resolve(cache[url]);
    });
  }

  return fetch(url, {
    method: 'GET'
  }).then(function(response) {
    cache[url] = response.text();
    return cache[url];
  });
}

var body = document.querySelector('body');

function changePage() {

  var url = window.location.href;


  loadPage(url).then(function(responseText) {

  	console.log(url);

    var wrapper = document.createElement('div');
        wrapper.innerHTML = responseText;

    var oldContent = document.querySelector('#content');
    var newContent = wrapper.querySelector('#content');

    console.log(newContent)

    body.appendChild(newContent);
    animate(oldContent, newContent);
  });
}

function animate(oldContent, newContent) {
  
  // oldContent.style.position = 'absolute';

  var fadeOut = oldContent.animate({
    opacity: [1, 0]
  }, 100);

  var fadeIn = newContent.animate({
    opacity: [0, 1]
  }, 100);

  fadeOut.onfinish = function() {
    window.scrollTo(0,0);
  }

  fadeIn.onfinish = function() {
    oldContent.parentNode.removeChild(oldContent);
  };
}

window.addEventListener('popstate', changePage);

document.addEventListener('click', function(e) {
  var el = e.target;

  while (el && !el.href) {
    el = el.parentNode;
  }

  if (el) {
    e.preventDefault();

    console.log('default prevented')

    history.pushState(null, null, el.href);

    console.log(el);
    
    // state.id = el

    changePage();

    return;
  }
});

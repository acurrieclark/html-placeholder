import '../css/main.scss';

import Unsplash, {
  toJson
} from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "<@UNSPLASH_ID@>",
});

let containerCount = 1;

const mainContainer = document.querySelector('.main-container');

function loadContent() {
  const container = createContainer();
  unsplash.photos.getRandomPhoto()
    .then(toJson)
    .then(json => {
      var img = new Image();
      img.onload = () => {
        container.style.backgroundImage = "url('" + json.urls.full + "')";
        document.querySelector('.spinner').style.opacity = 0;
        document.querySelector('.attribution').style.opacity = 1;
        mainContainer.appendChild(container);
        setTimeout(() => {
          container.style.opacity = 1;
          let oldContainer = document.querySelector('#container-' + String(containerCount - 2));
          if (oldContainer) {
            oldContainer.style.opacity = 0;
            setTimeout(() => oldContainer.remove(), 3000);
          }
        }, 100);
      };

      img.src = json.urls.full;

      document.querySelector('.photographer-name').innerHTML = json.user.first_name + " " + (json.user.last_name || '').trim();
      document.querySelector('.photographer-url').setAttribute('href', json.user.links.html);
    });

  fetch('https://favqs.com/api/qotd').then(result => result.json()).then(json => {
    const quote = container.querySelector('.quote');
    quote.querySelector('.quote-text').innerHTML = json.quote.body;
    quote.querySelector('.quote-author').innerHTML = json.quote.author;
    quote.style.opacity = 1;
  });
}

loadContent();

setInterval(loadContent, 20000);

function createContainer() {
  let newContainer = document.createElement('div');
  newContainer.setAttribute('class', 'container');
  newContainer.setAttribute('id', 'container-' + containerCount++);
  let newQuote = document.createElement('div');
  newQuote.setAttribute('class', 'quote');
  let newQuoteText = document.createElement('div');
  newQuoteText.setAttribute('class', 'quote-text');
  let newQuoteAuthor = document.createElement('div');
  newQuoteAuthor.setAttribute('class', 'quote-author');

  newContainer.appendChild(newQuote);
  newQuote.appendChild(newQuoteText);
  newQuote.appendChild(newQuoteAuthor);

  return newContainer;
}
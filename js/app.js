const $ = document;

// selectors

const blockQuoteElem = $.querySelector("blockquote");
const authorSpanElem = $.querySelector("#author");
const newQuoteBtn = $.querySelector("#new-quote");
const quoteContainerElem = $.querySelector(".quote-container");



// generate new quote

async function generateNewQuote() {
  // quoteContainerElem.classList.add('load-animaition')

  // quoteContainerElem.addEventListener('animationend', () => {
  //     quoteContainerElem.classList.remove('load-animaition')
  // })

  document.documentElement.style.setProperty("--ani-start-value", "50%");

  let mainQuote = await getQuoteFromApi();

  authorSpanElem.textContent = `- ${mainQuote.author}`;
  if (mainQuote.quote.length > 300) {
    blockQuoteElem.style.fontSize = '1rem'
  }
  blockQuoteElem.textContent = mainQuote.quote;
  document.documentElement.style.setProperty("--ani-start-value", "20%");
    newQuoteBtn.disabled = false

}

// fetch new quote from api

async function getQuoteFromApi() {

    newQuoteBtn.disabled = true;
    await new Promise(requestAnimationFrame);
  try {
    let quotePromise = await fetch("https://quotes-api-self.vercel.app/qضuote");
    let data = await quotePromise.json();

    return data;

  } catch {
    alert('Check your internet and try again');

    return {
        "author": " :/",
        "quote": "Check your internet and try again!"
    };
  }


}


newQuoteBtn.addEventListener("click", generateNewQuote);

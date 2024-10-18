// document.addEventListener("DOMContentLoaded",showRandomQuote);

const createAddQuoteForm = document.getElementById("AddQuoteForm");
const button = document.getElementById("newQuote");
const quoteDisplay = document.getElementById("quoteDisplay");

let quotes = [];
 function addQuote(){
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value; 


let object = {text: text, category: category}
quotes.push(JSON.stringify(object));

 }

button.addEventListener("click", function showRandomQuote(){
  quoteDisplay.innerHTML = quotes;
showRandomQuote = quotes[Math.floor(Math.random() * quotes.length)]
   
}

);
createAddQuoteForm.addEventListener("submit", function(e){
   e.preventDefault();    
});



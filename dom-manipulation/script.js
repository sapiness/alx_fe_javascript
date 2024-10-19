
const form = document.getElementById("AddQuoteForm");
const button = document.getElementById("newQuote");
const quoteDisplay = document.getElementById("quoteDisplay");


const quotes = [/*{text : "love what you do", category : "Hardwork"}*/];
            
function addQuote(){
const text = document.getElementById("newQuoteText").value;
const category = document.getElementById("newQuoteCategory").value; 

let object = {text : text, category : category};
quotes.push(JSON.stringify(object));


 }

button.addEventListener("click", function showRandomQuote(e){
  const paragraph = document.createElement('p');
  quoteDisplay.appendChild(paragraph);

e = Math.floor(Math.random() * quotes.length)
console.log(quotes[e]); 
paragraph.innerHTML = quotes[e];
}

);
form.addEventListener("submit", function(e){
   e.preventDefault();    
});
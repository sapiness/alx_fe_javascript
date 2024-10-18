document.addEventListener("DOMContentLoaded",showRandomQuote);

const form = document.getElementById("AddQuoteForm");
const button = document.getElementById("newQuote");
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteText = document.getElementById("newQuoteText").value;
const newQuoteCategory = document.getElementById("newQuoteCategory").value;
 
let quotes = ['i love you', 'i miss you'];
  

 function addQuote(){
   quotes = [{QuoteText: newQuoteText},{category: newQuoteCategory}];
  
            
 }

function showRandomQuote(){

// addQuote();  
let showRandomQuote = quotes[Math.floor(Math.random() * quotes.length)]
quoteDisplay.innerHTML = showRandomQuote;

};
    


button.addEventListener("click", showRandomQuote);
form.addEventListener("submit", function(e){
   e.preventDefault();    
});



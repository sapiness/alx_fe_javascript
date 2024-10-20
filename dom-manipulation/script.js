document.addEventListener("DOMContentLoaded",function(){
    createAddQuoteForm();
    loadquotes();
});

const quotedisplay = document.getElementById("quoteDisplay");
const shownewQuote = document.getElementById("newQuote");
const formdiv = document.querySelector("div");

// Create form inputs
let newQuote = document.createElement('input');
    newQuote.type = 'text';
    newQuote.id = 'newQuoteText';
    newQuote.placeholder = 'Enter a new quote';

let newCategory = document.createElement('input');
    newCategory.type = 'text';
    newCategory.id = 'newQuoteCategory';
    newCategory.placeholder = 'Enter quote category';

 // Create submit button
let addbutton = document.createElement("button");
    addbutton.id = 'addquote';
    addbutton.textContent = "Add Quote";

    let quotes = [];
   

    function createAddQuoteForm(){
        // Create form 
        const Form = document.createElement("form");
           // Add elements to form
           Form.appendChild(newQuote);
           Form.appendChild(newCategory);
           Form.appendChild(addbutton);
   
           formdiv.appendChild(Form);
       };

       function addQuote(){
        const text = newQuote.value;
    const category = newCategory.value;

    const quote = {
        text: text,
        category: category

    };

        quotes.push(quote);
       };

       function showRandomQuote(){

        const randomIndex = Math.floor(Math.random() * quotes.length);


        // quotes[randomIndex] = Object.values(quotes);
        // console.log(quotes[randomIndex]);
        quotedisplay.innerHTML = JSON.stringify(quotes[randomIndex]);
       };

addbutton.addEventListener("click", function(e){
    e.preventDefault();
    addQuote();
    newQuote.value = "";
    newCategory.value = "";
 
});

shownewQuote.addEventListener("click", function(e){
    e.preventDefault();
    showRandomQuote();

});



function loadquotes() {

    const storedQuote = JSON.parse(localStorage.getItem('quotes') || '[]');
    storedQuote.forEach(newQuote => AddQuote(newQuote, false)); // 'false' indicates not to save again to Local Storage
};

// Adjust `addTask` to optionally save tasks to avoid duplication when loading from Local Storage
function addQuote(quotes, save = true) {
    // Task creation logic remains the same

    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('quotes') || '[]');
        storedTasks.push(quotes);
        localStorage.setItem('quotes', JSON.stringify(storedTasks));
    }
};

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }





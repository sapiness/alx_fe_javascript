


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

    let quotes = [{quotetext: "love yourself", 
                    quotecategory: "love"}];
        
  
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

        quotes.push({quotetext: text, quotecategory: category});
        saveQuotes();
       };

       function showRandomQuote(){

        const randomIndex = Math.floor(Math.random() * quotes.length);
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


function saveQuotes(){
    let ObjectToString = JSON.stringify(quotes);
localStorage.setItem("quotes", ObjectToString);
  
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


  function exportToJsonFile(){
    // Retrieve quotes from local storage
 const storedQuotes = localStorage.getItem('quotes');
try {
   const parsedQuotes = JSON.parse(storedQuotes);
   // Create JSON blob
   const jsonBlob = new Blob([JSON.stringify(parsedQuotes, null, 2)], { type: 'application/json' });
   // Create link to download JSON file
   const link = document.createElement('a');
   link.href = URL.createObjectURL(jsonBlob);
   link.download = 'quotes.json';
   link.click();
   // Clean up
   URL.revokeObjectURL(link.href);
 } catch {
   console.log('No quotes found in local storage');
 }
};


function populateCategories(){
  let storedQuotes = localStorage.getItem("quotes");
    // Check if data exists
    if (storedQuotes) {
      // Parse data from string to JSON
      const parsedQuotes = JSON.parse(storedQuotes);
      // Extract quote categories and populate to drowpdown
     
      const categoryFilter = document.getElementById("categoryFilter");
      const uniqueOptions = [...new Set(parsedQuotes.map((quote) => quote.quotecategory))];
      uniqueOptions.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        categoryFilter.appendChild(optionElement);
    
    });
      // Log quote categories to console
      console.log(uniqueOptions);
    } else {
      console.log('No quotes found in local storage');
    };
    
    };

    function filterQuotes(){
      const storedQuotes = localStorage.getItem('quotes');
      if (storedQuotes) {
        const parsedQuotes = JSON.parse(storedQuotes);
        const categorySelect = document.getElementById('categoryFilter');
        const selectedCategory = categorySelect.value;
        const filteredQuotes = parsedQuotes.filter((quote) => quote.quotecategory === selectedCategory);
        // Display filtered quotes
        document.getElementById('quoteDisplay').innerHTML = '';
        filteredQuotes.forEach((quote) => {
          document.getElementById('quoteDisplay').innerHTML += `
            <p>${quote.quotetext}</p>`
          ;
        });
      };
    };


    document.addEventListener("DOMContentLoaded",function(){
        createAddQuoteForm();
        populateCategories();
        filterQuotes();
       let parsedQuotes = localStorage.getItem("quotes");
       if (parsedQuotes == null){
        return;
       };
          
       quotes = JSON.parse(parsedQuotes);
    });
    










document.addEventListener("DOMContentLoaded",function(){
    createAddQuoteForm();
   let objects = localStorage.getItem("quotes");
   if (objects == null){
    return;
   };
      
   quotes = JSON.parse(objects);
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
  };


function exportToJsonFile(data, filename) {
    const blob = new Blob([data], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.addEventListener("click", () => {
      URL.revokeObjectURL(url);
    });
    return link;
  }
  const data = "Hello, World!";
  const filename = "sample1.json";
  const link = exportToJsonFile(data, filename);
   // Simulate click to download
  

function filterQuotes(){
    populateCategories();
    const dropdown = document.getElementById("categoryFilter");
    uniqueCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.text = category;
      dropdown.appendChild(option);

})
};

function populateCategories(){

    if (quotes){
    const uniqueCategories = [...new Set(quotes.map((item) => item.quotecategory))];
    }
   
};

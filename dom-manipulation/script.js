


const quotedisplay = document.getElementById("quoteDisplay");
const shownewQuote = document.getElementById("newQuote");
const formdiv = document.getElementById("form");

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

    
    let quotes = [{quotetext: "Strive not to be a success, but rather to be of value", 
                    quotecategory: "success"}];
        
  
    function createAddQuoteForm(){
      const text = newQuote.value;
    const category = newCategory.value;

        // Create form 
        const Form = document.createElement("form");
      //  Form.method = "POST";
           // Add elements to form
           Form.appendChild(newQuote);
           Form.appendChild(newCategory);
           Form.appendChild(addbutton);
   
           formdiv.appendChild(Form);

           Form.addEventListener("submit", function(e){
            e.preventDefault();
            addQuote();
           
            fetch("https://jsonplaceholder.typicode.com/posts",{
              method:"POST",
              body:JSON.stringify({
                quotetext: text,
                quotecategory:category,

              }),
              headers: {
                "Content-Type": "application/json"
              },
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
            }
              return response.json();
            })
            .then(data => { 
              console.log('Success',data);
            })
            .catch(error => {
              console.error('Error:', error);
          });
        });
      
        // newQuote.value = "";
        // newCategory.value = "";
       };

       function addQuote(){
    const text = newQuote.value;
    const category = newCategory.value;

        
        if (text == "" && category == ""){
        alert("Enter quote and category");
        return;
        } else {

        quotes.push({quotetext: text, quotecategory: category});
        saveQuotes();
       }
      };
       function showRandomQuote(){

        const randomIndex = Math.floor(Math.random() * quotes.length);
        quotedisplay.innerHTML = JSON.stringify(quotes[randomIndex]);
       };

// Form.addEventListener("submit", function(e){
//     e.preventDefault();
//     addQuote();
//     newQuote.value = "";
//     newCategory.value = "";
 
// });

shownewQuote.addEventListener("click", function(e){
    e.preventDefault();
    showRandomQuote();
    quotedisplay.style.display = "block"

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
        //   const filtered = JSON.stringify(filteredQuotes);
        //  sessionStorage.setItem("filteredquotes", filtered);

        });
      };

     
    };

    categoryFilter.addEventListener("onchange", function() {
      quotedisplay.style.display = "block"
    });

// Store and retrieve selected category
const categorySelect = document.getElementById('categoryFilter');
categorySelect.addEventListener('change', () => {
  localStorage.setItem('selectedCategory', categorySelect.value);
});
document.addEventListener('DOMContentLoaded', () => {
  const selectedCategory = localStorage.removeItem('selectedCategory');
  if (selectedCategory) {
    categorySelect.value = selectedCategory;
  }

        createAddQuoteForm();
        populateCategories();
        filterQuotes();
       let parsedQuotes = localStorage.getItem("quotes");
       if (parsedQuotes == null){
        return;
       };
          
       quotes = JSON.parse(parsedQuotes);
       
    });
    


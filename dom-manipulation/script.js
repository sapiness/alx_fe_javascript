
document.addEventListener("DOMContentLoaded",createAddQuoteForm);
const quotedisplay = document.getElementById("quoteDisplay");
const shownewQuote = document.getElementById("newQuote");

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
   
           document.body.appendChild(Form);
       };

       function AddQuote(){
        const text = newQuote.value;
        const category = newCategory.value;

        const quote = {
            text: text,
            category: category

        };

        quotes.push(quote);
       };

       function showRandomQuote(){

        const results = Object.values(quotes);
        console.log(results);
        quotedisplay.innerHTML =JSON.stringify(results);
       };

addbutton.addEventListener("click", function(e){
    e.preventDefault();
    AddQuote();
    newQuote.value = "";
    newCategory.value = "";
 
});

shownewQuote.addEventListener("click", function(e){
    e.preventDefault();
    showRandomQuote();

});
// function loadTasks() {
    
// // check Local Storage for an existing list of tasks.
// // Use localStorage.getItem('tasks') to retrieve the task list.
//     const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
//     storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
// }

// Adjust `addTask` to optionally save tasks to avoid duplication when loading from Local Storage
function AddQuote(quotes, save = true) {
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
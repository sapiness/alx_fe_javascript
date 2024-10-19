
const createAddQuoteForm = document.getElementById("AddQuoteForm");
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
createAddQuoteForm.addEventListener("submit", function(e){
   e.preventDefault();    
});

// function loadTasks() {
    
// // check Local Storage for an existing list of tasks.
// // Use localStorage.getItem('tasks') to retrieve the task list.
//     const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
//     storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
// }

// Adjust `addTask` to optionally save tasks to avoid duplication when loading from Local Storage
function addTask(quotes, save = true) {
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
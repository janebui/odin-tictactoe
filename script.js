const form = document.querySelector('form');
const newbookBtn = document.querySelector('#newbook');
const input = document.querySelector('.title');
const add = document.querySelector('#add');
const list = document.querySelector('#booklist');
const clear = document.querySelector('#clear');


let myLibrary = [];

myLibrary.push(new Book("The Tipping Point", "Malcolm Gladwell", 180, 0))
myLibrary.push(new Book("Pride & Prejudice", "Jane Austen", 300, 1))
myLibrary.push(new Book("Odyssey", "Homer", 200, 0))

// Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.readToggle = function() {
    this.read = !this.read;
    console.log("Did you really read it? " + this.read);
}

// when the "read" checkbox gets clicked, call the prototype method readToggle
function checkToggle(e) {
    if (!e.target.matches('input[type="checkbox"]')) {
        return;
    }
    else {
        const i = e.target.parentNode.dataset.index;
        myLibrary[i].readToggle();
    }
}

// eescape input using regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|<>[\]\\]/g, ''); 
  }  

// create a new instance
function addBook(e) {
    e.preventDefault();

    let title = escapeRegExp(document.getElementById('title').value);
    let author = escapeRegExp(document.getElementById('author').value);
    let pages = escapeRegExp(document.getElementById('pages').value);
    let read = document.getElementById('read').checked ? true : false;

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    displayBooks(myLibrary, list);

    this.reset();
}

// toggle display of Add a New Book Form
newbookBtn.addEventListener('click', e => {
    document.querySelector('form').classList.toggle('hide')
})

// populate list of books to be displayed
function displayBooks(myLibrary, list) {
    list.innerHTML = myLibrary.map((book, i) => {

        return `
        <li data-index="${i}">
        <div>${book.title}</div>
        <div>${book.author}</div>
        <div>${book.pages} ${book.pages == ""? "" : " pages"}</div>
        
        <input type="checkbox" id="item${i}" ${book.read == true ? "checked" : ""}/>
        <label for="item${i}"></label>
        <span class="delete">Delete</span>
        
        </li>
        <hr>
        `;
    }).join('');

}

// delete target book when user clicks on delete button
function deleteBook(e) {
    if(!e.target.matches('.delete')) return;
    myLibrary.splice(e.target.parentNode.dataset.index, 1);
    displayBooks(myLibrary, list);
}

// clear all books from the list
function clearList(e) {
    myLibrary = [];
    list.innerHTML = '';
}

form.addEventListener('submit', addBook);

displayBooks(myLibrary, list);

list.addEventListener('click', deleteBook);
list.addEventListener('click', checkToggle);
clear.addEventListener('click', clearList)
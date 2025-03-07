// VARIABLES
const myLibrary = [];
const library = document.getElementById('library');
const addBookButton = document.getElementById('add-book');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

// EVENT LISTENERS
addBookButton.addEventListener('click', () => dialog.showModal());

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);

    addBookToLibrary(data.get('title'), data.get('author'), data.get('pages'), data.get('read'));
    dialog.close();
});

// FUNCTIONS
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));

    // create a card for the new book
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');

    // add content to the card
    const titleText = document.createElement('h1');
    const authorText = document.createElement('h2');

    const descriptionText = document.createElement('p');

    titleText.textContent = title;
    authorText.textContent = author;
    descriptionText.textContent = `Pages: ${pages} | ${read ? 'Read' : 'Unread'}`;

    // update the DOM with the new card
    bookCard.appendChild(titleText);
    bookCard.appendChild(authorText);
    bookCard.appendChild(descriptionText);
    library.appendChild(bookCard);
}

// MAIN
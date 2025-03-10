// VARIABLES
const READ_COLOR = '#d9edc9';
const UNREAD_COLOR = '#eac5c5';

const myLibrary = [];
const library = document.querySelector('main');

const addBookButton = document.getElementById('add-book');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const closeFormButton = document.querySelector('svg');

// EVENT LISTENERS
addBookButton.addEventListener('click', () => dialog.showModal());

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);

    addBookToLibrary(data.get('title'), data.get('author'), data.get('pages'), data.get('read'));
    dialog.close();
});

closeFormButton.addEventListener('click', () => dialog.close());

// FUNCTIONS
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.changeReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    // create a card for the new book
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');

    // add content to the card
    const titleText = document.createElement('h1');
    const authorText = document.createElement('h2');
    const pagesText = document.createElement('p');
    titleText.textContent = title;
    authorText.textContent = `by ${author}`;
    pagesText.textContent = `${pages} pages`;

    const cardButtons = document.createElement('div');
    const removeButton = document.createElement('button');
    removeButton.setAttribute('id', 'remove-button');
    const readButton = document.createElement('button');
    readButton.setAttribute('id', 'read-button');

    readButton.textContent = read ? 'Read' : 'Unread';;
    readButton.style.backgroundColor = read ? READ_COLOR : UNREAD_COLOR;
    removeButton.textContent = 'Remove';

    // update the DOM with the new card
    bookCard.appendChild(titleText);
    bookCard.appendChild(authorText);
    bookCard.appendChild(pagesText);
    cardButtons.appendChild(readButton);
    cardButtons.appendChild(removeButton);
    bookCard.appendChild(cardButtons);
    library.appendChild(bookCard);

    removeButton.addEventListener('click', (e) => {
        // remove the book from myLibrary array
        myLibrary.splice(myLibrary.indexOf(newBook), 1);

        // remove the book card from the DOM
        e.target.parentElement.parentElement.remove();
    });

    readButton.addEventListener('click', (e) => {
        newBook.changeReadStatus();

        readButton.textContent = newBook.read ? 'Read' : 'Unread';
        readButton.style.backgroundColor = newBook.read ? READ_COLOR : UNREAD_COLOR;
    });
}

// MAIN
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('Mind Games', 'Nora Roberts', 421, false);
addBookToLibrary('Chi\'s Sweet Adventures Vol. 3', 'Konami Kanata', 88, true);
addBookToLibrary('Erased Vol. 1', 'Kei Sanbe', 392, false);
console.log(myLibrary);
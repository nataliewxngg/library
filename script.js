// VARIABLES
const myLibrary = [];
const library = document.getElementById('library');

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

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));

    // create a card for the new book
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');

    // add content to the card
    const titleText = document.createElement('h1');
    const authorText = document.createElement('h2');

    const descriptionText = document.createElement('p');

    const removeBookButton = document.createElement('button');

    titleText.textContent = title;
    authorText.textContent = author;
    descriptionText.textContent = `Pages: ${pages} | ${read ? 'Read' : 'Unread'}`;
    removeBookButton.textContent = 'Remove Book';
    removeBookButton.classList.add('remove-book');

    bookCard.setAttribute('id', myLibrary[myLibrary.length - 1].id);
    removeBookButton.setAttribute('id', myLibrary[myLibrary.length - 1].id);

    // update the DOM with the new card
    bookCard.appendChild(titleText);
    bookCard.appendChild(authorText);
    bookCard.appendChild(descriptionText);
    bookCard.appendChild(removeBookButton);
    library.appendChild(bookCard);
    // update the list of .remove-book buttons

    removeBookButton.addEventListener('click', (e) => {
        console.log(e.target.parentElement.id);
        console.log(myLibrary[0].id);

        // remove the book from myLibrary array
        for (let book in myLibrary) {
            if (myLibrary[book].id === e.target.parentElement.id) {
                myLibrary.splice(book, 1);
                break;
            }
        }

        // remove the book card from the DOM
        e.target.parentElement.remove();
    });
}

// MAIN
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('Mind Games', 'Nora Roberts', 421, false);
addBookToLibrary('Chi\'s Sweet Adventures Vol. 3', 'Konami Kanata', 88, true);
addBookToLibrary('Erased Vol. 1', 'Kei Sanbe', 392, false);
console.log(myLibrary);
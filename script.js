const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('Mind Games', 'Nora Roberts', 421, false);
addBookToLibrary('Chi\'s Sweet Adventures Vol. 3', 'Konami Kanata', 88, true);
addBookToLibrary('Erased Vol. 1', 'Kei Sanbe', 392, false);
console.log(myLibrary);

// display each book in the library
const library = document.getElementById('library');

for (let book of myLibrary) {

    // create a card for each book
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');

    // add content to the card
    const title = document.createElement('h1');
    const author = document.createElement('h2');

    const description = document.createElement('p');

    title.textContent = book.title;
    author.textContent = book.author;
    description.textContent = `Pages: ${book.pages} | ${book.read ? 'Read' : 'Unread'}`;

    // update the DOM with the new card
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(description);
    library.appendChild(bookCard);
}
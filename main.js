const listElm = document.querySelector('.books-list');
const formElm = document.querySelector('.form form');

let booksList = localStorage.getItem('booksList')
  ? JSON.parse(localStorage.getItem('booksList'))
  : [];

function addBook(book) {
  booksList.push(book);

  localStorage.setItem('booksList', JSON.stringify(booksList));
}

function removeBook(book) {
  booksList = booksList.filter(
    (currentBook) => currentBook.title !== book.title
  );

  localStorage.setItem('booksList', JSON.stringify(booksList));
}

function renderBooks() {
  listElm.innerHTML = '';

  booksList.forEach((book) => {
    listElm.innerHTML += `
      <li>
        <div>
          <p>${book.title}</p>
          <p>${book.author}</p>
          <button>remove</button>
        </div>
      </li>
    `;
  });

  const removeBtns = document.querySelectorAll('li button');
  removeBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      removeBook(booksList[i]);

      btn.parentNode.parentNode.remove();
    });
  });
}

renderBooks();

formElm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = formElm.title.value.trim();
  const author = formElm.author.value.trim();

  formElm.title.value = '';
  formElm.author.value = '';

  addBook({ title, author });
  renderBooks();

  return false;
});

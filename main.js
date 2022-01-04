const listElm = document.querySelector('.books-list');
const formElm = document.querySelector('.form form');

class books {
  constructor() {
    this.list = localStorage.getItem('booksList')
      ? JSON.parse(localStorage.getItem('booksList'))
      : [];
  }

  add(book) {
    this.list.push(book);

    localStorage.setItem('booksList', JSON.stringify(this.list));
  }

  remove(title) {
    this.list = this.list.filter((book) => book.title !== title);

    localStorage.setItem('booksList', JSON.stringify(this.list));
  }
}

const booksList = new books();

function renderBooks() {
  listElm.innerHTML = '';

  booksList.list.forEach((book) => {
    listElm.innerHTML += `
      <li>
        <div>
          <p class="title">${book.title}</p>
          <p>${book.author}</p>
          <button>remove</button>
        </div>
      </li>
    `;
  });

  const removeBtns = document.querySelectorAll('li button');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const element = btn.parentNode.parentNode;
      const bookTitle = element.querySelector('.title').textContent;

      booksList.remove(bookTitle);

      element.remove();
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

  booksList.add({ title, author });
  renderBooks();

  return false;
});

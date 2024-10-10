const nameInput = document.getElementById('bookName');
const authorInput = document.getElementById('bookAuthor');
const yearInput = document.getElementById('bookYear');
const genreInput = document.getElementById('bookGenre');
const bookList = document.getElementById('bookList');
const form = document.getElementById('form');


let data = [];


if (localStorage.getItem('data')) {
  data = JSON.parse(localStorage.getItem('data'))
}


data.forEach(function (book) {



  let doneText;

  hgdjf()
  const bookHTML = `
    <article class="book-item" id="${book.id} ">
        <p class="book-itle">${book.name} </p>
        <p class="avtor">${book.author} </p>
        <p class="god">${book.year} </p>
        <p class="hzanr">${book.genre} </p>
      <button type="button" id="${book.id}" onclick="onOf(event)" data-action="on" class="btn-action on">
      ${doneText} 
        </button>
        
        <button type="button" data-action="redd"${book.id} onclick="editBook(this)"  class="btn-action redd">
          Редактировать
        </button>
        <button type="button" data-action="delete"${book.id} class="btn-action delete">
          Удалить
        </button>
    </article>
    `;
  bookList.insertAdjacentHTML('beforeend', bookHTML);

  function hgdjf() {

    if (book.done === true) {
      doneText = 'Прочитано'
    } else if (book.done === false) {
      doneText = 'Не прочитано'
    }
    return doneText
  }
  booksQnt()
})



form.addEventListener('submit', addBook);
bookList.addEventListener('click', deleteBook)


function addBook(event) {


  event.preventDefault();



  const dataCopy = {
    id: Date.now(),
    name: nameInput.value,
    author: authorInput.value,
    year: yearInput.value,
    genre: genreInput.value,
    done: false
  };

  data.push(dataCopy);

  saveToLocalStorage()

  const doneText = 'Не прочитано';

  nameInput.value = '';
  authorInput.value = '';
  yearInput.value = '';
  genreInput.value = '';
  document.location.reload()


}






function onOf(event) {
  const parentNode = event.target.closest('.btn-action');
  console.log(parentNode)
  const id = Number(parentNode.id);
  const book = data.find((book) => book.id === id);
  book.done = !book.done;
  saveToLocalStorage();
  document.location.reload()
}






function deleteBook(event) {
  if (event.target.dataset.action === 'delete') {
    const parenNode = event.target.closest('.book-item');

    const id = Number(parenNode.id);

    data = data.filter((book) => book.id !== id)

    parenNode.remove();
  }
  saveToLocalStorage()

  filterBookOf()
}







function editBook(button) {
  const article = button.parentElement;
  const id = Number(article.id);
  const i = data.findIndex((i) => i.id === id);
  const ind = i;
  const nameText = article.querySelector('.book-itle').textContent;
  const authorText = article.querySelector('.avtor').textContent;
  const yearText = article.querySelector('.god').textContent;
  const genreText = article.querySelector('.hzanr').textContent;
  const newnameText = prompt('Редактировать название', nameText);
  const newauthorText = prompt('Редактировать автора', authorText);
  const newyearText = prompt('Редактировать год', yearText);
  const newgenreText = prompt('Редактировать жанр', genreText);




  if (newnameText !== null && newnameText !== '') {
    article.querySelector('.book-itle').textContent = newnameText
    data[ind].name = newnameText

  };
  if (newnameText !== null && newnameText !== '') {
    article.querySelector('.avtor').textContent = newauthorText
    data[ind].author = newauthorText
  };
  if (newnameText !== null && newnameText !== '') {
    article.querySelector('.god').textContent = newyearText
    data[ind].year = newyearText
  };
  if (newnameText !== null && newnameText !== '') {
    article.querySelector('.hzanr').textContent = newgenreText
    data[ind].genre = newgenreText
  };




}



function saveToLocalStorage() {
  localStorage.setItem('data', JSON.stringify(data));
}


function filterBook() {


  event.preventDefault();

  const ind = data.findIndex((ind) => ind.done == false)
  console.log(ind)
  const filterInput = document.getElementById('filterInput');
  const filterText = filterInput.value.toLowerCase();
  const ddon = true
  const tr = []
  const fl = []
  data.forEach(function (don, index) {
    if (don.done === ddon) tr.push(index);
    else if (don.done === !ddon) fl.push(index)
  })

  if (filterText === String('прочитано')) {
    for (var i of fl) {

      const btn = document.getElementById(data[i].id);
      console.log(btn)
      btn.parentElement.style.display = 'none';
    }
  } else if (filterText === String('не прочитано')) {
    for (var i of tr) {
      const btn = document.getElementById(data[i].id);
      btn.parentElement.style.display = 'none';
    }
  }

  console.log(fl)

}

function filterBookOf() {
  document.location.reload()

}

function booksQnt() {
  const cont = document.getElementById('b')
  const book = data.length
  cont.textContent = `Книг: ${book} `
}

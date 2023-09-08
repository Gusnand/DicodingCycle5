document.addEventListener("DOMContentLoaded", function () {
  const inputBookTitle = document.getElementById("inputBookTitle");
  const inputBookAuthor = document.getElementById("inputBookAuthor");
  const inputBookYear = document.getElementById("inputBookYear");
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");
  const bookSubmit = document.getElementById("bookSubmit");
  const searchBookTitle = document.getElementById("searchBookTitle");
  const searchSubmit = document.getElementById("searchSubmit");

  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );

  bookSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    addBook();
  });

  searchSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    searchBook();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target === inputBookTitle) {
      e.preventDefault();
      addBook();
    } else if (e.key === "Enter" && e.target === searchBookTitle) {
      e.preventDefault();
      searchBook();
    }
  });

  function addBook() {
    const title = inputBookTitle.value;
    const author = inputBookAuthor.value;
    const year = inputBookYear.value;
    const isComplete = inputBookIsComplete.checked;

    if (title === "" || author === "" || year === "") {
      alert("Please fill in all fields.");
      return;
    }

    const book = createBook(title, author, year, isComplete);
    const bookshelf = isComplete
      ? completeBookshelfList
      : incompleteBookshelfList;
    bookshelf.appendChild(book);

    if (isComplete) {
      const parentBookshelf = incompleteBookshelfList;
      const siblingBookshelf = completeBookshelfList;

      if (parentBookshelf.contains(book)) {
        parentBookshelf.removeChild(book);
        siblingBookshelf.appendChild(book);
      }

      const finishButton = book.querySelector("button.green");
      finishButton.innerText = "Belum selesai dibaca";
      finishButton.classList.remove("green");
      finishButton.classList.add("red");

      finishButton.addEventListener("click", function () {
        const parentBookshelf = completeBookshelfList;
        const siblingBookshelf = incompleteBookshelfList;

        if (parentBookshelf.contains(book)) {
          parentBookshelf.removeChild(book);
          siblingBookshelf.appendChild(book);
        }

        inputBookIsComplete.checked = false;
        finishButton.innerText = "Selesai dibaca";
        finishButton.classList.remove("red");
        finishButton.classList.add("green");

        clearInputFields();
        updateStorage();
      });
    }
    updateStorage();
  }

  function createBook(title, author, year, isComplete) {
    const book = document.createElement("article");
    book.classList.add("book_item");

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = `Penulis: ${author}`;

    const bookYear = document.createElement("p");
    bookYear.innerText = `Tahun: ${year}`;

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("action");

    const finishButton = document.createElement("button");
    finishButton.innerText = isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";
    finishButton.classList.add(isComplete ? "green" : "red");

    finishButton.addEventListener("click", function () {
      const parentBookshelf = isComplete
        ? incompleteBookshelfList
        : completeBookshelfList;
      const siblingBookshelf = isComplete
        ? completeBookshelfList
        : incompleteBookshelfList;

      if (parentBookshelf.contains(book)) {
        parentBookshelf.removeChild(book);
        siblingBookshelf.appendChild(book);
      }

      inputBookIsComplete.checked = !isComplete;
      finishButton.innerText = isComplete
        ? "Selesai dibaca"
        : "Belum selesai dibaca";

      updateStorage();
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Hapus buku";
    deleteButton.classList.add("red");

    deleteButton.addEventListener("click", function () {
      const parentBookshelf = isComplete
        ? completeBookshelfList
        : incompleteBookshelfList;

      if (parentBookshelf.contains(book)) {
        parentBookshelf.removeChild(book);
      }
      updateStorage();
    });

    actionDiv.appendChild(finishButton);
    actionDiv.appendChild(deleteButton);

    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookYear);
    book.appendChild(actionDiv);

    return book;
  }

  function clearInputFields() {
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
    inputBookIsComplete.checked = false;
  }

  function updateStorage() {
    const incompleteBooks = Array.from(incompleteBookshelfList.children).map(
      (book) => {
        const title = book.querySelector("h3").innerText;
        const author = book.querySelector("p:nth-child(2)").innerText.slice(9);
        const year = book.querySelector("p:nth-child(3)").innerText.slice(7);
        return {
          title,
          author,
          year,
          isComplete: false,
        };
      }
    );

    const completeBooks = Array.from(completeBookshelfList.children).map(
      (book) => {
        const title = book.querySelector("h3").innerText;
        const author = book.querySelector("p:nth-child(2)").innerText.slice(9);
        const year = book.querySelector("p:nth-child(3)").innerText.slice(7);
        return {
          title,
          author,
          year,
          isComplete: true,
        };
      }
    );

    localStorage.setItem("incompleteBooks", JSON.stringify(incompleteBooks));
    localStorage.setItem("completeBooks", JSON.stringify(completeBooks));
  }

  function loadBooksFromStorage() {
    const incompleteBooks =
      JSON.parse(localStorage.getItem("incompleteBooks")) || [];
    const completeBooks =
      JSON.parse(localStorage.getItem("completeBooks")) || [];

    incompleteBooks.forEach((book) => {
      const newBook = createBook(book.title, book.author, book.year, false);
      incompleteBookshelfList.appendChild(newBook);
    });

    completeBooks.forEach((book) => {
      const newBook = createBook(book.title, book.author, book.year, true);
      completeBookshelfList.appendChild(newBook);
    });
  }

  function searchBook() {
    const keyword = searchBookTitle.value.toLowerCase();
    const allBooks = document.querySelectorAll(".book_item");

    allBooks.forEach((book) => {
      const title = book.querySelector("h3").innerText.toLowerCase();
      const author = book
        .querySelector("p:nth-child(2)")
        .innerText.slice(9)
        .toLowerCase();
      const year = book.querySelector("p:nth-child(3)").innerText.slice(7);

      if (
        title.includes(keyword) ||
        author.includes(keyword) ||
        year.includes(keyword)
      ) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  }

  loadBooksFromStorage();
});

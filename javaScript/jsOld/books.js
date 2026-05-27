

// === ДАНІ КНИГ === LocalStorage
let books = JSON.parse(localStorage.getItem('books')) || [];
function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}


// Додавання книги              CRUD книги          //
function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const quantity = parseInt(document.getElementById('bookQuantity').value) || 1;

    if (!title || !author) {
        alert("Заповніть назву книги та автора!");
        return;
    }

    books.push({
        title,
        author,
        quantity: Number(quantity)
    });


    saveBooks();
    renderBooks();
    hideAddBookModal();

    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookQuantity').value = '1';
}
// Видалення книги
function deleteBook(index) {
    if (confirm(`Видалити книгу "${books[index].title}"?`)) {
        books.splice(index, 1);
        saveBooks();
        renderBooks();
    }
}
// Редагування книги
function editBook(index) {
    const book = books[index];

    const newTitle = prompt("Нова назва книги:", book.title);
    if (newTitle === null) return;

    const newAuthor = prompt("Новий автор:", book.author);
    if (newAuthor === null) return;

    const newQuantity = prompt("Нова кількість:", book.quantity);
    if (newQuantity === null) return;

    books[index] = {
        title: newTitle.trim() || book.title,
        author: newAuthor.trim() || book.author,
        quantity: parseInt(newQuantity) || book.quantity
    };

    saveBooks();
    renderBooks();
}





// Відображення таблиці книг        UI книги         //
function renderBooks(filteredBooks = books) {
    const tbody = document.getElementById('booksTable');
    tbody.innerHTML = '';

    if (filteredBooks.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                    Книг не знайдено
                </td>
            </tr>`;
        return;
    }

    filteredBooks.forEach((book) => {
        const originalIndex = books.indexOf(book);

        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50";

        tr.innerHTML = `
            <td class="px-6 py-4">${book.title}</td>
            <td class="px-6 py-4">${book.author}</td>
            <td class="px-6 py-4">${book.quantity}</td>
            <td class="px-6 py-4 text-center space-x-2">
                
                <button onclick="editBook(${originalIndex})"
                    class="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50">
                    <i class="fas fa-edit"></i>
                </button>

                <button onclick="deleteBook(${originalIndex})"
                    class="text-red-600 hover:text-red-800 px-3 py-1 rounded-lg hover:bg-red-50">
                    <i class="fas fa-trash"></i>
                </button>

            </td>
        `;

        tbody.appendChild(tr);
    });
}

// Пошук
function searchBooks() {
    const query = document.getElementById('searchBooks').value.toLowerCase().trim();
    if (!query) {
        renderBooks(books);
        return;
    }
    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    renderBooks(filtered);
}

// Модальне вікно
function showAddBookModal() {
    document.getElementById('addBookModal').classList.remove('hidden');
    document.getElementById('bookTitle').focus();
}

function hideAddBookModal() {
    document.getElementById('addBookModal').classList.add('hidden');
}



// -------------------------------------------------------


// Перемикання секцій
function showSection(n) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(`section${n}`).classList.remove('hidden');
    // Активне меню
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    document.getElementById(`menu${n}`).classList.add('active');
    // Заголовок
    const titles = {
        1: "Облік книг",
        2: "Облік відвідувачів",
        3: "Видача та повернення",
        4: "Статистика"
    };

    document.getElementById('page-title').textContent = titles[n];

    if (n === 3) {
        renderVisitors();
        updateLoanSelects();
        renderLoans();
    }
}


// Ініціалізація
// window.onload = function () {
//     renderBooks();
//     renderVisitors();
//     renderLoans();
//     showSection(1);
// };










// === ДАНІ КНИГ ===
let books = JSON.parse(localStorage.getItem('books')) || [];

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

// ==================== CRUD ====================

function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const quantity = parseInt(document.getElementById('bookQuantity').value) || 1;

    if (!title || !author) {
        alert("Заповніть назву книги та автора!");
        return;
    }

    books.push({ title, author, quantity: Number(quantity) });

    saveBooks();
    renderBooks();
    hideAddBookModal();

    // очистка
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookQuantity').value = '1';
}

function deleteBook(index) {
    if (confirm(`Видалити книгу "${books[index].title}"?`)) {
        books.splice(index, 1);
        saveBooks();
        renderBooks();
    }
}

function editBook(index) {
    const book = books[index];
    const newTitle = prompt("Нова назва:", book.title);
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

// ==================== RENDER ====================

function renderBooks(filteredBooks = books) {
    const tbody = document.getElementById('booksTable');
    if (!tbody) return;   // захист

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

    filteredBooks.forEach((book, idx) => {
        const originalIndex = books.indexOf(book);
        
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50";
        tr.innerHTML = `
            <td class="px-6 py-4">${book.title}</td>
            <td class="px-6 py-4">${book.author}</td>
            <td class="px-6 py-4">${book.quantity}</td>
            <td class="px-6 py-4 text-center space-x-2">
                <button onclick="editBook(${originalIndex})" class="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteBook(${originalIndex})" class="text-red-600 hover:text-red-800 px-3 py-1 rounded-lg hover:bg-red-50">
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

// Модалки
function showAddBookModal() {
    document.getElementById('addBookModal').classList.remove('hidden');
    document.getElementById('bookTitle').focus();
}

function hideAddBookModal() {
    document.getElementById('addBookModal').classList.add('hidden');
}

// ==================== ІНІЦІАЛІЗАЦІЯ ====================
function initBooks() {
    renderBooks();
}









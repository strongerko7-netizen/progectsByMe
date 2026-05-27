


function renderStats() {
    const totalBooks = books.length;

    const totalCopies = books.reduce((sum, book) => {
        return sum + (book.quantity || 0);
    }, 0);

    const uniqueAuthors = new Set(
        books.map(book => book.author.toLowerCase().trim())
    ).size;

    document.getElementById('statBooks').textContent = totalBooks;
    document.getElementById('statCopies').textContent = totalCopies;
    document.getElementById('statAuthors').textContent = uniqueAuthors;
}









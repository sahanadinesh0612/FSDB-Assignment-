// Sample book data
let booksData = [
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", category: "fiction", status: "available", isbn: "978-0061120084", rating: 4.5 },
    { id: 2, title: "1984", author: "George Orwell", category: "fiction", status: "borrowed", isbn: "978-0451524935", rating: 4.7 },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "fiction", status: "available", isbn: "978-0743273565", rating: 4.2 },
    { id: 4, title: "Sapiens", author: "Yuval Noah Harari", category: "non-fiction", status: "available", isbn: "978-0062316097", rating: 4.6 },
    { id: 5, title: "A Brief History of Time", author: "Stephen Hawking", category: "science", status: "borrowed", isbn: "978-0553380163", rating: 4.3 },
    { id: 6, title: "The Selfish Gene", author: "Richard Dawkins", category: "science", status: "available", isbn: "978-0198788607", rating: 4.4 },
    { id: 7, title: "Educated", author: "Tara Westover", category: "non-fiction", status: "available", isbn: "978-0399590504", rating: 4.8 },
    { id: 8, title: "The Code Breaker", author: "Walter Isaacson", category: "technology", status: "available", isbn: "978-1982115852", rating: 4.5 },
    { id: 9, title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "history", status: "borrowed", isbn: "978-0393317558", rating: 4.1 },
    { id: 10, title: "The Wright Brothers", author: "David McCullough", category: "history", status: "available", isbn: "978-1476728742", rating: 4.3 },
    { id: 11, title: "Clean Code", author: "Robert C. Martin", category: "technology", status: "available", isbn: "978-0132350884", rating: 4.7 },
    { id: 12, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "technology", status: "borrowed", isbn: "978-0135957059", rating: 4.6 }
];

// User's borrowed books
let myBorrowedBooks = [
    { bookId: 2, borrowedDate: "2026-01-15", dueDate: "2026-02-15" },
    { bookId: 5, borrowedDate: "2026-01-20", dueDate: "2026-02-20" },
    { bookId: 9, borrowedDate: "2026-01-10", dueDate: "2026-02-10" }
];

// Pagination
let currentPage = 1;
const booksPerPage = 6;
let filteredBooks = [...booksData];

// Current rating state
let currentRatingBookId = null;
let currentRatingValue = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
    displayMyBooks();
    updateDashboardStats();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Add book form
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewBook();
        });
    }

    // Search input - real-time search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchBooks);
    }
}

// Display books in grid
function displayBooks() {
    const booksGrid = document.getElementById('booksGrid');
    if (!booksGrid) return;

    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

    booksGrid.innerHTML = '';

    booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            <span class="category">${book.category}</span>
            ${book.rating ? `
                <div class="book-rating">
                    ${generateStarRating(book.rating)}
                    <span>(${book.rating})</span>
                </div>
            ` : ''}
            <p class="status ${book.status}">${book.status === 'available' ? '✓ Available' : '✗ Borrowed'}</p>
            <div style="margin-top: 1rem;">
                ${book.status === 'available' ? 
                    `<button class="action-button borrow" onclick="borrowBook(${book.id})">Borrow</button>` : 
                    ''}
                <button class="action-button rate" onclick="openRatingModal(${book.id})">Rate</button>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });

    displayPagination();
}

// Generate star rating display
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    let starsHTML = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += `<svg class="star active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>`;
        } else {
            starsHTML += `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>`;
        }
    }
    
    return starsHTML;
}

// Display pagination
function displayPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    pagination.innerHTML = '';

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = '← Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => changePage(currentPage - 1);
    pagination.appendChild(prevButton);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? 'active' : '';
        pageButton.onclick = () => changePage(i);
        pagination.appendChild(pageButton);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next →';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(nextButton);
}

// Change page
function changePage(page) {
    currentPage = page;
    displayBooks();
    scrollToSection('books');
}

// Search books
function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    filteredBooks = booksData.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                            book.author.toLowerCase().includes(searchTerm) ||
                            (book.isbn && book.isbn.includes(searchTerm));
        
        const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || book.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    currentPage = 1;
    displayBooks();
}

// Borrow book
function borrowBook(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (book && book.status === 'available') {
        book.status = 'borrowed';
        
        const borrowedDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);

        myBorrowedBooks.push({
            bookId: bookId,
            borrowedDate: borrowedDate.toISOString().split('T')[0],
            dueDate: dueDate.toISOString().split('T')[0]
        });

        displayBooks();
        displayMyBooks();
        updateDashboardStats();
        
        alert(`Successfully borrowed "${book.title}". Due date: ${dueDate.toLocaleDateString()}`);
    }
}

// Display user's borrowed books
function displayMyBooks() {
    const myBooksTable = document.getElementById('myBooksTable');
    if (!myBooksTable) return;

    myBooksTable.innerHTML = '';

    if (myBorrowedBooks.length === 0) {
        myBooksTable.innerHTML = '<tr><td colspan="6" style="text-align: center;">No borrowed books</td></tr>';
        return;
    }

    myBorrowedBooks.forEach(borrowedBook => {
        const book = booksData.find(b => b.id === borrowedBook.bookId);
        if (!book) return;

        const dueDate = new Date(borrowedBook.dueDate);
        const today = new Date();
        const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
        let statusClass = 'status-on-time';
        let statusText = 'On Time';
        
        if (daysUntilDue < 0) {
            statusClass = 'status-overdue';
            statusText = `Overdue by ${Math.abs(daysUntilDue)} days`;
        } else if (daysUntilDue <= 3) {
            statusClass = 'status-due-soon';
            statusText = `Due in ${daysUntilDue} days`;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${new Date(borrowedBook.borrowedDate).toLocaleDateString()}</td>
            <td>${dueDate.toLocaleDateString()}</td>
            <td><span class="${statusClass}">${statusText}</span></td>
            <td>
                <button class="action-button borrow" onclick="returnBook(${book.id})">Return</button>
            </td>
        `;
        myBooksTable.appendChild(row);
    });
}

// Return book
function returnBook(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (book) {
        book.status = 'available';
        myBorrowedBooks = myBorrowedBooks.filter(b => b.bookId !== bookId);
        
        displayBooks();
        displayMyBooks();
        updateDashboardStats();
        
        alert(`Successfully returned "${book.title}"`);
    }
}

// Update dashboard statistics
function updateDashboardStats() {
    document.getElementById('totalBooks').textContent = booksData.length;
    document.getElementById('availableBooks').textContent = booksData.filter(b => b.status === 'available').length;
    document.getElementById('borrowedBooks').textContent = booksData.filter(b => b.status === 'borrowed').length;
    
    const today = new Date();
    const overdueCount = myBorrowedBooks.filter(b => {
        const dueDate = new Date(b.dueDate);
        return dueDate < today;
    }).length;
    
    document.getElementById('overdueBooks').textContent = overdueCount;
}

// Add new book
function addNewBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const isbn = document.getElementById('bookISBN').value.trim();
    const category = document.getElementById('bookCategory').value;

    if (!title || !author || !category) {
        alert('Please fill in all required fields');
        return;
    }

    const newBook = {
        id: booksData.length + 1,
        title: title,
        author: author,
        category: category,
        status: 'available',
        isbn: isbn,
        rating: 0
    };

    booksData.push(newBook);
    filteredBooks = [...booksData];
    
    displayBooks();
    updateDashboardStats();
    
    document.getElementById('addBookForm').reset();
    alert(`Successfully added "${title}" to the library!`);
}

// Open rating modal
function openRatingModal(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;

    currentRatingBookId = bookId;
    currentRatingValue = 0;

    document.getElementById('ratingBookTitle').textContent = book.title;
    document.getElementById('ratingModal').classList.add('show');
    
    // Reset stars
    document.querySelectorAll('#starRating .star').forEach(star => {
        star.classList.remove('active');
    });
    
    document.getElementById('ratingText').textContent = 'Select a rating';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Set rating
function setRating(rating) {
    currentRatingValue = rating;
    
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    const ratingTexts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    document.getElementById('ratingText').textContent = ratingTexts[rating];
}

// Submit rating
function submitRating() {
    if (currentRatingValue === 0) {
        alert('Please select a rating');
        return;
    }

    const book = booksData.find(b => b.id === currentRatingBookId);
    if (book) {
        book.rating = currentRatingValue;
        displayBooks();
        closeModal('ratingModal');
        alert(`Thank you for rating "${book.title}"!`);
    }
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
}

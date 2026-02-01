# 📚 Sahana Library Management System

A modern, responsive library management system built with vanilla HTML, CSS, and JavaScript. Manage your book collection, track borrowings, and provide ratings - all in a beautiful, user-friendly interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ Features

### 📖 Book Management
- **Browse Collection** - View all books in an elegant grid layout
- **Search & Filter** - Search by title, author, or ISBN with real-time filtering
- **Category Filtering** - Filter books by Fiction, Non-Fiction, Science, History, and Technology
- **Status Tracking** - See which books are available or currently borrowed

### ⭐ User Features
- **Book Ratings** - Interactive 5-star rating system for all books
- **Borrow Books** - One-click borrowing with automatic due date calculation (30 days)
- **My Books** - Track all your borrowed books with due dates and status
- **Overdue Alerts** - Visual indicators for overdue and due-soon books

### 👨‍💼 Admin Dashboard
- **Statistics Overview** - Real-time stats for total, available, borrowed, and overdue books
- **Add New Books** - Simple form to add books to the collection
- **Inventory Management** - Complete control over the library catalog

### 🎨 Design
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional design with smooth animations
- **Intuitive Navigation** - Easy-to-use interface with dropdown menus
- **Modal Dialogs** - Elegant popups for ratings and confirmations

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- No server or additional software required!

### Installation

1. **Clone or download** the repository:
   ```bash
   git clone https://github.com/yourusername/sahana-library.git
   ```

2. **Navigate to the project folder**:
   ```bash
   cd sahana-library
   ```

3. **Open the project**:
   - Simply double-click `index.html`, or
   - Right-click `index.html` → Open with → Your preferred browser

### Alternative: Using a Local Server

If you prefer to run with a local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

Then open: `http://localhost:8000`

## 📁 Project Structure

```
sahana/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and responsive design
├── script.js           # All JavaScript functionality
└── README.md           # This file
```

## 🎯 Usage Guide

### Browsing Books
1. Navigate to the **Books** section from the menu
2. Use the search bar to find specific books
3. Apply filters by category or availability status
4. Click on pagination buttons to browse more books

### Borrowing a Book
1. Find an available book
2. Click the **Borrow** button
3. The book will be added to "My Books" with a 30-day due date
4. Track your borrowed books in the "My Books" section

### Rating a Book
1. Click the **Rate** button on any book
2. Select 1-5 stars in the modal dialog
3. Click **Submit Rating**
4. Your rating will be displayed on the book card

### Adding Books (Admin)
1. Go to the **Admin** section
2. Fill in the book details:
   - Title (required)
   - Author (required)
   - ISBN (optional)
   - Category (required)
3. Click **Add Book**
4. The book will appear in the collection immediately

### Returning Books
1. Go to **My Books** section
2. Find the book you want to return
3. Click the **Return** button
4. The book becomes available for others to borrow

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables, flexbox, and grid
- **Vanilla JavaScript** - No frameworks or libraries required

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Safari (latest)

### Key Features Implementation
- **Responsive Design** - CSS media queries for mobile/tablet/desktop
- **Local Storage Ready** - Easy to extend with localStorage for data persistence
- **Modular Code** - Well-organized, commented JavaScript functions
- **Accessibility** - Semantic HTML and keyboard navigation support

## 📊 Sample Data

The system comes pre-loaded with 12 sample books across various categories:
- Fiction (To Kill a Mockingbird, 1984, The Great Gatsby)
- Non-Fiction (Sapiens, Educated)
- Science (A Brief History of Time, The Selfish Gene)
- Technology (Clean Code, The Pragmatic Programmer, The Code Breaker)
- History (Guns, Germs, and Steel, The Wright Brothers)

## 🔧 Customization

### Adding More Categories
Edit the category options in both `index.html` and `script.js`:

```javascript
// In script.js, update the category filter options
<option value="your-category">Your Category</option>
```

### Changing Color Scheme
Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* Add your custom colors */
}
```

### Adjusting Borrow Period
In `script.js`, modify the `borrowBook()` function:

```javascript
dueDate.setDate(dueDate.getDate() + 30); // Change 30 to your desired days
```

## 🚀 Future Enhancements

Potential features to add:
- [ ] LocalStorage integration for data persistence
- [ ] User authentication system
- [ ] Backend API integration
- [ ] Email notifications for due dates
- [ ] Book reservation system
- [ ] Advanced search with multiple filters
- [ ] Export/Import book data (CSV/JSON)
- [ ] Dark mode toggle
- [ ] Print borrowing receipts

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Sahana Library Team**

## 🙏 Acknowledgments

- Inspired by modern library management systems
- Built with best practices in web development
- Designed for ease of use and extensibility

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@sahanalibrary.com

---

**Made with ❤️ for book lovers everywhere**

*Last Updated: January 2026*

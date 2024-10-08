import { Injectable } from '@angular/core';
import { Book } from '../models/book-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private localStorageKey = 'books';

  private bookListChangedSubject = new BehaviorSubject<Book[]>([]);
  bookList$ = this.bookListChangedSubject.asObservable();

  private filtersSubject = new BehaviorSubject<string[]>([]);
  filters$ = this.filtersSubject.asObservable();

  private filters: string[] = [];

  constructor() {}

  // Fetch the books from local storage, emit value
  getBooks(): Book[] {
    const books = localStorage.getItem(this.localStorageKey);
    this.bookListChangedSubject.next(
      books ? JSON.parse(books) : this.generateBooks()
    );

    return books ? JSON.parse(books) : this.generateBooks();
  }

  // Generate books so the list will not be empty
  private generateBooks(): Book[] {
    const books: Book[] = [
      {
        id: Date.now() + Math.random(),
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        status: 'Want to Read',
      },
      {
        id: Date.now() + Math.random(),
        title: 'In Search of Lost Time',
        author: 'Marcel Proust',
        status: 'Read',
      },
      {
        id: Date.now() + Math.random(),
        title: 'Ulysses',
        author: 'James Joyce',
        status: 'Want to Read',
      },
      {
        id: Date.now() + Math.random(),
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel García Márquez',
        status: 'Read',
      },
      {
        id: Date.now() + Math.random(),
        title: 'The Catcher in the Rye',
        author: 'J. D. Salinger',
        status: 'Read',
      },
    ];

    this.saveBooks(books);

    return books;
  }

  // Add a new book to local storage
  addBook(book: Book): void {
    let books = this.getBooks();
    books.push(book);
    this.saveBooks(books);
    books = this.getBooks();
  }

  // Update a book's status in local storage
  updateBookStatus(id: number, status: 'Read' | 'Want to Read'): void {
    const books = this.getBooks();
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      books[bookIndex].status = status;
      this.saveBooks(books);
      this.getBooks();
    }
  }

  // Delete a book from local storage
  deleteBook(id: number): void {
    let books = this.getBooks();
    books = books.filter((book) => book.id !== id);
    this.saveBooks(books);
    this.getBooks();
  }

  // Save the list of books to local storage
  private saveBooks(books: Book[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }

  setFilters(selectedFilters: string[]): void {
    this.filters = selectedFilters;
    this.filtersSubject.next(selectedFilters);
  }
}

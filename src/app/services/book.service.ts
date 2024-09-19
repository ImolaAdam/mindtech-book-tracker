import { Injectable } from '@angular/core';
import { Book } from '../models/book-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private localStorageKey = 'books';
  private filtersSubject = new BehaviorSubject<string[]>([]);
  filters$ = this.filtersSubject.asObservable();

  constructor() {}

  // Fetch the books from local storage
  getBooks(): Book[] {
    const books = localStorage.getItem(this.localStorageKey);

    return books ? JSON.parse(books) : this.generateBooks();
  }

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
    const books = this.getBooks();
    books.push(book);
    this.saveBooks(books);
  }

  // Update a book's status in local storage
  updateBookStatus(id: number, status: 'Read' | 'Want to Read'): void {
    const books = this.getBooks();
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      books[bookIndex].status = status;
      this.saveBooks(books);
    }
  }

  // Delete a book from local storage
  deleteBook(id: number): void {
    let books = this.getBooks();
    books = books.filter((book) => book.id !== id);
    this.saveBooks(books);
  }

  // Save the list of books to local storage
  private saveBooks(books: Book[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }

  setFilters(selectedFilters: string[]): void {
    this.filtersSubject.next(selectedFilters);
  }
}

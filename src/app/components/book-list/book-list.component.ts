import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book-model';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { id: 0, title: '', author: '', status: 'Want to Read' };
  filteredBooks: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
    this.filteredBooks = [...this.books]; // Initialize with all books
    console.log(this.books);

    // Subscribe to filter changes
    this.bookService.filters$.subscribe((selectedFilters) => {
      this.applyFilters(selectedFilters);
    });
  }

  getRandomColor(id: number): string {
    const colors = [
      '#FF5733',
      '#33FF57',
      '#3357FF',
      '#FF33A1',
      '#FF8C33',
      '#33FFF9',
    ];
    // Use the book's ID to consistently assign a color by using modulus
    return colors[id % colors.length];
  }

  // Method to apply filters to the book list
  applyFilters(selectedFilters: string[]): void {
    if (selectedFilters.includes('All')) {
      // If 'All' is selected, show all books
      this.filteredBooks = [...this.books];
    } else {
      // Apply filters based on selected statuses
      this.filteredBooks = this.books.filter((book) => {
        if (selectedFilters.length === 0) {
          return true; // Show all books if no filters are selected
        }
        return selectedFilters.includes(book.status);
      });
    }
  }

  addBook(): void {
    if (this.newBook.title && this.newBook.author) {
      this.newBook.id = new Date().getTime(); // Generate a unique ID based on timestamp
      this.bookService.addBook(this.newBook);
      this.books = this.bookService.getBooks();
      this.resetNewBook();
    }
  }

  updateStatus(book: Book, status: 'Read' | 'Want to Read'): void {
    this.bookService.updateBookStatus(book.id, status);
    this.books = this.bookService.getBooks();
  }

  deleteBook(book: Book): void {
    this.bookService.deleteBook(book.id);
    this.books = this.bookService.getBooks();
  }

  resetNewBook(): void {
    this.newBook = { id: 0, title: '', author: '', status: 'Want to Read' };
  }
}

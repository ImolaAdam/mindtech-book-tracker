import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book-model';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import { QuoteOfTheDayComponent } from "../quote-of-the-day/quote-of-the-day.component";

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
    MatChipsModule,
    QuoteOfTheDayComponent
],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  books: Book[] = [];

  filteredBooks: Book[] = [];
  filters: string[] = [];

  bookColors: { [key: number]: string } = {};
  colorsAssigned = false; // Flag to check if colors are assigned
  coverColors: string[] = [
    '#FFD1DC',
    '#AEC6CF',
    '#77DD77',
    '#C8A2C8',
    '#FDFD96',
    '#FFB347',
    '#B9FBC0',
    '#E3B2D2',
    '#FFDAB9',
    '#F8C6C1',
  ];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks();

    // Subscribe to book changes
    this.subs.push(
      this.bookService.bookList$.subscribe((books) => {
        this.books = books;
        this.filteredBooks = [...this.books]; // Initialize with all books
        this.applyFilters(this.filters);

        // Assign colors only once
        if (!this.colorsAssigned) {
          this.assignColors();
          this.colorsAssigned = true;
        }
      })
    );

    // Subscribe to filter changes
    this.subs.push(
      this.bookService.filters$.subscribe((selectedFilters) => {
        this.filters = selectedFilters;
        this.applyFilters(selectedFilters);
      })
    );
  }

  // Method to apply filters to the book list
  applyFilters(selectedFilters: string[]): void {
    if (selectedFilters.includes('All')) {
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

  assignColors(): void {
    this.books.forEach((book) => {
      if (!this.bookColors[book.id]) {
        this.bookColors[book.id] = this.getRandomColor();
      }
    });
  }

  // Getting a random colour index within the array's length
  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.coverColors.length);
    return this.coverColors[randomIndex];
  }

  getColor(bookId: number): string {
    return this.bookColors[bookId] || '#c8a2c8'; // Default is pastel purple
  }

  onUpdateStatus(book: Book): void {
    const newStatus = book.status === 'Want to Read' ? 'Read' : 'Want to Read';
    this.bookService.updateBookStatus(book.id, newStatus);
  }

  onDeleteBook(bookId: number): void {
    if (bookId) {
      this.bookService.deleteBook(bookId);
    }
  }

  ngOnDestroy(): void {
    if (this.subs.length) {
      this.subs.forEach((s) => s.unsubscribe());
    }
  }
}

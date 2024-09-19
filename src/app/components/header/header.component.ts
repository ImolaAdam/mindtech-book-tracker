import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateBookComponent } from '../create-book/create-book.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  //quote: string = `"I mean, it's sort of exciting, isn't it, breaking the rules?"`;
  quote: string = `It is nothing to die; it is dreadful not to live.`;
  readonly dialog = inject(MatDialog);

  filters = new FormControl<string[]>([]);
  filterList: string[] = ['All', 'Read', 'Want to Read'];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Subscribe to the filter changes
    this.filters.valueChanges.subscribe(selectedFilters => {
      this.bookService.setFilters(selectedFilters || []);
    });
  }

  // Method triggered whenever the user selects or deselects items
  onFilterChange(selectedFilters: string[]): void {
    if(selectedFilters.length != 0) {
      this.bookService.setFilters(selectedFilters);
    }
  }


  openDialog() {
    this.dialog.open(CreateBookComponent);
  }
}

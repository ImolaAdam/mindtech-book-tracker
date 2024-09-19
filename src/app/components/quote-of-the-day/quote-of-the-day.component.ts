import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-quote-of-the-day',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './quote-of-the-day.component.html',
  styleUrl: './quote-of-the-day.component.scss',
})
export class QuoteOfTheDayComponent implements OnInit {
  isQuoteAssigned = false; // Flag to check if colors are assigned
  quote: string = '';

  readonly quotes: string[] = [
    'The only way to do great work is to love what you do. — Steve Jobs',
    'In the end, we will remember not the words of our enemies, but the silence of our friends. — Martin Luther King Jr.',
    'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. — Ralph Waldo Emerson',
    'The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt',
    'You must be the change you wish to see in the world. — Mahatma Gandhi',
    'To live is the rarest thing in the world. Most people exist, that is all. — Oscar Wilde',
    "Life is what happens when you're busy making other plans. — John Lennon",
    'The journey of a thousand miles begins with one step. — Lao Tzu',
    'Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill',
    'The purpose of our lives is to be happy. — Dalai Lama',
    'Do what you can, with what you have, where you are. — Theodore Roosevelt',
    'You only live once, but if you do it right, once is enough. — Mae West',
    'The best time to plant a tree was 20 years ago. The second best time is now. — Chinese Proverb',
    'It does not matter how slowly you go as long as you do not stop. — Confucius',
    'Act as if what you do makes a difference. It does. — William James',
    'Everything you’ve ever wanted is on the other side of fear. — George Addair',
    'Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau',
    'You miss 100% of the shots you don’t take. — Wayne Gretzky',
    'The only impossible journey is the one you never begin. — Tony Robbins',
    "Believe you can and you're halfway there. — Theodore Roosevelt",
  ];

  constructor() {}

  ngOnInit(): void {
    this.quote = this.getRandomQuote(this.quotes);
  }

  // Getting random index from the quotes array (same as the cover generation on the BookList)
  getRandomQuote(quotes: string[]): string {
    if (this.isQuoteAssigned != true) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      this.isQuoteAssigned = true;
      this.quote = quotes[randomIndex];
      return this.quote;
    } else {
      return '';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

type User = {
  id: number;
  userName: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'client';
  users: User[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<User[]>('https://localhost:5001/api/users').subscribe({
      next: (value) => (this.users = value),
    });
  }
}

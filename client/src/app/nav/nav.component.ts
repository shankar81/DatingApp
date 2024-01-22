import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NgbNavModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  onLogin() {
    this.accountService.onLogin(this.model).subscribe({
      next: () => {
        this.model = {};
      },
    });
  }

  onLogout() {
    this.accountService.onLogout();
  }
}

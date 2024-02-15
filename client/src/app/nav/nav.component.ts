import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NgbNavModule, FormsModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.accountService.onLogin(this.model).subscribe({
      next: () => {
        this.model = {};
        this.router.navigateByUrl('/members');
      },
      error: (error) => {
        if (typeof error.error === 'string') this.toastr.error(error.error);
        else {
          Object.keys(error.error.errors).map((key) => {
            this.toastr.error(error.error.errors[key][0]);
          });
        }
        console.log(error);
      },
    });
  }

  onLogout() {
    this.accountService.onLogout();
    this.router.navigateByUrl('/');
  }
}

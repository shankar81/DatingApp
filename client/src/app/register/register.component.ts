import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter();

  model: any = {};

  constructor(private accoutnService: AccountService) {}

  ngOnInit(): void {}

  onRegister() {
    this.accoutnService.onRegister(this.model).subscribe({
      next: (value) => {
        console.log(value);
        this.onCancel();
      },
    });
  }

  onCancel() {
    this.cancelEvent.emit(false);
  }
}

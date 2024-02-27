import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter();

  model: any = {};
  registerFormGroup: FormGroup = new FormGroup({});

  constructor(private accoutnService: AccountService) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerFormGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.matchValues('password'),
      ]),
    });

    this.registerFormGroup.controls['password'].valueChanges.subscribe({
      next: () => this.registerFormGroup.controls['confirmPassword'].updateValueAndValidity(),
    });
  }

  matchValues(matchTo: string) {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  onRegister() {
    console.log(this.registerFormGroup.status, this.registerFormGroup.value);
    // this.accoutnService.onRegister(this.model).subscribe({
    //   next: () => {
    //     this.onCancel();
    //   },
    // });
  }

  onCancel() {
    this.cancelEvent.emit(false);
  }
}

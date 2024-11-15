import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;
  loginError: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService,private _Router:Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onRegister() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
        this.authService.signup(email, password).subscribe({
          next: (userCredential) => {
            this._Router.navigate(['/signin']);
            this.authService.saveCurrentUser();
          },
         
        })
      
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}

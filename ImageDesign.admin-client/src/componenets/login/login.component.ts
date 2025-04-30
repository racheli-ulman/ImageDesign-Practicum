import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // הוסף את השורה הזו
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,MatIconModule,
    MatCardModule,  MatError,
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule,
      MatIconModule,
      MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  addUserForm!: FormGroup;
  errormessage: string = '';  // משתנה לשמירת השגיאה
  showError: boolean = false;  // משתנה לניהול הצגת השגיאה

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}
  hide = true;

  ngOnInit(): void {
    
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const { email, password } = this.addUserForm.value; // אין יותר userGroup
  
      this.authservice.login(email, password).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
          sessionStorage.setItem('token', response.token);
          console.log("token", response.token);
          const user = response.user;
          sessionStorage.setItem('userId', response.user.id);
          this.router.navigate(['/home']);

        },
        error: (err) => {
          if (err.status === 400) {
            this.errormessage = 'Invalid credentials';
          } else if (err.status === 401) {
            this.errormessage = 'only admin can login';
          } else {
            console.log("err.status", err.status);
            this.errormessage = 'An unexpected error occurred';
          }
          this.showError = true;
        }
      });
    } else {
      this.errormessage = 'Please fill in all fields correctly.';
      this.showError = true;
    }
  }
  
}

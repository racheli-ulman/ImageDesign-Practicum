import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  registerForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;

      const newUser = { firstName, lastName, email, password, role: 'User' };
      this.userService.addUser(newUser).subscribe({
        next: () => {
          this.router.navigate(['/home/show-users']);
        },
        error: (err) => {
          this.error = 'Registration failed. Please try again.';
          console.error(err);
        }
      });
    } else {
      this.error = 'Please fill in all fields correctly.';
    }
  }
}

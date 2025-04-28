import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-show-users',
  imports: [CommonModule],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.css'
})
export class ShowUsersComponent {
  users: any[] = [];
  studentcourses: any[] = [];
  errorMessage: string = '';
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  console.log("show-users component", this.users);
  
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses';
        console.error(error);
      }
    });
    // this.loadUsersesByStudent()
  }
  delete(id: number) {
    this.userService.deleteUser(id.toString()).subscribe({
      next: (data) => {

        this.users = this.users.filter(u => u.id != id);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses';
        console.error(error);
      }
    });;

   }
  // editCourse(id: number) {
  //   this.router.navigate(['/edit-course', id]);
  // }



  // showLesson(id: number) {
  //   this.router.navigate(['/show-lesson', id])
  // }
  // loadUsersesByStudent(): void {
  //   const studentId = localStorage.getItem('userId');
    
  //   if (studentId) {
  //     this.coursesService.getStudentCourses(studentId).subscribe({
  //       next: (data) => {
  //         this.studentcourses = data;  
  //       },
  //       error: (error) => {
  //         console.error('Error fetching student courses:', error);
  //       }
  //     });
  //   }
  // }

  
}

import { Component } from '@angular/core';
import { Photo } from '../../models/photo';
import { PhotosService } from '../../services/photos.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // הוספת ייבוא של MatCardModule


@Component({
  selector: 'app-photos',
  imports: [MatCardModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {
photos: Photo[] = [];
  errorMessage: string = '';
  constructor(private photoService: PhotosService, private router: Router) {
  }

  ngOnInit(): void {
  console.log("show-users component", this.photos);
  
    this.photoService.getAllPhotos().subscribe({
      next: (data) => {
        this.photos = data;
        console.log("photos", this.photos.length);
        
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses';
        console.error(error);
      }
    });
    // this.loadUsersesByStudent()
  }
}

import { Component } from '@angular/core';
import { Photo } from '../../models/photo';
import { PhotosService } from '../../services/photos.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // הוספת ייבוא של MatCardModule
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts'; // ייבוא המודול


@Component({
  selector: 'app-photos',
  imports: [MatCardModule, NgChartsModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {
  // photos: Photo[] = [];
  // deletedPhotos: Photo[] = []; // משתנה חדש לתמונות מחוקות
  // errorMessage: string = '';
  //   constructor(private photoService: PhotosService, private router: Router) {
  //   }

  //   ngOnInit(): void {
  //     this.loadPhotos();
  //     this.loadDeletedPhotos(); // קריאה לתמונות מחוקות
  //   }

  //   loadPhotos(): void {
  //     this.photoService.getAllPhotos().subscribe({
  //       next: (data) => {
  //         this.photos = data;
  //         console.log("photos", this.photos.length);
  //       },
  //       error: (error) => {
  //         this.errorMessage = 'Failed to load photos';
  //         console.error(error);
  //       }
  //     });
  //   }

  //   loadDeletedPhotos(): void {
  //     this.photoService.getDeletedPhotos().subscribe({
  //       next: (data) => {
  //         this.deletedPhotos = data; // שמירת התמונות המחוקות
  //       },
  //       error: (error) => {
  //         this.errorMessage = 'Failed to load deleted photos';
  //         console.error(error);
  //       }
  //     });
  //   }

  //   getAbsoluteDifference(): number {
  //     return Math.abs(this.deletedPhotos.length - this.photos.length);
  //   }
  // }
  
  photos: Photo[] = [];
  deletedPhotos: Photo[] = [];
  errorMessage: string = '';
  
  // נתוני גרף
  pieChartData: ChartData<'pie'> = {
    labels: ['Active Photos', 'Deleted Photos', 'Difference'],
    datasets: [
      {
        data: [0, 0, 0], // ערכים ראשוניים
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'], // צבעים
      },
    ],
  };

  // הגדרת אפשרויות לגרף
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  constructor(private photoService: PhotosService, private router: Router) {}

  ngOnInit(): void {
    this.loadPhotos();
    this.loadDeletedPhotos();
  }

  loadPhotos(): void {
    this.photoService.getAllPhotos().subscribe({
      next: (data) => {
        this.photos = data;
        this.updateChartData();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load photos';
        console.error(error);
      }
    });
  }

  loadDeletedPhotos(): void {
    this.photoService.getDeletedPhotos().subscribe({
      next: (data) => {
        this.deletedPhotos = data;
        this.updateChartData();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load deleted photos';
        console.error(error);
      }
    });
  }

  getAbsoluteDifference(): number {
    return Math.abs(this.deletedPhotos.length - this.photos.length);
  }

  updateChartData(): void {
    const difference = this.getAbsoluteDifference();
    this.pieChartData.datasets[0].data = [
      this.photos.length,
      this.deletedPhotos.length,
      difference,
    ];
  }
}
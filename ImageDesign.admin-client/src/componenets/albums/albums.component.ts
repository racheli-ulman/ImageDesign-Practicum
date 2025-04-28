import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Router } from '@angular/router';
import { Album } from '../../models/album';
import { MatCardModule } from '@angular/material/card'; // הוספת ייבוא של MatCardModule


@Component({
  selector: 'app-albums',
  imports: [MatCardModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent {
albums: Album[] = [];
  errorMessage: string = '';
  constructor(private albumService: AlbumService, private router: Router) {
  }

  ngOnInit(): void {
  console.log("show-users component", this.albums);
  
    this.albumService.getAllAlbums().subscribe({
      next: (data) => {
        this.albums = data;
        console.log("albums", this.albums.length);
        
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses';
        console.error(error);
      }
    });
    // this.loadUsersesByStudent()
  }
}

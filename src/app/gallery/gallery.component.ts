import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebSiteType } from '../appointment/models/website-type.enum';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationService } from '../appointment/services/application.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent  implements OnInit {

  websiteType: WebSiteType = environment.websiteType;
  events: any[] = [];
  images: any[] = [];
  filteredImages: any[] = [];
  selectedImage: any = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient,
    private websideService: ApplicationService
  ) {}

  ngOnInit() {
    this.fetchGalleryData();
  }

  fetchGalleryData(): void {
    this.websideService.getGalleryData(this.websiteType).subscribe({
      next: (response) => {
        this.events = response.events;
        this.images = response.images;
        this.filteredImages = this.images;
      },
      error: (error) => {
        console.error('Error fetching gallery data:', error);
        this.errorMessage = 'Failed to load gallery data.';
      },
    });
  }
  // Filter images by event type
  filterImages(type: string) {
    this.filteredImages = this.images.filter((image) => image.type === type);
  }

  // Open slider
  openSlider(image: any) {
    this.selectedImage = image;
  }

  // Close slider
  closeSlider() {
    this.selectedImage = null;
  }

  // Previous image in slider
  previousImage() {
    const index = this.filteredImages.indexOf(this.selectedImage);
    this.selectedImage = 
      index === 0 ? this.filteredImages[this.filteredImages.length - 1] : this.filteredImages[index - 1];
  }

  nextImage() {
    const index = this.filteredImages.indexOf(this.selectedImage);
    this.selectedImage = 
      index === this.filteredImages.length - 1 ? this.filteredImages[0] : this.filteredImages[index + 1];
  }
}

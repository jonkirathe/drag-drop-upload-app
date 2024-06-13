import {
  Component,
  computed,
  EventEmitter,
  output,
  Output,
  signal,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'upload',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="mb-5">
      <h3 class="text-center">Upload Image</h3>
      <div>
        <mat-card class="bg-white border border-2 rounded shadow">
          <mat-card-content>
            <div
              mat-raised-button
              matBadge="{{ imageCount() }}"
              matBadgePosition="before"
              class="drop-zone"
              (dragover)="onDragOver($event)"
              (drop)="onDrop($event)"
            >
              <p>Drag and drop images here</p>
            </div>

            <div class="mt-2 d-flex justify-between gap-4">
              <input
                class="form-control "
                type="file"
                (change)="handleFileInput($event)"
                multiple
              />
              <button
                mat-raised-button
                color="primary"
                (click)="uploadImages()"
              >
                <i class="fa-solid fa-cloud-arrow-up">Upload</i>
              </button>
            </div>
          </mat-card-content>
          <mat-card-actions> </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [''],
})
export class UploadComponent {
  uploadedImagesChange = output<{ url: string }[]>();
  uploadedImages = signal<{ url: string }[]>([]);

  imageCount = computed(() => this.uploadedImages().length);

  handleFileInput(event: any): void {
    const files: FileList = event.target.files || event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files: FileList | undefined = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  handleFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImages.update((images) => [
          ...images,
          { url: e.target.result },
        ]);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  uploadImages(): void {
    // Implement your image upload logic here (e.g., send to server)
    this.uploadedImagesChange.emit(this.uploadedImages());
  }
}

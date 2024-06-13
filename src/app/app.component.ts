import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { PreviewComponent } from './components/preview/preview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadComponent, PreviewComponent],
  template: `
    <div class="container p-5">
      <upload (uploadedImagesChange)="onUploadedImagesChange($event)"></upload>
      @defer (on viewport) {
      <!-- <preview [previewTemplate]="imagePreviewTemplate" [images]="images()"> -->
      <preview [images]="images()">
        <h3 class="text-center">Beautiful Draggable Images Preview</h3>
        <ng-template #imagePreviewTemplate let-title let-name="name">
          <div class="text-center">
          <h2>{{title}}</h2>
          <h4>{{name}}</h4>
          </div>
        </ng-template>
      </preview>
      } @placeholder {
      <h2 class="text-center">multiple images</h2>
      } @loading (minimum 1s) {
      <h2 class="text-center">loading...</h2>
      }
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  images = signal<{ url: string }[]>([]);

  ngOnInit(): void {}

  onUploadedImagesChange(uploadedImages: { url: string }[]): void {
    this.images.set(uploadedImages);
  }
}

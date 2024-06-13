import { CdkDrag } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'preview',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    CdkDrag,
    MatFormField,
  ],
  template: `
    <ng-content></ng-content>
    <ng-container
    *ngTemplateOutlet="previewTemplate() || defaultTemplate; context: { $implicit: title, name: 'My Image' }"
    >
    </ng-container>
    <ng-template #defaultTemplate>
      <mat-card class="bg-white border border-2 rounded shadow">
        <mat-card-content>
          <div class="row m-2 justify-content-center">
            @for (image of images(); track $index) {
            <div class="box col-auto m-2 bg-transparent" cdkDrag>
              <img
                [src]="image.url"
                height="200"
                width="200"
                class="img-fluid"
              />
            </div>
            }
          </div>
        </mat-card-content>
      </mat-card>
    </ng-template>
  `,
  styles: [],
})
export class PreviewComponent {
  title = 'Custom Template';
  previewTemplate = input<TemplateRef<any> | null>(null);
  images = input<{ url: string }[]>([]);
}

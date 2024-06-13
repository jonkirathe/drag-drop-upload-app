
import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';

interface User {
  id: number;
  name: string;
  email: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'drag-drop-upload-app';
  private users = signal<User[]>([]);
  userCount = computed(() => this.users().length);

  ngOnInit(): void {
     this.users.set([{ id: 1, name: 'john', email: 'john@mail.com' }]);

    this.users.update((users: User[]) => [
      ...users,
      { id: 2, name: 'john2', email: 'john2@mail.com' },{ id: 3, name: 'john', email: 'john@mail.com' }
    ]);

    this.users.update((users: User[]) =>
      users.map((user) => {
        if (user.id === 1) {
          user.email = 'j@mail.com';
        }
        return user;
      })
    );

    console.log('userCount: ', this.userCount());

    const showCount = signal(true);
    const count = signal(10);
    const conditionalCount = computed(() => {
      if (showCount()) {
        return `The count is ${count()}.`;
      } else {
        return 'Nothing to see here!';
      }
    });

    console.log('conditionalCount: ', conditionalCount()); 
  }
}

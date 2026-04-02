import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Post as PostModel } from '../../../../core/models/post.model';

@Component({
  selector: 'app-social-post',
  imports: [DatePipe],
  templateUrl: './post.html',
  styleUrl: './post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class Post {
  readonly post = input.required<PostModel>();
  readonly isEditing = input.required<boolean>();
  readonly isAuthenticated = input.required<boolean>();
  readonly currentUserName = input<string | undefined>();

  readonly editClicked = output<PostModel>();
  readonly deleteClicked = output<string>();
  readonly likeClicked = output<string>();
  readonly dislikeClicked = output<string>();

  onEdit(): void {
    this.editClicked.emit(this.post());
  }

  onDelete(): void {
    this.deleteClicked.emit(this.post().id);
  }

  onLike(): void {
    this.likeClicked.emit(this.post().id);
  }

  onDislike(): void {
    this.dislikeClicked.emit(this.post().id);
  }

  canEditOrDelete(): boolean {
    return this.currentUserName() === this.post().authorName;
  }
}

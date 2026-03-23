import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SMPostModel } from '../../models/SMPostModel';

@Component({
  selector: 'app-social-media-post',
  imports: [],
  templateUrl: './social-media-post.html',
  styleUrl: './social-media-post.scss',
})
export class SocialMediaPost {

  @Input() postData: SMPostModel | undefined;
  @Output() postLiked = new EventEmitter<number>();

  likePost() {
    if (this.postData) {
      this.postLiked.emit(this.postData.id);
    } else {
      console.error('Post data is undefined');
    } 
  }
}

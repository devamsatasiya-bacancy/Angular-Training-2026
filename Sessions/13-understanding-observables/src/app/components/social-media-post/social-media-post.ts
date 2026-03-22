import { Component, Input } from '@angular/core';
import { SMPostModel } from '../../models/SMPostModel';

@Component({
  selector: 'app-social-media-post',
  imports: [],
  templateUrl: './social-media-post.html',
  styleUrl: './social-media-post.scss',
})
export class SocialMediaPost {

  @Input() postData: SMPostModel | undefined;
}

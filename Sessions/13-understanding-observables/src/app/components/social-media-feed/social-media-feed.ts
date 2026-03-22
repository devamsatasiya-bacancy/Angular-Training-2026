import { Component, OnInit, signal } from '@angular/core';
import { SocialMediaPost } from '../social-media-post/social-media-post';
import { SMPostModel } from '../../models/SMPostModel';
import { concatMap,of ,from, Observable, delay, tap } from 'rxjs';

@Component({
  selector: 'app-social-media-feed',
  imports: [SocialMediaPost],
  templateUrl: './social-media-feed.html',
  styleUrl: './social-media-feed.scss',
})
export class SocialMediaFeed implements OnInit {
stopRefreshing() {
  this.isFeedRereshing.set(false);
}
  socialMediaPostsData: SMPostModel[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
      likes: 10,
      comments: 2,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the content of the second post.',
      likes: 20,
      comments: 5,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Third Post',
      content: 'This is the content of the third post.',
      likes: 30,
      comments: 8,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      title: 'Fourth Post',
      content: 'This is the content of the fourth post.',
      likes: 40,
      comments: 10,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      title: 'Fifth Post',
      content: 'This is the content of the fifth post.',
      likes: 50,
      comments: 12,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      title: 'Sixth Post',
      content: 'This is the content of the sixth post.',
      likes: 60,
      comments: 15,
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  socialMediaPosts = signal<SMPostModel[]>([]);

  isFeedRereshing = signal<boolean>(true);

  i = 0;
  socialMediaPosts$ = new Observable<SMPostModel>((subscriber) => {
    for (let smpost of this.socialMediaPostsData) {
      this.i = this.i + 1;
      console.log(this.i);

      if (!this.isFeedRereshing()) {
        subscriber.complete();
      } else {
        setTimeout(() => {
          subscriber.next(smpost);
        }, 2000 * this.i);
      }
    }
  });

  
  // socialMediaPosts$ = from(this.socialMediaPostsData).pipe(concatMap((post) => {

  //   if (!this.isFeedRereshing()) {
  //     return of().pipe(tap(() => console.log("Feed refreshing stopped. No more posts will be emitted.")));
  //   }
  //   return of(console.log(post)).pipe(delay(2000) , tap( val => console.log("Emitted value: ", val)
  // ));
  // }));
  ngOnInit(): void {
    this.socialMediaPosts$.subscribe({
      next: (data) => {
        if(data !== undefined){
          this.socialMediaPosts.update((posts) => {return [...posts , data]});  
        }
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => console.info('complete'),
    });
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { SocialMediaPost } from '../social-media-post/social-media-post';
import { SMPostModel } from '../../models/SMPostModel';
import { concatMap, of, from, Observable, delay, tap, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-social-media-feed',
  imports: [SocialMediaPost],
  templateUrl: './social-media-feed.html',
  styleUrl: './social-media-feed.scss',
})
export class SocialMediaFeed {
  subsriber1: Subscription | undefined;
  updatePostLikes(id: number) {
    this.socialMediaPosts.update((posts) => {
      return posts.map((post) => {
        if (post.id === id) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
    });
  }

  getTotalLikes(): number {
    return this.socialMediaPosts().reduce((total, post) => total + post.likes, 0);
  }

  toastMessage = signal<string>('');
  socialMediaPosts = signal<SMPostModel[]>([]);

  isFeedRereshing = signal<boolean>(false);

  i = 1;
  socialMediaPosts$ = new Observable<SMPostModel>((subscriber) => {
    const intervalId = setInterval(() => {
      if (!this.isFeedRereshing()) {
        //subscriber.complete();
        console.log('Feed refreshing stopped. No posts will be emitted now.');
        clearInterval(intervalId);
        return;
      } else {
        const post: SMPostModel = {
          id: this.i,
          content: `This is post number ${this.i} ${new Date().toLocaleTimeString()}`,
          likes: this.i,
          comments: this.i *2,
          title: `Post Title ${this.i}`,
        };
        subscriber.next(post);
        console.log('Emitted value: ', post);
        this.i++;
      }
    }, 2000);
  });

  /* this method starts subscribing to the observable type SMPostModel */
  startSubscribing(observer: Observable<SMPostModel>): Subscription {
    return observer.subscribe({
        next: (data) => {
          if (data !== undefined) {
            this.socialMediaPosts.update((posts) => {
              return [data,...posts, ];
            });
          }
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => console.info('complete'),
      });
  }
  toggleRefreshing() {
    console.log('TOGGLE TRIGGERED');
    if (!this.isFeedRereshing()) {
      this.isFeedRereshing.set(true);
      this.toastMessage.set('Feed refreshing started. New posts will be emitted every 2 seconds.');
      this.subsriber1 = this.startSubscribing(this.socialMediaPosts$);

    } else {

      this.isFeedRereshing.set(false);
      this.toastMessage.set('Feed refreshing stopped. No more posts will be emitted.');
      if (this.subsriber1) {
        this.subsriber1.unsubscribe();
      }
    }

    // socialMediaPosts$ = from(this.socialMediaPostsData).pipe(concatMap((post) => {

    //   if (!this.isFeedRereshing()) {
    //     return of().pipe(tap(() => console.log("Feed refreshing stopped. No more posts will be emitted.")));
    //   }
    //   return of(console.log(post)).pipe(delay(2000) , tap( val => console.log("Emitted value: ", val)
    // ));
    // }));
  }
}

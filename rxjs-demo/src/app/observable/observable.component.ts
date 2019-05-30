import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.firstObservable();
    this.asyncObservable();
    this.clearObservable();
  }

  // first Observable case
  firstObservable() {
    const observable = Observable.create(function (observer) {
      observer.next(1);
    });
    observable.subscribe({
      next: x => console.log('值：' + x),
      error: err => console.error('报错：' + err),
      complete: () => console.log('结束')
    });
  }

  // async Observable
  asyncObservable() {
    const observable = Observable.create(function (observer) {
      setTimeout(() => {
        observer.next(1);
      }, 3000 );
    });
    console.log('before subscribe');
    observable.subscribe({
      next: x => console.log('值：' + x),
      error: err => console.error('报错：' + err),
      complete: () => console.log('结束')
    });
    console.log('after subscribe');
  }

  // clear Observable
  clearObservable() {
    const observable = Observable.create(function (observer) {
      setTimeout(() => {
        observer.next(1);
      }, 3000 );
    });
    const subscriber = observable.subscribe({
      next: x => console.log('值：' + x),
      error: err => console.error('报错：' + err),
      complete: () => console.log('结束')
    });

    subscriber.unsubscribe(); // 这句就是清除一个可观察对象
  }

}

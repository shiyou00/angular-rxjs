import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.subjectInObservable();
  }

  observableFn() {
    const observable = Observable.create(function subscribe(observer) {
      try {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
      } catch (err) {
        observer.error(err);
      }
    });
    observable.subscribe(val => {
      console.log('第一个监听者：', val );
    });

    setTimeout(() => {
      observable.subscribe(val => {
        console.log('第二个监听者：', val );
      });
    }, 3000);
  }

  subjectFn() {
    const subject = new Subject();
    // 监听数据
    subject.subscribe({
      next: (v) => {
        console.log(`监听者1：` + v );
      }
    });

    subject.subscribe({
      next: (v) => {
        console.log(`监听者2：` + v );
      }
    });

    setTimeout(() => {
      subject.subscribe({
        next: (v) => {
          console.log(`监听者3：` + v );
        }
      });
    }, 3000 );

    // 推送数据
    subject.next(1);
    subject.next(2);
    subject.next(3);
    setTimeout(() => {
      subject.next(4);
    }, 4000 );
  }

  subjectInObservable() {
    const observable = Observable.create(function (observer) {
      observer.next(1);
    });

    const subject = new Subject();

    subject.subscribe({
      next: (v) => {
        console.log( '监听者1：' + v );
      }
    });
    // 这里其实就是会调用subject的next方法，向subject管道里面注入一股数据1，此时我们只需要监听以下subject就可以获取到数据1
    observable.subscribe(subject);
  }
}

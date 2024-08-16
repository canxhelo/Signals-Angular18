import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

@Component({
  selector: 'lessons',
  standalone: true,
  imports: [
    LessonDetailComponent
  ],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent {
  mode=signal<'master'|'detail'>("master");
  lessons=signal<Lesson[]>([]);
  selectedLesson=signal<Lesson|null>(null);

  //this is a signal based view child , it takes the reference on the template variable
  //elementRef eshte nje type per te deretminuar elemente htmlje
  searchInput=viewChild.required<ElementRef>('search'); //kujdes sepse eshte optional shto required
  // ben edhe query components gjithashtu

  lessonService=inject(LessonsService);


  async onSearch() {
    //morrem vleren e nje elementi html ne ts me signal viewChild dhe kombinohet me signals e tjere
    const query=this.searchInput()?.nativeElement.value
    const response =await  this.lessonService.loadLessons({query});
    this.lessons.set(response);


  }

  onLessonSelected(lesson:Lesson) {
    this.mode.set('detail');
    this.selectedLesson.set(lesson);
  }

  onCancel() {
    this.mode.set('master');
    this.selectedLesson.set(null);
  }

  onLessonUpdated(lesson: Lesson) {
   this.lessons.update(lessons=>
   lessons.map(l=>l.id===lesson.id ? lesson:l));
    this.mode.set('master');


  }

  //kujdes shikoje mir pjesen e mapit
}

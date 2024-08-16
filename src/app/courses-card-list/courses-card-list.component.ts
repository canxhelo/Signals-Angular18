import {Component, inject, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";

@Component({
  selector: 'courses-card-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
  dialog=inject(MatDialog);
courses=input.required<Course[]>({
  alias:"data",
  // transform:  eshte nje pure function dhe i ben transform datave qe vijne per setter dhe getters dhe mund te mos kesh required inputs
});
coursesUpdated= output<Course>()
courseDeleted=output<string>();
//me ndryshimet qe bem tani na vjen si nje promise
  async onEditCourse(course: Course) {
   const newCourse = await openEditCourseDialog(
     this.dialog,{
       mode:'update',
       title:'Update Existing Course',
       course:course,
     }
   )
    console.log(`course edited `, newCourse)
    this.coursesUpdated.emit(newCourse)
}

  onCourseDelete(course: Course) {
    this.courseDeleted.emit(course.id)
  }
}

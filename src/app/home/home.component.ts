import {afterNextRender, Component, computed, effect, inject, Injector, signal, WritableSignal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";
import {CoursesServiceWithFetch} from "../services/courses-fetch.service";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";
import {LoadingService} from "../loading/loading.service";

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  #courses=signal<Course[]>([]) //# e ben qe te mos jet directly used by the template dhe e ben private property
  courseService =inject(CoursesService);
  dialog=inject(MatDialog);
  beginnerCourses=computed(()=>{
    //IMpoetant workflow ne top define signals qe do qe te ndryshojne sa here qe ndryshon signali
    const courses= this.#courses();
    return courses.filter((course)=>course.category==="BEGINNER")

  })


  advanceCourses=computed(()=>{
    const courses= this.#courses();
    return courses.filter((course)=>course.category==="ADVANCED")

  })

    messageService=inject(MessagesService);



  constructor() {
    effect(() => {
      // console.log(`beginnerCourses`,this.beginnerCourses());
      // console.log(`Advanced Courses`,this.advanceCourses());
    });

  afterNextRender(()=>{ //new lifecycle to read more about it
  this.loadCourses().then(()=>{ //behet then ktu per te prevent error from the typescript sepse eshte nje async
    // console.log("HomeComponent loaded",this.#courses());
  })
})

  }

  async loadCourses(){
    try {
      const courses = await this.courseService.loadAllCourses() //await pret per promise to be resolved
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    }
    catch (err){
      this.messageService.showMessage(
        'Error loading courses.',
        "error"
      )

      console.error(err)

    }

  }

//llogika per te marre kurset e rinj dhe per te mos ber fetch api tjeter por te mbajme ato qe kemi ndryshuar dhe tenderrohen ne UI
  onCourseUpdated(updatedCourse: Course) {
    const courses=this.#courses();
    const newCourses=courses.map(course=>course.id===updatedCourse.id?updatedCourse:course);
    this.#courses.set(newCourses)


  }

 async  onCourseDelete(courseId: string) {
try {
 const response =await this.courseService.deleteCourse(courseId);
 const courses=this.#courses();
 const newCourses=courses.filter(course=>course.id!==courseId)
  this.#courses.set(newCourses);

}
catch(error){
  console.error(error)
}
  }
// try allways to create a new array
 async onCourseCreate() {
  const newCourse =await  openEditCourseDialog(this.dialog,{
      mode:"create",
      title:"Create Course",
    })
   const newCourses:Course[]=[...this.#courses(),newCourse]
   this.#courses.set(newCourses);
  }

}

import {Component, effect, inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../models/course.model";
import {EditCourseDialogData} from "./edit-course-dialog.data.model";
import {CoursesService} from "../services/courses.service";
import {LoadingIndicatorComponent} from "../loading/loading.component";
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CourseCategoryComboboxComponent} from "../course-category-combobox/course-category-combobox.component";
import {CourseCategory} from "../models/course-category.model";
import {first, firstValueFrom} from "rxjs";

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {
dialogRef=inject(MatDialogRef);
data:EditCourseDialogData=inject(MAT_DIALOG_DATA)
  fb=inject(FormBuilder)
courseService=inject(CoursesService)
  form=this.fb.group({
    title:[''],
    longDescription:[''],
    category:[''],
    iconUrl:['']
  })

  constructor() {
  this.form.patchValue({
    title:this.data?.course?.title,
    longDescription: this.data?.course?.longDescription,
    category: this.data?.course?.category,
    iconUrl:this.data?.course?.iconUrl,

  })
  }

  onClose() {
this.dialogRef.close({title:'HEllo worls'});
  }


  async onSave() {
     const courseProps=this.form.value as Partial<Course>;
     if(this.data.mode==='update'){
       await this.saveCourse(
          this.data?.course!.id, //! i tell the compiler that im sure that the id wont miss even that it is optional
          courseProps
        )
     }
     else if(this.data?.mode==="create"){
       this.createCourse(courseProps)
     }

  }
  //behet vec qe te kalosh error handeling logic
  async saveCourse( courseId:string ,course:Partial<Course>){
  try {
   const updatedCourse=await  this.courseService.saveCourse(courseId,course)
      this.dialogRef.close(updatedCourse);

  }
catch(error){
    console.error(error)
  alert('FAIL')
}

  }

  async createCourse(course:Partial<Course>){
  try {

    const addedCourse=await this.courseService.createCourse(course)
    this.dialogRef.close(addedCourse);
  }
  catch (err){
    console.error(err)
  }
  }



}








//funksion qe perdoret per te hapur dialon nga kudo
//perdoret async ne menyre qe kur te behet save si dialog te kthej nje promise qe te marrim vesh ca eshte bere
export  async function openEditCourseDialog(dialog:MatDialog,
                                     data:EditCourseDialogData,
){
const config=new MatDialogConfig();
config.disableClose = true;
config.autoFocus = true;
config.width = "400px";
config.data = data;

 //emit value kur behet close si dialog
const close$=dialog.open(
  EditCourseDialogComponent,config).afterClosed();

return firstValueFrom(close$)




}

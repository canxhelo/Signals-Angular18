import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Lesson} from "../models/lesson.model";
import {LessonsService} from "../services/lessons.service";
import {inject} from "@angular/core";


 export const lessonResolver:ResolveFn<Lesson[]>=
 async (route:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>{

  const lessonsService=inject(LessonsService)
   const courseId=route.paramMap.get('courseId')
   if(!courseId){
     return []
     }
   else{
     return lessonsService.loadLessons({courseId})
   }


  }

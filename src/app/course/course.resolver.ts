import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Course} from "../models/course.model";
import {CoursesService} from "../services/courses.service";
import {inject} from "@angular/core";


export const courseResolver:ResolveFn<Course|null> =
//me async na ben return nje promise
  async (route:ActivatedRouteSnapshot,
         state:RouterStateSnapshot)=>{
 //retrive the params id from the router
  const courseId=route.paramMap.get('courseId');
  const coursesService=inject(CoursesService);

//prevent the cases when it misses
  if(!courseId){
    return null;
  }
  else{
    return  coursesService.getCourseById(courseId)
  }



}

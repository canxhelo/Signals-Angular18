import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Course} from "../models/course.model";


@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {

  env = environment;

  async loadAllCourses():Promise<Course[]>{
    const response= await fetch(`${this.env.apiRoot}/courses`);
    const payload = await  response.json();
    return payload.courses;
  }


  //logic per add course  Partial is used when model is missing some data
  async createCourse(course:Partial<Course>):Promise<Course>{

    const response = await fetch(`${this.env.apiRoot}/courses`, {
      method: "POST",
      headers:{"Content-Type":"application/json"}, // httpClient angular this content type is filled automatically
       body:JSON.stringify(course)
    })
    return  response.json(); // jsonin qe kthen promise rdhe i ben resollve me await
  }


  // behet me partial per te bere update vetem nje property nese duam
  async saveCourse(courseId:string,course:Partial<Course>):Promise<Course>{
    const response= await fetch(`${this.env.apiRoot}/courses${courseId}`, {
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(course)
    })
    return  response.json();
  }


  async deleteCourse(courseId:string):Promise<void>{
    const response= await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
      method:"DELETE",

    })

  }


}

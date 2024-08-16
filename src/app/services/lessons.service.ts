import {inject, Injectable} from "@angular/core";
import {Lesson} from "../models/lesson.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {GetLessonsResponse} from "../models/get-lessons.response";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  env = environment;

  http=inject(HttpClient);

  async loadLessons(config:{
    courseId?:string,
    query?:string,
  }):Promise<Lesson[]>{
    const { courseId,query } = config;
    let params=new HttpParams();
    if(courseId){
     params= params.set("courseId",courseId);
    }
    if(query){
      params= params.set("query",query);
    }

    const lesions$=this.http.get<GetLessonsResponse>(`${environment.apiRoot}/search-lessons`
    ,{params:params})
    const response =await firstValueFrom(lesions$);
    return response.lessons
  }

  async saveLesson(lessonId:string,lesson:Partial<Lesson>):Promise<Lesson>{
    const newLesson$=this.http.put<Lesson>(`${environment.apiRoot}/lessons/${lessonId}`,lesson)
    return firstValueFrom(newLesson$)
  }



}

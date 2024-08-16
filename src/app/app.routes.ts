import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {userAuthentificate} from "./services/auth.guard";
import {CourseComponent} from "./course/course.component";
import {courseResolver} from "./course/course.resolver";
import {lessonResolver} from "./course/lesson.resolver";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[userAuthentificate]
  },
  {
    'path':'courses/:courseId',
    component: CourseComponent,
    canActivate:[userAuthentificate],
    resolve:{
      course:courseResolver,
      lessons:lessonResolver
  }

  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

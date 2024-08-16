import {HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {LoadingService} from "../loading/loading.service";
import {finalize} from "rxjs";
import {SkipLoading} from "../loading/skip-loading.component";

// me inject ben DI everywhere doesnt matter class or const or fn
export const loadingInterceptor:HttpInterceptorFn=
  (req:HttpRequest<unknown>, next:HttpHandlerFn)=>{
  //requesti i pare eshte req qe po bejme ndersa next eshte pas modifikimit tone dhe eshte function qe behet call
    const loadingService=inject(LoadingService)
if(req.context.get(SkipLoading)){
  return next(req)
}
else {

  loadingService.loadingOn();
//continue the http chai ne requestin qe ne kemi nisur  kujdes eshte observable
//finalize na ndan nese req eshte successfull or not
  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff()
    })
  )
}




  }

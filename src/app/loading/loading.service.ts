import {Injectable, signal} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
    //private property pa pasur nevoje per ta bere private
    #loadingSignal=signal(false)
    loading=this.#loadingSignal.asReadonly()


  loadingOn(){
    this.#loadingSignal.set(true)
  }

  loadingOff(){
    this.#loadingSignal.set(false)
  }
}

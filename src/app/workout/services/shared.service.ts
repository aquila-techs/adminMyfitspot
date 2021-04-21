import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public sendWorkoutData = new Subject<any>();

    sendMessage(message: any) {
        this.sendWorkoutData.next(message);
    }

    clearMessages() {
        this.sendWorkoutData.next();
    }

    getMessage(): Observable<any> {
        return this.sendWorkoutData.asObservable();
    }
}

import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {error} from "util";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService: AngularFireAuth) {
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.auth.signInWithEmailAndPassword(email, password)
        .then(datos => resolve(datos),
          error => reject(error));
    });
  }

  getauth() {
    return this.authService.authState.pipe(
      map( auth => auth)
    );
  }

  logout(){
    this.authService.auth.signOut();
  }
}

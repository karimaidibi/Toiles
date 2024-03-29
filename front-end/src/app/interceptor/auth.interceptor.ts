import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  /*en parametre :
    - request : la requete
    - next : lancer la requete après modification*/
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // recuperer le token a verifier
    const token = this.auth.token
    /*refaire la requete en créant une nouvelle requete
      - Dans la nouvelle requete on modifie son header*/
    const newRequest = request.clone({
      headers: request.headers.set('Authorization','Bearer '+token)
    })
    return next.handle(newRequest);
  }
}

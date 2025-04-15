import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHandler } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";
import { TranslocoService } from "@ngneat/transloco";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  token: any = "";

  username = "ILMSAPIUSER";
  password = "ILMSAPIUSER$123";
  authorizationData = "Basic " + btoa(this.username + ":" + this.password);

  constructor(private translocoService: TranslocoService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("token");
    let authHeader = token && token !== "null" ? `Bearer ${token}` : "";

    const modifiedReq = req.clone({
      headers: req.headers
        .set("Authorization", authHeader)
        .set("Accept-Language", this.translocoService.getActiveLang())
        .set("isRefreshToken", "true"),
    });

    return next.handle(modifiedReq);
  }
}

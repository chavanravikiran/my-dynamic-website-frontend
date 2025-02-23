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
    if (this.token == null || this.token == "") {
      this.token = "";
    } else {
      this.token = localStorage.getItem("token");
    }
    // req = req.clone({
    //   setHeaders: {
    //     // username: "ILMSUSER",
    //     // password: "ILMS@1234",
    //     // // auth_matcher_url: "http://localhost:38080/api/**"
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + this.token,
    //   },
    // });
    req = req.clone({
      headers: req.headers
        .append(
          "Authorization",
          localStorage.getItem("token") != null && localStorage.getItem("token") != "null"
            ? "Bearer " + localStorage.getItem("token")
            : ""
        )
        .append("Accept-Language", this.translocoService.getActiveLang())
        .append("isRefreshToken", "true"),
    });
    // req = req.clone({
    //   headers: req.headers
    //     .append("Content-Type", "application/json")
    //     .append("Accept", "application/json")
    //     .append("Authorization", "Bearer " + this.token),
    // });
    return next.handle(req);
  }
}

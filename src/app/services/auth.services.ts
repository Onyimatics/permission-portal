import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, interval } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Auth } from "../models/auth";
import { Token } from "../models/auth";

const AUTH_TOKEN = "AUTH_TOKEN";
// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  getAuthToken(): string {
    return sessionStorage.getItem(AUTH_TOKEN);
  }

  setAuthToken(token: string) {
    sessionStorage.setItem(AUTH_TOKEN, token);
  }

  signOut() {
    window.sessionStorage.clear();
  }

  authenticate(auth: Auth): Observable<Token> {
    console.log(".....", auth);

    const formData: FormData = new FormData();
    formData.append(`grant_type`, "password");
    formData.append("username", `${auth.username}:${auth.username}`);
    formData.append("password", auth.password);

    const headers = new HttpHeaders();
    headers.append(
      `Authorization`,
      btoa("portal-api-services:12345678")
    );

    headers.append(
      'content-type', 'application/json;charset=UTF-8'
    )
    

    return this.http.post<Token>("/aig-uaa/oauth/token", formData, {
      headers: headers
    });
  }

  // authenticate(auth: Auth): Observable<string> {
  //   console.log("Requesting logging");

  //   const headers = new HttpHeaders().append(
  //     `Authorization`,
  //     btoa("portal-api-services:12345678")
  //   );

  //   return this.http.post<string>("/aig-uaa/oauth/token", JSON.stringify(auth), {
  //     headers: headers
  //   });
  // }
}

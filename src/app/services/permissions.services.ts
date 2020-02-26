import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, interval } from "rxjs";
import { Permissions } from '../models/permissions';

@Injectable({ providedIn: "root" })
export class PermissionService {
  constructor(private http: HttpClient) {}

  createPermission(permit: Permissions): Observable<Permissions> {

    const headers = new HttpHeaders()
    .append('content-type', 'application/json;charset=UTF-8');

    return this.http.post<Permissions>("/aig-uaa/api/permission/createPermission",
    JSON.stringify(permit), {headers: headers});
  }

  getPermissions(): Observable<Permissions[]> {
    return this.http.get<Permissions[]>("/aig-uaa/api/permission/getAllpermissions")
    // return this.http.get<Permissions[]>("assets/permissions.json")
  }

  getPermission(permissionCode: number): Observable<any> {
    return this.http.get<any>(`aig-uaa/api/permission/getPermissionById/${permissionCode}`)
    // return this.http.get<Permissions[]>("assets/permissions.json")
  }

  editPermission(permit: Permissions, permissionCode: number): Observable<Permissions> {
    
    const headers = new HttpHeaders()
    .append('content-type', 'application/json;charset=UTF-8');
    return this.http.put<Permissions>(`aig-uaa/api/permission/updatePermission/${permissionCode}`,
    JSON.stringify(permit), {headers: headers}
    )
    // return this.http.get<Permissions[]>("assets/permissions.json")
  }

  deletePermissions(permissionCode: number): Observable<any> {
    const headers = new HttpHeaders()
    .append('content-type', 'application/json;charset=UTF-8');
    return this.http.delete<any>(`/aig-uaa/api/permission/deletePermission/${permissionCode}`,
    {headers: headers}
    )
    // return this.http.delete<any>("assets/permissions.json")

  }

  // getPermissions() {
  //   return this.http.get<any>('assets/permissions.json')
  //     .toPromise()
  //     .then(res => <Permissions[]>res.data)
  //     .then(data => { return data; });
  //   }
}

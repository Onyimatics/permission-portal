import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, interval } from "rxjs";
import { Permission } from '../models/permissions';

@Injectable({ providedIn: "root" })
export class PermissionService {
  constructor(private http: HttpClient) {}

  createPermission(permit: Permission): Observable<Permission> {

    const headers = new HttpHeaders()
    .append('content-type', 'application/json;charset=UTF-8');

    return this.http.post<Permission>("/aig-uaa/api/permission/createPermission",
    JSON.stringify(permit), {headers: headers});
  }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>("/aig-uaa/api/permission/getAllpermissions")
    // return this.http.get<Permission[]>("assets/permissions.json")
  }

  getPermission(permissionCode: number): Observable<any> {
    return this.http.get<any>(`aig-uaa/api/permission/getPermissionById/${permissionCode}`)
    // return this.http.get<Permissions[]>("assets/permissions.json")
  }

  editPermission(permit: Permission, permissionCode: number): Observable<Permission> {
    
    const headers = new HttpHeaders()
    .append('content-type', 'application/json;charset=UTF-8');
    return this.http.put<Permission>(`aig-uaa/api/permission/updatePermission/${permissionCode}`,
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

  }

  // getPermissions() {
  //   return this.http.get<any>('assets/permissions.json')
  //     .toPromise()
  //     .then(res => <Permissions[]>res.data)
  //     .then(data => { return data; });
  //   }
}

import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PermissionService } from "../services/permissions.services";
import { Permissions } from "../models/permissions";
import { AuthService } from "../services/auth.services";
import { Router, ActivatedRoute } from "@angular/router";

import { ConfirmationService } from "primeng/api";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-permissions",
  templateUrl: "./permissions.component.html",
  styleUrls: ["./permissions.component.css"]
})
export class PermissionsComponent implements OnInit {
  readonly subscriptions = new Subscription();
  permissions: Permissions[];
  // permission: Permissions;
  private _displayModal: boolean;
  get displayModal(): boolean {
    return this._displayModal;
  }

  set displayModal(value: boolean) {
    console.log(`Setting: `, value);
    this._displayModal = value;
  }

  // permissionCode: number;
  permissionForm: FormGroup;
  selectedPermission: Permissions;
  // selectedValue: string = 'val1';

  constructor(
    private readonly _permissionService: PermissionService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const subscription = this._permissionService.getPermissions().subscribe(
      data => {
        this.permissions = data;
      },
      error => console.log(error)
    );
    this.subscriptions.add(subscription);
  }

  showModal(permission: Permissions | undefined | null = null) {
    console.log(this.displayModal);
    if (permission) {
      // const subscription = this._permissionService.getPermission(permission.permissionCode)
      // .subscribe(perm => {
      //   this.selectedPermission = perm;
      //   this.displayModal = true;
      // });
      // this.subscriptions.add(subscription);
    }
    this.selectedPermission = permission;
    this.displayModal = true;
  }

  test(value) {
    console.log("event: ", value);
    this.displayModal = value;
  }

  confirm(permissionCode: number) {

    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        const subscription = this._permissionService.deletePermissions(permissionCode)
        .subscribe(
          (data) => {
            this.permissions = this.permissions.filter(perm => perm.permissionCode !== permissionCode)
          },
          (error) => console.log(error)
        );
        this.subscriptions.add(subscription)
      }
    });
  }

  appendPermission(permission: Permissions) {
    if (
      this.permissions &&
      permission &&
      !!this.permissions.find(
        perm => perm.permissionCode == permission.permissionCode
      )
    ) {
      const index = this.permissions.findIndex(
        perm => perm.permissionCode == permission.permissionCode
      );
      this.permissions[index] = permission;
    } else {
      this.permissions && permission && this.permissions.push(permission);
    }
  }

  logOut() {
    this.authService.signOut();
    this.router.navigate(["/login"]);
  }
}

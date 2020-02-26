import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  Form
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { PermissionService } from "../services/permissions.services";
import { interval, Subscription, of, Observable } from "rxjs";
import { mergeMap, map, tap, filter } from "rxjs/operators";
import { Permission } from "../models/permissions";

@Component({
  selector: "app-create-permissions",
  templateUrl: "./create-permissions.component.html",
  styleUrls: ["./create-permissions.component.css"]
})
export class CreatePermissionsComponent implements OnInit {
  permissionForm: FormGroup;
  readonly subscriptions = new Subscription();
  // permission: Permissions;

  _permission: Permission;

  get permission(): Permission {
    return this._permission;
  }

  @Input()
  set permission(value: Permission) {
    this._permission = value;
    this.updateForm();
  }

  @Input() modalDisplay: boolean;
  @Output() modalDisplayChange = new EventEmitter<boolean>(false);

  @Output() permissionCreated = new EventEmitter<Permission>();

  constructor(
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.permissionForm = this.fb.group({
      enabled: [],
      permissionGrouping: [""],
      permissionName: [""],
      permission: [""]
    });
  }

  ngAfterViewInit() {
    //this.updateForm();
  }

  onSubmit() {
    const rawValue = this.permissionForm.getRawValue();
    const existingPermission =
      rawValue.permission ||
      <Permission>{
        enabled: false
      };
    const permission = <Permission>{
      ...existingPermission,
      enabled: rawValue.enabled === "true",
      permissionGrouping: rawValue.permissionGrouping,
      permissionName: rawValue.permissionName
    };
    console.log(permission, rawValue);

    // const subscription = this.permissionService
    //   .createPermission(permission)
    //   .subscribe(data => {
    //     this.router.navigate(["/get-permissions"]);
    //   });
    // this.receiveModal = false;

    const permission$: Observable<Permission> = of(permission).pipe(
      mergeMap(perm => {
        if (perm.permissionCode) {
          return this.permissionService.editPermission(
            perm,
            perm.permissionCode
          );
        }
        return this.permissionService.createPermission(perm);
      })
    );
    const subscription = permission$.subscribe(
      data => {
        this.router.navigate(["/get-permissions"]);
        this.modalDisplay = false;
        this.modalDisplayChange.emit(false);
        this.permissionCreated.emit(data);
      },
      error => console.log(error)
    );
    this.subscriptions.add(subscription);
    // console.warn(this.permissionForm.value);
  }

  private updateForm() {
    const perm = this.permission || <Permission>{};
    if (this.permissionForm) {
      this.permissionForm.patchValue({
        // perm
        enabled: perm.enabled ? "true" : "false",
        permissionGrouping: perm.permissionGrouping,
        permissionName: perm.permissionName,

        permission: perm
      });
    }
  }

  hideModal() {
    console.log("Called");
    this.modalDisplayChange.emit(false);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

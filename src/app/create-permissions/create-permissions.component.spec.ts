import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { PermissionService } from "../services/permissions.services";
import { DialogModule } from "primeng/dialog";
import { RadioButtonModule } from "primeng/radiobutton";

import { CreatePermissionsComponent } from "./create-permissions.component";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { Router } from "@angular/router";
import { PermissionsComponent } from "../permissions/permissions.component";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

fdescribe("CreatePermissionsComponent", () => {
  const permissionServiceStub: jasmine.SpyObj<PermissionService> = jasmine.createSpyObj(
    "permissionService",
    ["createPermission"]
  );

  let routes = [
    {
      path: "create-permission",
      component: CreatePermissionsComponent
    }
  ];

  // let mockRouter = {
  //   navigate: jasmine.createSpy('navigate')
  // }

  let component: CreatePermissionsComponent;
  let fixture: ComponentFixture<CreatePermissionsComponent>;
  let httpMock: HttpTestingController;
  let permissionService: PermissionService;
  let injector: TestBed;
  let reactiveFormsModule: ReactiveFormsModule;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        DialogModule,
        RadioButtonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [CreatePermissionsComponent],
      providers: [
        {
          provide: PermissionService,
          useValue: permissionServiceStub
        }
        // { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermissionsComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    permissionService = injector.get(PermissionService);
    httpMock = injector.get(HttpTestingController);

    fixture.detectChanges();
    component.ngOnInit();
    component.modalDisplay = true;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it("should render form invalid when empty", () => {
    expect(component.permissionForm.valid).toBeFalsy();
  });

  it("should validate permissionGrouping", () => {
    let permissionGrouping =
      component.permissionForm.controls["permissionGrouping"];
    expect(permissionGrouping.valid).toBeFalsy();

    let errors = {};
    errors = permissionGrouping.errors;
    expect(errors["required"]).toBeTruthy();
  });

  it("should validate permissionName", () => {
    let permissionName = component.permissionForm.controls["permissionName"];
    expect(permissionName.valid).toBeFalsy();

    let errors = {};
    errors = permissionName.errors;
    expect(errors["required"]).toBeTruthy();
  });

  it("should validate permission form", () => {
    fixture.detectChanges();
    expect(component.permissionForm.valid).toBeFalsy();
    component.permissionForm.controls["enabled"].setValue("true");
    component.permissionForm.controls["permissionGrouping"].setValue(
      "TEST_GROUP"
    );
    component.permissionForm.controls["permissionName"].setValue("EDIT_ADMIN");
    expect(component.permissionForm.valid).toBeDefined();
  });

  it("should invoke permission service when form is valid", () => {
    fixture.detectChanges();
    const enabled = component.permissionForm.controls.enabled;
    enabled.setValue("true");
    const permissionGrouping =
      component.permissionForm.controls.permissionGrouping;
    permissionGrouping.setValue("TEST_GROUP");
    const permissionName = component.permissionForm.controls.permissionName;
    permissionName.setValue("EDIT_ADMIN");
    const permission = component.permissionForm.controls.permission;
    permission.setValue("");
    fixture.detectChanges();
   

    permissionServiceStub.createPermission.and.returnValue(of());
    // fixture.debugElement.query(By.css('#createPerm')).triggerEventHandler('click', null);

    // fixture.debugElement.query(By.css('#createPerm')).nativeElement;
    
    fixture.detectChanges();
    fixture.nativeElement.querySelector("button").click();
    console.log(
      "fixture",
      fixture.nativeElement.querySelector("button")
    );

    expect(permissionServiceStub.createPermission.calls.any()).toBeTruthy();
    expect(permissionServiceStub.createPermission).toHaveBeenCalled();
    expect(permissionServiceStub.createPermission).toHaveBeenCalledWith({
      enabled: enabled.value,
      permissionGrouping: permissionGrouping.value,
      permissionName: permissionName.value
    });
  });
});

// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { Router } from '@angular/router';
// import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { CreatePermissionsComponent } from './create-permissions.component';
// import { PermissionService } from '../services/permissions.services';
// import { AuthService } from '../services/auth.services';
// import { AppRoutingModule } from 'src/app/app-routing.module';
// import { RouterTestingModule } from '@angular/router/testing';
// import { DialogModule } from 'primeng/dialog';
// import { RadioButtonModule } from 'primeng/radiobutton';
// import { of } from 'rxjs';
// fdescribe('PermissionComponent', () => {
//   const permissionServiceStub: jasmine.SpyObj<PermissionService> = jasmine.createSpyObj(
//     'permissionService',
//     ['createPermission']
//   );
//   let permissionService: PermissionService
//   let permissionComponent: CreatePermissionsComponent;
//   let fixture: ComponentFixture<CreatePermissionsComponent>;
//   let httpTestingController: HttpTestingController;
//   let formBuilder: FormBuilder;
//   let router: Router;
//   let routes = [{
//     path: 'create-permission',
//     component: CreatePermissionsComponent
//   }]
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes(routes),
//         ReactiveFormsModule,
//         FormsModule,
//         DialogModule,
//         RadioButtonModule
//       ],
//       declarations: [ CreatePermissionsComponent ],
//       providers: [
//         {provide: PermissionService, useValue: permissionServiceStub},
//         FormBuilder
//       ]
//   })
//   .compileComponents()
//     .then(() => {
//     permissionService = TestBed.get(PermissionService);
//     httpTestingController = TestBed.get(HttpTestingController);
//     })
//   }));
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CreatePermissionsComponent);
//     permissionComponent = fixture.componentInstance;
//     fixture.detectChanges();
//     permissionComponent.ngOnInit();
//   });
//   it('should create login component', () => {
//     expect(permissionComponent).toBeTruthy();
//   });
//   it('should have a permissionForm property', () => {
//     expect(permissionComponent.permissionForm).toBeTruthy();
//   });
//   it('should have form controls', () => {
//     expect(permissionComponent.permissionForm.controls).toBeTruthy();
//   });
//   it(`should contain correct form control names`, async(inject([FormBuilder ],(fb: FormBuilder ) => {
//     expect(typeof(permissionComponent.permissionForm.controls)).toEqual('object');
//     expect(Object.keys(permissionComponent.permissionForm.controls)).toContain('enabled');
//     expect(Object.keys(permissionComponent.permissionForm.controls)).toContain('permissionGrouping');
//     expect(Object.keys(permissionComponent.permissionForm.controls)).toContain('permissionName');
//   })));
//   it(`form should be invalid when empty `, async(inject([FormBuilder ], (fb: FormBuilder ) => {
//     permissionComponent.permissionForm.controls['enabled'].setValue('true');
//     permissionComponent.permissionForm.controls['permissionGrouping'].setValue('TEST_GROUPING');
//     permissionComponent.permissionForm.controls['permissionName'].setValue('EDIT_ADMIN');
//     expect(permissionComponent.permissionForm.valid).toBeTruthy();
//   })));
//   it(`should have valid enabled value`, async(inject([FormBuilder ],(fb: FormBuilder ) => {
//     permissionComponent.permissionForm.controls['enabled'].setValue('true');
//     expect(permissionComponent.permissionForm.controls['enabled'].value).toBe('true');
//   })));
//   it(`should have valid permission grouping value`, async(inject([FormBuilder ],(fb: FormBuilder ) => {
//     permissionComponent.permissionForm.controls['permissionGrouping'].setValue('TEST_GROUPING');
//     expect(permissionComponent.permissionForm.controls['permissionGrouping'].value).toBe('TEST_GROUPING');
//   })));
//   it(`should have valid permission name value`, async(inject([FormBuilder ],(fb: FormBuilder ) => {
//     permissionComponent.permissionForm.controls['permissionName'].setValue('EDIT_ADMIN');
//       expect(permissionComponent.permissionForm.controls['permissionName'].value).toBe('EDIT_ADMIN');
//   })));
//   it(`should authenticate user when form is submitted`, async(inject([FormBuilder ],(fb: FormBuilder) => {
//     permissionComponent.permissionForm.controls['enabled'].setValue('false');
//     permissionComponent.permissionForm.controls['permissionGrouping'].setValue('TEST_EDITING');
//     permissionComponent.permissionForm.controls['permissionGrouping'].setValue('EDIT_USERS');
//     permissionServiceStub.createPermission.and.returnValue(of());
//     fixture.detectChanges();
//     fixture.nativeElement.querySelector('button').click();
//     expect(permissionServiceStub.createPermission.calls.any()).toBeTruthy();
//     expect(permissionServiceStub.createPermission).toHaveBeenCalledWith({
//       enabled: permissionComponent.permissionForm.controls['enabled'].value,
//       permissionCode:  permissionComponent.permissionForm.controls['permissionCode'].value,
//       permissionGrouping:  permissionComponent.permissionForm.controls['permissionGrouping'].value,
//       permissionName:  permissionComponent.permissionForm.controls['permissionName'].value
//     });
//   })));
// });

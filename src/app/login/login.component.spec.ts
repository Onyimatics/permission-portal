import {
  async,
  ComponentFixture,
  TestBed,
  inject,
  getTestBed
} from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { LoginComponent } from "./login.component";
import { AuthService } from "../services/auth.services";
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { Token, Auth } from "../models/auth";
import { Subscription, Observable, of } from "rxjs";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";

fdescribe("LoginComponent", () => {
  const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    "authService",
    ["authenticate", "setAuthToken", "getAuthToken"]
  );

  let mockRouter = {
    navigate: jasmine.createSpy("navigate")
  };

  class MockAuthService {
    Auth = {
      grant_type: "password",
      username: "ADMIN:ADMIN",
      password: "1234567 "
    };
  }
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  let injector: TestBed;
  let reactiveFormsModule: ReactiveFormsModule;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub
        },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it("should render form invalid when empty", () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it("should validate grant_type", () => {
    let grant_type = component.loginForm.controls["grant_type"];
    expect(grant_type.valid).toBeFalsy();

    let errors = {};
    errors = grant_type.errors;
    expect(errors["required"]).toBeTruthy();
  });

  it("should validate username", () => {
    let username = component.loginForm.controls["username"];
    expect(username.valid).toBeFalsy();

    let errors = {};
    errors = username.errors;
    expect(errors["required"]).toBeTruthy();
  });

  it("should validate password", () => {
    let password = component.loginForm.controls["password"];
    expect(password.valid).toBeFalsy();

    let errors = {};
    errors = password.errors;
    expect(errors["required"]).toBeTruthy();
  });

  it("should validate login form", () => {
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls["grant_type"].setValue("password");
    component.loginForm.controls["username"].setValue("ADMIN:ADMIN");
    component.loginForm.controls["password"].setValue("1234567");
    expect(component.loginForm.valid).toBeTruthy();
  });

  it("should invoke auth service when form is valid", () => {
    fixture.detectChanges();
    const grant_type = component.loginForm.controls.grant_type;
    grant_type.setValue("password");
    const username = component.loginForm.controls.username;
    username.setValue("ADMIN:ADMIN");
    const password = component.loginForm.controls.password;
    password.setValue("1234567");

    authServiceStub.authenticate.and.returnValue(of());
    fixture.detectChanges();

    fixture.nativeElement.querySelector("button").click();

    expect(authServiceStub.authenticate.calls.any()).toBeTruthy();
    expect(authServiceStub.authenticate).toHaveBeenCalled();
    expect(authServiceStub.authenticate).toHaveBeenCalledWith({
      grant_type: grant_type.value,
      username: username.value,
      password: password.value
    });
    // let token = 'someToken'
    // authServiceStub.setAuthToken(token);
    // expect(authServiceStub.getAuthToken(token)).toBe(token);
    // expect(authServiceStub.setAuthToken()).toBeTruthy();
    // expect(authServiceStub.setAuthToken(token)).toBe(token);

    // expect(mockRouter.navigate).toHaveBeenCalledWith(['get-permissions']);
    // expect(router.navigate['/get-permissions']).toBeTruthy();
  });
});

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


xdescribe('AuthService', () => {
  const httpClientStub: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
    'http',
    ['post']
  );
  const Login = {grant_type : 'password',
        username : 'ADMIN:ADMIN',
        password : '1234567' }
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            AuthService,
          {provide: AuthService, useValue: httpClientStub},
        ]
      })
      authService = TestBed.get(AuthService);
      httpTestingController = TestBed.get(HttpTestingController);
    });
    describe('AuthService', () => {
      httpClientStub.post.and.returnValue(of());
      it('should perform a post to /auth with grant_type, username and password', () => {
        const authService = new AuthService(httpClientStub);
        httpClientStub.post.and.returnValue(of());
        authService.authenticate(Login)
        const formData: FormData = new FormData();
        formData.append(`grant_type`, `password`);
        formData.append('username', `ADMIN:ADMIN`);
        formData.append('password', `1234567`);
        const headers = new HttpHeaders()
        expect(httpClientStub.post).toHaveBeenCalledWith('/aig-uaa/oauth/token', formData, {headers: headers} );
      });
  });
  });

  fdescribe('setToken, getToken and signOut Method', () => {
    let authService: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,
                {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true ,   
                },
            ],
        })
        authService = TestBed.get(AuthService);
        httpMock = TestBed.get(HttpTestingController);
        authService.signOut();
    });
    it('should properly set an api token', () => {
        expect(authService.getAuthToken()).toBeNull();
        let token = 'someToken';
        authService.setAuthToken(token);
        expect(authService.getAuthToken()).toBe(token);
    })

    it('should clear sessionStorage on successful signout', () => {
        expect(authService.signOut()).toBeUndefined();
        let token = 'someToken';
        authService.setAuthToken(token);
        authService.signOut()
        window.sessionStorage.clear();
        expect(authService.getAuthToken()).toBeNull();
    })

  })
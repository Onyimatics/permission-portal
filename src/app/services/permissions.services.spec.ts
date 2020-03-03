import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PermissionService } from './permissions.services';
import { Permission } from '../models/permissions'

fdescribe('Permission Service Test', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PermissionService],
            imports: [HttpClientTestingModule]
        });
    });

    describe('PermissionService', () => {
        let permissionService: PermissionService;
        let httpTestingController: HttpTestingController;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                PermissionService
                ]
            });
            permissionService = TestBed.get(PermissionService);
            httpTestingController = TestBed.get(HttpTestingController);
        });

        it(`should fetch permissions as an Observable`, async(inject([HttpTestingController, PermissionService],
          (httpTestingController: HttpTestingController, permissionService: PermissionService) => {
            const getPermissionMockData = [
                {
                    "permissionCode": 48,
                    "permissionGrouping": "TEST_GROUPING",
                    "permissionName": "EDIT_USER",
                    "enabled": false
                }
            ];
            permissionService.getPermissions()
              .subscribe((permissions: Permission[]) => {
                expect(permissions).toEqual(getPermissionMockData)
                expect(permissions.length).toBe(1);
              });

            let req = httpTestingController.expectOne('/aig-uaa/api/permission/getAllpermissions');
            expect(req.request.method).toBe("GET");
            expect(req.request.responseType).toBe("json");
            expect(req.request.urlWithParams).toBe("/aig-uaa/api/permission/getAllpermissions");

            req.flush(getPermissionMockData);
          })));

          it(`should create permissions as an Observable`, async(inject([HttpTestingController, PermissionService],
            (httpTestingController: HttpTestingController, permissionService: PermissionService) => {
              const createPermissionMockData = 
                  {
                      "permissionCode": 48,
                      "permissionGrouping": "TEST_GROUPING",
                      "permissionName": "EDIT_USER",
                      "enabled": false
                  };
              permissionService.createPermission(createPermissionMockData)
                .subscribe((permissions: Permission) => {
                expect(typeof(permissions)).toEqual('object')
                  expect(permissions).toEqual(createPermissionMockData);
                  expect(permissions.permissionCode).toEqual(48);
                  expect(permissions.permissionGrouping).toEqual('TEST_GROUPING');
                  expect(permissions.permissionName).toEqual('EDIT_USER');
                  expect(permissions.enabled).toEqual(false);
                
                });

              let req = httpTestingController.expectOne('/aig-uaa/api/permission/createPermission', JSON.stringify(createPermissionMockData));
              expect(req.request.method).toBe("POST");
              expect(req.request.body).toEqual(JSON.stringify(createPermissionMockData));
              expect(req.request.responseType).toBe("json");
              expect(req.request.urlWithParams).toBe("/aig-uaa/api/permission/createPermission");
  
              req.flush(createPermissionMockData);
            })));

            it(`should update a permission as an Observable`, async(inject([HttpTestingController, PermissionService],
                (httpTestingController: HttpTestingController, permissionService: PermissionService) => {
                  const updatePermissionMockData =
                      {
                          "permissionCode": 48,
                          "permissionGrouping": "TEST_GROUPING",
                          "permissionName": "EDIT_USER",
                          "enabled": true
                      };
                      let permissionCode = 48;
                  permissionService.editPermission(updatePermissionMockData, permissionCode)
                    .subscribe((permissions: Permission) => {
                  expect(permissions).toEqual(updatePermissionMockData);
                    expect(permissions.enabled).toEqual(true);
                    expect(typeof(permissions)).toEqual('object')
                    });
      
                  let req = httpTestingController.expectOne(`aig-uaa/api/permission/updatePermission/${permissionCode}`, JSON.stringify(updatePermissionMockData));
                  expect(req.request.method).toBe("PUT");
                  expect(req.request.responseType).toBe("json");
                  expect(req.request.urlWithParams).toBe(`aig-uaa/api/permission/updatePermission/${permissionCode}`);
                  
      
                  req.flush(updatePermissionMockData);
                })));

                it(`should delete a permission as an Observable`, async(inject([HttpTestingController, PermissionService],
                    (httpTestingController: HttpTestingController, permissionService: PermissionService) => {
                          let permissionCode = 48;
                      permissionService.deletePermissions(permissionCode)
                        .subscribe((permissions) => {
                      expect(permissions.length).toBe(0);
                      console.log('LENGTH', permissions);
                      
                            
                        });
          
                      let req = httpTestingController.expectOne(`/aig-uaa/api/permission/deletePermission/${permissionCode}`);
                      expect(req.request.method).toBe("DELETE");
                      expect(req.request.body).toBe(null);
                      expect(req.request.urlWithParams).toBe(`/aig-uaa/api/permission/deletePermission/${permissionCode}`);
        
                    })));

                    it(`should fetch a particular permission`, async(inject([HttpTestingController, PermissionService],
                        (httpTestingController: HttpTestingController, permissionService: PermissionService) => {
                          const getPermissionMockData = [
                              {
                                  "permissionCode": 48,
                                  "permissionGrouping": "TEST_GROUPING",
                                  "permissionName": "EDIT_USER",
                                  "enabled": false
                              }
                          ];

                          let permissionCode = 48;
                          permissionService.getPermission(permissionCode)
                            .subscribe((permissions: Permission[]) => {
                              expect(permissions).toEqual(getPermissionMockData)
                              expect(permissions.length).toBe(1);
                            });
                            
                          let req = httpTestingController.expectOne(`aig-uaa/api/permission/getPermissionById/${permissionCode}`);
                          expect(req.request.method).toBe("GET");
                          expect(req.request.responseType).toBe("json");
                          expect(req.request.urlWithParams).toBe(`aig-uaa/api/permission/getPermissionById/${permissionCode}`);
              
                          req.flush(getPermissionMockData);
                        })));

               afterAll(() => {
            httpTestingController.verify();
        })
      });
})
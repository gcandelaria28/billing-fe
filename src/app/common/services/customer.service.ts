import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { API_VERSION, BASE_PATH } from "../variable";
import { Observable } from "rxjs";
import { Customer, CustomerResponse } from "../models/customer";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  protected basePath = "/";
  protected apiVersion = "1";

  constructor(
    protected httpClient: HttpClient,
    @Inject(BASE_PATH) basePath: string,
    @Inject(API_VERSION) apiVersion: string
  ) {
    this.basePath = basePath;
    this.apiVersion = apiVersion;
  }
  getCustomer(
    search?: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> {
    let queryParameters = new HttpParams();

    if (search !== undefined && search !== null) {
      queryParameters = queryParameters.set("searchKey", search);
    }
    if (pageSize !== undefined && pageSize !== null) {
      queryParameters = queryParameters.set("pageSize", pageSize);
    }
    if (pageNumber !== undefined && pageNumber !== null) {
      queryParameters = queryParameters.set("pageNumber", pageNumber);
    }

    return this.httpClient.get<any>(
      `${this.basePath}/api/v${this.apiVersion}/administration/customer`,
      { params: queryParameters }
    );
  }

  postCustomer(customer: Customer): Observable<any> {
    return this.httpClient.post<CustomerResponse>(
      `${this.basePath}/api/v${this.apiVersion}/administration/customer`,
      customer
    );
  }

  getCustomerById(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.basePath}/api/v${this.apiVersion}/administration/customer/${id}`,
    );
  }
  putCustomer(customer: Customer): Observable<any> {
    return this.httpClient.put<any>(
      `${this.basePath}/api/v${this.apiVersion}/administration/customer/${customer.id}`, customer
    );
  }

  deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.basePath}/api/v${this.apiVersion}/administration/customer/${id}`,
    );
  }

}

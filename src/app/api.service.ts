import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getTotalSupply() : Observable<String> {
    return this.http.get<String>('http://localhost:3000/get-total-supply')
    
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  castVote(form: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/cast-vote', form);
  }

  delegateVotingPower(form: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3000/delegate-voting-power',
      form
    );
  }

  getTotalSupply(): Observable<String> {
    return this.http.get<String>('http://localhost:3000/get-total-supply');
  }

  listPaymentOrders(): Observable<String> {
    return this.http.get<String>('http://localhost:3000/list-payment-orders');
  }

  listVotes(): Observable<String> {
    return this.http.get<String>('http://localhost:3000/list-votes');
  }

  checkVotingPower(): Observable<String> {
    return this.http.get<String>('http://localhost:3000/check-voting-power');
  }

  claimPayment(): Observable<String> {
    return this.http.post<String>('http://localhost:3000/claim-payment', {
      id: 'id',
    });
  }

  requestVotingToken(): Observable<String> {
    return this.http.post<String>(
      'http://localhost:3000/request-voting-tokens',
      { body: 'body' }
    );
  }
}

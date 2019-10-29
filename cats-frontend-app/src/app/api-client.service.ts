import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatData } from './cat-data.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = "https://cats.boorse.app/api/v1";
    } else {
      this.apiUrl = "http://localhost:8080/v1";
    }
  }

  apiUrl: string;

  findAllCats(): Observable<CatData[]> {
    return this.http.get<CatData[]>(`${this.apiUrl}/cats`);
  }

  findCatById(id: number): Observable<CatData> {
    return this.http.get<CatData>(`${this.apiUrl}/cats/${id}`);
  }

  createCat(data: CatData): Observable<CatData> {
    return this.http.post<CatData>(`${this.apiUrl}/cats`, data);
  }

  deleteCatById(id: number): Observable<CatData> {
    return this.http.delete<CatData>(`${this.apiUrl}/cats/${id}`);
  }
}

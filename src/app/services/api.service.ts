import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  // Método para establecer el token
  setToken(token: string): void {
    this.token = token;
  }

  // Método para obtener el token
  getToken(): string | null {
    return this.token;
  }

  // Método para crear los headers con el token
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    
    return headers;
  }

  // Método genérico para peticiones GET
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  // Método genérico para peticiones POST
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeaders() });
  }

  // Método genérico para peticiones PUT
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeaders() });
  }

  // Método genérico para peticiones DELETE
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() });
  }
}
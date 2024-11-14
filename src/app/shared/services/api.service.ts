import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // URL base para o backend

  constructor(private http: HttpClient) {}

  /**
   * Realiza uma requisição GET.
   * @param endpoint - Caminho relativo ao baseUrl
   * @param params - Parâmetros opcionais da URL
   * @param headers - Headers opcionais
   */
  get<T>(
    endpoint: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params, headers });
  }

  /**
   * Realiza uma requisição POST.
   * @param endpoint - Caminho relativo ao baseUrl
   * @param body - Dados para o corpo da requisição
   * @param headers - Headers opcionais
   */
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { headers });
  }

  /**
   * Realiza uma requisição PUT.
   * @param endpoint - Caminho relativo ao baseUrl
   * @param body - Dados para o corpo da requisição
   * @param headers - Headers opcionais
   */
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, { headers });
  }

  /**
   * Realiza uma requisição DELETE.
   * @param endpoint - Caminho relativo ao baseUrl
   * @param params - Parâmetros opcionais da URL
   * @param headers - Headers opcionais
   */
  delete<T>(
    endpoint: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      params,
      headers,
    });
  }

  /**
   * Realiza uma requisição genérica.
   * @param method - Método HTTP (GET, POST, etc.)
   * @param endpoint - Caminho relativo ao baseUrl
   * @param options - Configurações adicionais
   */
  request<T>(
    method: string,
    endpoint: string,
    options: {
      body?: any;
      params?: HttpParams;
      headers?: HttpHeaders;
    } = {}
  ): Observable<T> {
    return this.http.request<T>(method, `${this.baseUrl}${endpoint}`, options);
  }
}

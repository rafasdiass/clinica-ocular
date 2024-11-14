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
   * @param params - Parâmetros opcionais (objeto chave-valor ou HttpParams)
   * @param headers - Headers opcionais (objeto chave-valor ou HttpHeaders)
   */
  get<T>(
    endpoint: string,
    params?: Record<string, any> | HttpParams,
    headers?: Record<string, string> | HttpHeaders
  ): Observable<T> {
    const options = this.createOptions(params, headers);
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, options);
  }

  /**
   * Realiza uma requisição POST.
   * @param endpoint - Caminho relativo ao baseUrl
   * @param body - Dados para o corpo da requisição
   * @param headers - Headers opcionais (objeto chave-valor ou HttpHeaders)
   */
  post<T>(
    endpoint: string,
    body: any,
    headers?: Record<string, string> | HttpHeaders
  ): Observable<T> {
    const options = this.createOptions(undefined, headers);
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, options);
  }

  /**
   * Realiza uma requisição PUT.
   * @param endpoint - Caminho relativo ao baseUrl
   * @param body - Dados para o corpo da requisição
   * @param headers - Headers opcionais (objeto chave-valor ou HttpHeaders)
   */
  put<T>(
    endpoint: string,
    body: any,
    headers?: Record<string, string> | HttpHeaders
  ): Observable<T> {
    const options = this.createOptions(undefined, headers);
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, options);
  }

  /**
   * Realiza uma requisição DELETE.
   * @param endpoint - Caminho relativo ao baseUrl
   * @param params - Parâmetros opcionais (objeto chave-valor ou HttpParams)
   * @param headers - Headers opcionais (objeto chave-valor ou HttpHeaders)
   */
  delete<T>(
    endpoint: string,
    params?: Record<string, any> | HttpParams,
    headers?: Record<string, string> | HttpHeaders
  ): Observable<T> {
    const options = this.createOptions(params, headers);
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, options);
  }

  /**
   * Realiza uma requisição genérica.
   * @param method - Método HTTP (GET, POST, etc.)
   * @param endpoint - Caminho relativo ao baseUrl
   * @param options - Configurações adicionais (body, params, headers)
   */
  request<T>(
    method: string,
    endpoint: string,
    options: {
      body?: any;
      params?: Record<string, any> | HttpParams;
      headers?: Record<string, string> | HttpHeaders;
    } = {}
  ): Observable<T> {
    const requestOptions = this.createOptions(
      options.params,
      options.headers,
      options.body
    );
    return this.http.request<T>(
      method,
      `${this.baseUrl}${endpoint}`,
      requestOptions
    );
  }

  /**
   * Helper para criar as opções de requisição (parâmetros e cabeçalhos).
   * @param params - Parâmetros opcionais (objeto chave-valor ou HttpParams)
   * @param headers - Headers opcionais (objeto chave-valor ou HttpHeaders)
   * @param body - Corpo da requisição, caso aplicável
   * @returns Objeto contendo as opções formatadas
   */
  private createOptions(
    params?: Record<string, any> | HttpParams,
    headers?: Record<string, string> | HttpHeaders,
    body?: any
  ): { params?: HttpParams; headers?: HttpHeaders; body?: any } {
    const httpParams =
      params instanceof HttpParams
        ? params
        : new HttpParams({ fromObject: params || {} });

    const httpHeaders =
      headers instanceof HttpHeaders ? headers : new HttpHeaders(headers || {});

    return { params: httpParams, headers: httpHeaders, body };
  }
}

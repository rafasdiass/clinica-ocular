import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api/auth'; // URL do backend NestJS
  private tokenKey = 'auth-token'; // Chave para armazenar o token JWT
  private username: string = '';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Injeção para verificar o ambiente
  ) {
    this.checkAuthentication(); // Verifica o estado de autenticação ao inicializar
  }

  /**
   * Faz login no sistema e armazena o token JWT.
   * @param username Nome de usuário
   * @param password Senha do usuário
   * @returns Observable<any>
   */
  login(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };

    return this.http
      .post<{ access_token: string; username: string }>(
        `${this.apiUrl}/login`,
        loginPayload
      )
      .pipe(
        tap((response) => {
          this.setToken(response.access_token);
          this.username = response.username;
          this.isAuthenticatedSubject.next(true); // Atualiza o estado de autenticação
        })
      );
  }

  /**
   * Faz logout e remove o token JWT.
   * @returns Observable<void>
   */
  logout(): Observable<void> {
    return new Observable<void>((observer) => {
      this.clearToken(); // Remove o token
      this.username = '';
      this.isAuthenticatedSubject.next(false); // Atualiza o estado de autenticação
      observer.next();
      observer.complete();
    });
  }

  /**
   * Verifica o estado de autenticação com base no token armazenado.
   */
  private checkAuthentication(): void {
    if (this.isBrowser()) {
      const token = this.getToken();
      this.isAuthenticatedSubject.next(!!token); // Atualiza o estado de autenticação
    } else {
      this.isAuthenticatedSubject.next(false); // No SSR, não considera autenticado
    }
  }

  /**
   * Retorna o nome de usuário do usuário autenticado.
   * @returns string
   */
  getUsername(): string {
    return this.username;
  }

  /**
   * Retorna o token JWT armazenado.
   * @returns string | null
   */
  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  /**
   * Armazena o token JWT no localStorage.
   * @param token Token JWT
   */
  private setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  /**
   * Remove o token JWT do localStorage.
   */
  private clearToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  /**
   * Verifica se o ambiente é o navegador.
   * @returns boolean
   */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}

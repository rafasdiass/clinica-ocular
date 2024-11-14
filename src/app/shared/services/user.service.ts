import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../models/app-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // Substitua pelo endpoint real
  private userDataSubject = new BehaviorSubject<UserData | null>(null);
  public userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Cria um novo usuário no backend.
   * @param userAuth Dados do usuário
   * @param additionalData Dados adicionais, como role
   */
  createUser(
    userAuth: Partial<UserData>,
    additionalData: Partial<UserData>
  ): Observable<UserData> {
    const userData = { ...userAuth, ...additionalData };
    return this.http.post<UserData>(`${this.apiUrl}/register`, userData);
  }

  /**
   * Define os dados do usuário localmente.
   * @param userData Dados do usuário
   */
  setUserData(userData: UserData): void {
    this.userDataSubject.next(userData);
    // Caso deseje persistir no localStorage:
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  /**
   * Retorna os dados do usuário do BehaviorSubject.
   */
  getUserData(): UserData | null {
    return this.userDataSubject.value;
  }

  /**
   * Limpa os dados do usuário.
   */
  clearUserData(): void {
    this.userDataSubject.next(null);
    localStorage.removeItem('userData');
  }
}

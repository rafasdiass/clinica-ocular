import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../models/app-user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<UserData | null>(null);
  public userData$: Observable<UserData | null> =
    this.userDataSubject.asObservable();

  private readonly USER_DATA_KEY = 'userData';

  constructor(private localStorageService: LocalStorageService) {
    this.loadUserDataFromStorage();
  }

  /**
   * Carrega os dados do usuário do LocalStorage durante a inicialização.
   */
  private loadUserDataFromStorage(): void {
    const storedUserData = this.localStorageService.obterDados<UserData>(
      this.USER_DATA_KEY
    );
    if (storedUserData) {
      this.userDataSubject.next(storedUserData);
    }
  }

  /**
   * Define os dados do usuário no BehaviorSubject e salva no LocalStorage.
   * @param userData Dados do usuário
   */
  setUserData(userData: UserData): void {
    this.userDataSubject.next(userData);
    this.localStorageService.guardarDados(this.USER_DATA_KEY, userData);
  }

  /**
   * Retorna os dados atuais do BehaviorSubject.
   * @returns Dados do usuário ou null
   */
  getUserData(): UserData | null {
    return this.userDataSubject.value;
  }

  /**
   * Limpa os dados do usuário no BehaviorSubject e no LocalStorage.
   */
  clearUserData(): void {
    this.userDataSubject.next(null);
    this.localStorageService.limparDados(this.USER_DATA_KEY);
  }

  /**
   * Simula a criação de um usuário em um backend ou apenas armazena os dados localmente.
   * @param userAuth Dados básicos do usuário
   * @param additionalData Dados adicionais para o usuário
   */
  createUser(userAuth: UserData, additionalData: Partial<UserData>): void {
    const userData: UserData = {
      ...userAuth,
      ...additionalData,
      role: 'user', // Define o role como 'user' por padrão
    };

    // Simula a criação no backend ou simplesmente armazena localmente
    this.setUserData(userData);
    console.log('Usuário criado com sucesso:', userData);
  }
}

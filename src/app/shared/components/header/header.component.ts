import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { NavigationService } from '../../services/navigation.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, CommonModule, FormsModule, MatIconModule],
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;

  constructor(
    public navbarService: NavbarService,
    private navigationService: NavigationService,
    private authService: AuthService,
    private userService: UserService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.userData$.subscribe((userData) => {
      this.userName = userData ? userData.name : null;
    });
  }

  /**
   * Navega para uma seção na mesma página ou para uma rota externa.
   * @param secaoId - ID da seção ou rota
   */
  navegarPara(secaoId: string): void {
    if (secaoId === 'login') {
      this.navigationService.navigateToRoute('/login'); // Rota externa
    } else {
      this.navigationService.navigateToSection(secaoId); // Seção interna
    }
    this.navbarService.closeNavbar(); // Fecha o menu após a navegação
  }

  /**
   * Alterna o estado do menu de navegação.
   */
  toggleNavbar(): void {
    this.navbarService.toggleNavbar();
  }

  /**
   * Fecha o menu de navegação quando um clique ocorre fora do menu.
   * @param event - Evento de clique no documento
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar')) {
      this.navbarService.closeNavbar();
    }
  }

  /**
   * Faz logout do usuário e limpa os dados.
   */
  logout(): void {
    this.authService.logout();
    this.userService.clearUserData();
    this.router.navigate(['/']);
  }

  /**
   * Alterna o tema da aplicação.
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

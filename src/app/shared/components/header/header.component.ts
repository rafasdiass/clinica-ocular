import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconButton,MatButton,MatToolbarModule,MatIconModule],
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;

  constructor(
    public navbarService: NavbarService,
    private navigationService: NavigationService,
    private authService: AuthService,
    private userService: UserService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Observa os dados do usuário
    this.userService.userData$.subscribe((userData) => {
      this.userName = userData ? userData.name : null;
    });
  }

  toggleNavbar(): void {
    // Alterna o estado do menu usando o serviço
    this.navbarService.toggleNavbar();
  }

  navegarPara(secaoId: string): void {
    // Realiza a navegação para a rota ou seção correspondente
    if (secaoId === 'login') {
      this.navigationService.navigateToRoute('/login');
    } else {
      this.navigationService.navigateToSection(secaoId);
    }
    this.navbarService.closeNavbar(); // Fecha o menu após a navegação
  }

  logout(): void {
    this.authService.logout();
    this.userService.clearUserData();
    this.navbarService.closeNavbar(); // Fecha o menu após logout
  }

  toggleTheme(): void {
    // Alterna o tema da aplicação
    this.themeService.toggleTheme();
  }
}

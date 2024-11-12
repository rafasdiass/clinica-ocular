import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, RouterModule], // Adicionando RouterModule para resolver routerLink
})
export class FooterComponent {
  // Informações de contato
  clinicInfo = {
    name: 'CLDO Inovi',
    email: 'contato@cldoinovi.com.br',
    telefone: '(85) 3241-5595',
    endereco: 'Av. Washington Soares, 55, Piso L3, Iguatemi, Fortaleza',
    logoUrl: 'assets/images/logo-cldo.png',
  };

  // Links Úteis
  usefulLinks = [
    { label: 'Sobre Nós', route: '/about' },
    { label: 'Serviços', route: '/services' },
    { label: 'Fale Conosco', route: '/contact' },
  ];

  // Redes sociais
  socialLinks = [
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/cldoinovi/',
      iconClass: 'bi bi-instagram',
    },
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/CLDOINOVI',
      iconClass: 'bi bi-facebook',
    },
    {
      label: 'LinkedIn',
      url: 'https://linktr.ee/CLDOINOVI',
      iconClass: 'bi bi-linkedin',
    },
    {
      label: 'WhatsApp',
      url: 'https://wa.me/558532415595',
      iconClass: 'bi bi-whatsapp',
    },
  ];
}

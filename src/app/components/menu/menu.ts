import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  menuItems = [
    { label: 'Inicio', route: '/inicio', icon: 'home' },
    { label: 'Registro', route: '/registro', icon: 'person_add' },
    { label: 'Contacto', route: '/contacto', icon: 'mail' },
    { label: 'Acerca de', route: '/acerca', icon: 'info' }
  ];
}
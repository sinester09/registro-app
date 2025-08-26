import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
  title = 'Bienvenido a Registro-app';
  description = 'Esta es una aplicación educativa para aprender Angular con llamadas API y autenticación.';
}
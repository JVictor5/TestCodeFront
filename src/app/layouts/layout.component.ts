import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-layouts',
  templateUrl: './layout.component.html',
  imports: [RouterOutlet, NavbarComponent],
})
export class LayoutComponent {}

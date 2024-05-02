import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  public menunItems: MenuItem[] | undefined;

  ngOnInit() {
      this.menunItems = [
          {
              label: 'Pipes de Angular',
              icon: 'pi pi-desktop',
              items: [
                {
                  label: 'Textos y fechas',
                  icon: 'pi pi-align-left',
                  routerLink: '/',
                },
                {
                  label: 'Números',
                  icon: 'pi pi-dollar',
                  routerLink: 'numbers',
                },
                {
                  label: 'No comunes',
                  icon: 'pi pi-globe',
                  routerLink: 'uncommon',
                },
              ]
          },
          {
            label: 'Pipes personalizados',
            icon: 'pi pi-cog',
            items: [
              {
                label: 'Otro elemento',
                icon: 'pi pi-cog',
              },
            ]
        },
      ];
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {
  public nameLower: string = 'juan josé'
  public nameUpper: string = 'JUAN JOSÉ'
  public fullName: string = 'JUaN jOSé pÉRez'

}

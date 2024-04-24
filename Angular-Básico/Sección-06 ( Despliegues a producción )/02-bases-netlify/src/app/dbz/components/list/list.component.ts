import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  // @Input(): Importa información desde el componente padre en este caso main.component.ts
  @Input()
  //Data por defecto al cargar al aplicación
  public characterList: Character[] =[{
    id: 'nn',
    name: 'Trunks',
    power: 10
  }]

  @Output()
  public onDelete: EventEmitter<string> = new EventEmitter();

  onDeleteCharacter(id?: string):void{
    // TODO: Emitir el ID del personaje

    if (!id) return;
    //console.log(index);
    this.onDelete.emit(id);
  }
}

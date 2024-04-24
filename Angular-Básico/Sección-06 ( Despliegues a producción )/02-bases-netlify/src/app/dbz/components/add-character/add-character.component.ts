import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-add-character',
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css'
})
export class AddCharacterComponent {

  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character = {
    name: '',
    power: 0
  };

  emitCharacter():void{
    if( this.character.name.length === 0 ) return;
    /*
    El operador spread (...) en JavaScript se utiliza para extraer las propiedades
    de un objeto. Al usar {...this.character}, estás creando una nueva instancia
    del objeto this.character, por lo que ahora el componente padre está recibiendo
    una copia del objeto, en lugar de una referencia a él.
    */
    this.onNewCharacter.emit({... this.character});

    this.character.name = '';
    this.character.power = 0;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price:  2500,
  inStorage: 6,
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent implements OnInit{
  /*
  Cuando se usa el FormGroup y FormControl debemos importar el ReactiveFormsModule en nuestro módulo contenedor en este caso
  en el reactive.modules.ts

  public myForm: FormGroup = new FormGroup({
    //new FormControl( valorPorDefecto, validaciones o validaciones[], validacionAsync o validacionAsync[] )
    name: new FormControl('',[],[]),
    price: new FormControl('',[],[]),
    inStorage: new FormControl('0',[],[]),
  })
  */

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  /*
  FormBuilder hace lo mismo que los FormControl pero de una manera más ordenada
  se debe hacer la inyección de la dependencia en el constructor
  */

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // this.myForm.reset( rtx5090 );
  }

  isValidField( field:string ):boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  getFieldError( field: string ):string | null {
    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`
      }
    }
    return null;
  }

  onSave(): void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    };

    console.log(this.myForm.value);

    this.myForm.reset( { price: 0, inStorage: 0 } )
  }
}

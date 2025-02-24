import {Control } from './control';
import {Company} from './company';
import {Token} from './token'


/**
* Esta clase se creo para representar el usuario y su token
*/
export class Usuario {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//

  //public control: Control;
  public company : Company;
   public token : Token;
  //public functions : Funciones;
  //---------------------------------------------//

  // parseo el mensaje
  constructor(user : any) {
    this.control = new Control (usuario.control);
    this.company = new Company(user.company);

    this.token = new Token(user.token);



  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Configuraciones } from '../../enviroments/configuraciones';
@Injectable({
  providedIn: 'root'
})
export class EnviromentService {

  constructor() { }

  /*

    App Sistema

  */
  get appNombre(): string {
    return environment.appNombre;
  }
  get appDescripcion(): string {
    return environment.appDescripcion;
  }
  get versionSistema(): string {
    return environment.versionSistema;
  }


  /*

    Urls

  */

  get urlBase(): string {
    return Configuraciones.urlBase;
  }
  get backgroundImageUrl():string{
    // imagen por default si hashId no tiene valor
    return "assets/media/images/login/bg2.jpg";
  }





}

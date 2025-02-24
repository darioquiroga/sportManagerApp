import { GlobalService } from './global.service';
import { Inject, Injectable, OnInit, PLATFORM_ID, Renderer2, RendererFactory2} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'
import { Configuraciones } from '../../enviroments/configuraciones';
import { Usuario } from '../models/user';
import { Cuenta } from '../models/cuenta';
import { Login } from '../models/login.interface';
import { Observable, timeout } from 'rxjs';
import { Template } from '../models/template';
import { Empresa } from '../models/company';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { StyleService } from './sytle.service';
import { isPlatformBrowser } from '@angular/common';



@Injectable({
  providedIn: 'root',
})
export class LoginService  {
  public usuarioActual: Usuario | any;
  public templateActivo: Template | any;
  public logueado: boolean = false;
  public static instancia: LoginService;
  public servicioDisponible = false;
  public static conexion: any;
  public cuenta: Cuenta | any;
  public versionServicio: string | any;
  public versionApp: string | any;
  public configuraciones = Configuraciones;
  public msgLoginRepuesta: string | any;
  public timeOut : any;
  constructor(private http: HttpClient, private globalService: GlobalService,
   ) {


  }







  async loginUser(login: Login, remember?: boolean): Promise<string> {

    try {
      const hash = CryptoJS.MD5(login.clave);
      const url = this.getURLServicio(login.usuario);
      const params = {};
      const httpOptions = {
        headers: new HttpHeaders({
          clave: hash.toString(),
        }),
      };

      const data: any = await this.http.post(url, params, httpOptions).toPromise();
      this.usuarioActual = data;

      if (data.datos.empresa.AccesoAppMovil === true) {
        if (this.usuarioActual.control.codigo === 'OK') {
          const control = this.usuarioActual.control;
          this.usuarioActual = new Usuario(this.usuarioActual.datos);
          this.globalService.setUsuarioLogueado(this.usuarioActual)
          this.templateActivo = data.datos.templates
          this.globalService.settemplateActivo(this.templateActivo)
          this.logueado = true;
          this.versionServicio = control.version;
         return control;

        } else {
          this.logueado = false
          this.globalService.logout();
          return '';
        }
      } else {
        this.logueado = false
        this.globalService.logout();
        return '';
      }
    } catch (error: any) {

      const dataError = JSON.stringify(error.error.control);
      return JSON.parse(dataError)

    }
  }



  /*
    Éste método valida que se pueda hacer login con las credenciales guardadas.
    devuelve true o false según se pudo o no.
  */


  public logout(): void {
    this.globalService.logout();

  }



  /**
   * Esta funcion devuelve la URL del servicio
   */
  private getURLServicio(usuario: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    console.log("-------------------------> "+Configuraciones.authUrl+usuario)
    return Configuraciones.authUrl+usuario;
  }




  public getUrlTestToken(usuario: string): string {
    return Configuraciones.authUrl + usuario + '/testToken';
  }




// Verificar si el usuario está autenticado
 isAuthenticated(): any {
  return this.globalService.getUsuarioLogueado() !== null;

}




  /**
   * Esta funcion devuelve la URL del recurso Dummy
   */
  private getURLDummy() {
    return Configuraciones.dummyUrl;
  }
}

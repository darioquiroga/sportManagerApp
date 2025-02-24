// src/app/global.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { Configuraciones } from '../../enviroments/configuraciones';
import { Template } from '../models/template';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private empresa: any = null;
  private usuarioLogueado: any = null;
  public servicioDisponible = false;
  public templateActivo: Template | undefined;


  constructor(private http: HttpClient) {

  }

  /*

  Empresa

  */
  setEmpresa(data: any): void {
    localStorage.setItem("empresa", data);

  }

  getEmpresa(): any {
    return localStorage.getItem("empresa");
  }



  /*

  Status gestagro

  */

  setStatusGestagro(data: any): void {
    this.servicioDisponible = data;
  }

  getStatusGestagro(): any {
    return this.servicioDisponible;
  }

  clearStatusGestagro(): void {
    this.servicioDisponible = false;

  }

  // template activo ///
  settemplateActivo(data:any):void{
    localStorage.setItem("templateActivo", JSON.stringify(data));

  }
  getTemplateActivo(): any{
    const template = localStorage.getItem('templateActivo');
    return  template ? JSON.parse(template) : null;
  }

  /*

  Usuario Logueado

  */
  setUsuarioLogueado(data: any): void{
    localStorage.setItem("usuarioLogueado", JSON.stringify(data));

  }
  getUsuarioLogueado(): any  {
    const usuario = localStorage.getItem('usuarioLogueado');
    return usuario ? JSON.parse(usuario) : null;
  }

  logout(): void {
    localStorage.removeItem('usuarioLogueado');
    localStorage.clear()
    this.usuarioLogueado = null;
    this.empresa = null;
  }


  /*
  Verificacion si el servicio web esta disponible o no
  */

  validarServicioSiEstaDisponible(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.get(this.getURLDummy());

  }





  /**
   * Esta funcion devuelve la URL del recurso Dummy
   */
  private getURLDummy() {
    return Configuraciones.dummyUrl;
  }

}

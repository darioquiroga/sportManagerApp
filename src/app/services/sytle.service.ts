import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { EnviromentService } from './enviroment.service';
import { GlobalService } from './global.service';
@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor(
    private environmentService: EnviromentService,
    private globalService: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getBackgroundImageUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return this.environmentService.backgroundImageUrl;
    } else if (isPlatformServer(this.platformId)) {
      return this.environmentService.backgroundImageUrl; // Servir una URL por defecto en SSR
    }
    return '';
  }


  getStyleTemplate(elemento:string, propiedad:string) {
    // aca implemento la llamada al servicio para traer todos los estilos que voy a aplicar
    const template = this.globalService.getTemplateActivo()
    for (let i = 0; i < template[0].estilos.length; i++) {
      const estilo = template[0].estilos[i];
      if (estilo.elemento == elemento && estilo.propiedad == propiedad){
        return estilo.valor
      }

    }
  }

}

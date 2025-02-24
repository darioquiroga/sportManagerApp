
export class Control {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public code : string;
  public description: string;
  public descriptionExtra: string;
  public version: string;
  public versionLib : string;
  //---------------------------------------------//

  // parseo el mensaje
  constructor(control : any){
      this.code = control.codigo;
      this.description = control.nombre;
      this.descriptionExtra = control.email;
      this.version = control.version;
      this.versionLib = control.versionLib;
  }
}

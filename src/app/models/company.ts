/**
* Esta clase se creo para representar la parte del mensaje que contiene los
* datos de la empresa
*/
export class Company{

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public id : string;
  public nombre : string;
  public nombreCompleto : string;
  public cuit : string;
  public direccion: string;
  public telefonos: string;
  public informacionContacto : string;
  public horariosAtencion : string;
  public dominio : string;
  public email : string;
  public accesoAppMovil: string;
  public accesoAppMovilPropietaria:string;
  public coopeHash : string;
  public googleMaps: string;




  //---------------------------------------------//

  // parseo el mensaje
  constructor( empresa:any ){
    this.id = empresa.Id;
    this.nombre = empresa.Nombre;
    this.nombreCompleto = empresa.NombreCompleto;
    this.cuit = empresa.Cuit;
    this.direccion = empresa.Direccion;
    this.telefonos = empresa.Telefonos;
    this.informacionContacto = empresa.InformacionContacto;
    this.horariosAtencion = empresa.HorariosAtencion;
    this.dominio = empresa.Dominio;
    this.email = empresa.Email;
    this.accesoAppMovil = empresa.AccesoAppMovil;
    this.accesoAppMovilPropietaria = empresa.accesoAppMovilPropietaria;
    this.coopeHash = empresa.CoopeHash;
    this.googleMaps = empresa.googleMaps;


  }
}

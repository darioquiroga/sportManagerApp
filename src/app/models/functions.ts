/*
    Esta clase sirve como modelo de las funcionalidades
    que tiene habilitadas el usuario logueado.
*/
export class Functios {

    private functionsList : [string];

    constructor(functionsList: [string]){
        this.functionsList = functionsList;
    }

    public isFunctions(funcion : string) : boolean{
        return this.functionsList.lastIndexOf(funcion) > -1;
    }
}

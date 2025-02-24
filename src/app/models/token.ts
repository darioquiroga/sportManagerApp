export class Token {
    public hashId : string = "";
    public dateIn : string = "";
    public dateEnd : string = "";
    constructor(token : any){
        this.hashId = token.id;
        this.dateIn = token.dateIn;
        this.dateEnd = token.dateIn;
    }
}
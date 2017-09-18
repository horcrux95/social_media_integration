
export class Guser {
    public email : string;
    public token : string;
    public id    : string;
    public img   :string;
    constructor( email : string, 
                 token : string, 
                 id    : string,
                 img : string)
    {
        this.email = email;
        this.token = token;
        this.id    = id;
        this.img   = img;

    }
}
import { User } from "./user";

export class Club{
    private _id?: number;
    public get id():number | undefined{
        return this._id;
    }
    public set id(value: number | undefined ){
        this._id = value;
    }

    private _name?: string;
    public get name():string | undefined{
        return this._name;
    }
    public set name(value: string | undefined ){
        this._name = value;
    }

    private _supervisor?: User;
    public get supervisor():User | undefined{
        return this._supervisor;
    }
    public set supervisor(value: User | undefined ){
        this._supervisor = value;
    }


    constructor(data?:{
        id?:number,
        name?:string,
        supervisor?:User,
    } | Club){
        if(data){
            if(data.id){
                this.id = data.id;
            }
            if(data.name){
                this.name = data.name;
            }
            if(data.supervisor){
                this.supervisor = data.supervisor;
            }
        }
    }

}
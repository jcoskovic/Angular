export class User {
    private _id?: number;
    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }

    private _name?: string;
    public get name(): string | undefined {
        return this._name;
    }
    public set name(value: string | undefined) {
        this._name = value;
    }

    private _email?: string;
    public get email(): string | undefined {
        return this._email;
    }
    public set email(value: string | undefined) {
        this._email = value;
    }

    constructor(data?: {
        id?: number,
        name?: string,
        email?: string,
    } | User) {
        if (data) {
            if (data.id !== undefined) {
                this.id = data.id;
            }
            if (data.name !== undefined) {
                this.name = data.name;
            }
            if (data.email !== undefined) {
                this.email = data.email;
            }
        }
    }
}

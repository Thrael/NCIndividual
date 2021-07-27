export class BusEvent {
    public type: string;
    public code: string;
    public message: string|null;
    public relatedObject: object|null;

    constructor(type:string, code:string, message:string|null = null, relatedObject:object|null = null) {
        this.type = type;
        this.code = code;
        this.message = message;
        this.relatedObject = relatedObject;
    }
}
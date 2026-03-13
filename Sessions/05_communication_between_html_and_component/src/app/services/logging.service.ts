import {Injectable} from '@angular/core';
@Injectable()
export class Logging {
    message:string = "hello"; 

    constructor(){
        console.log(this.message)
    }

}
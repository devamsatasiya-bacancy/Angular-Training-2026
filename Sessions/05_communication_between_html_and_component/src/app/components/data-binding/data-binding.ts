import { Component, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.scss',
})
export class DataBinding {

  public userData = signal({
                    "id":1,
                    "firstName":"Terry",
                    "lastName":"Medhurst",
                    "maidenName":"Smitham",
                    "age":50,
                    "gender":"male",
                    "email":"atuny0@sohu.com",
                    "phone":"+63 791 675 8914",
                    "username":"atuny0",
                    "password":"9uQFF1Lh",
                    "birthDate":"2000-12-25",
                    "image":"https://robohash.org/Terry.png?set=set4",
                    "bloodGroup":"A-",
                    "height":189,
                    "weight":75.4,
                    "eyeColor":"Green", 
                    "domain":"slashdot.org",
                    "ip":"117.29.86.254", 
                    "macAddress":"13:69:BA:56:A3:74",
                    "university":"Capitol University",  
                    "ein":"20-9487066",
                    "ssn":"661-64-2976",
                    "userAgent":"Mozilla/5.0 ..."
                    }
);

  public inputdata:string = "hello";

  
  public togglebuttonvalue = signal<boolean>(true);

  handleToggleButton():void{
    this.togglebuttonvalue.update(value => !value);
  }
}

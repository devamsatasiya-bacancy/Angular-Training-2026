import { Component, Input, signal } from '@angular/core';
import { UserModel } from '../../models/UserModel';
import { CurrencyConvertPipe } from '../../pipes/currency-convert-pipe';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { AdharNumberEllipsizePipe, TextEllipsizePipe } from '../../pipes/text-ellipsize-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [CurrencyConvertPipe , DatePipe , AdharNumberEllipsizePipe , TextEllipsizePipe , UpperCasePipe , FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  @Input() user: UserModel | null = null;

  protected currentCurrency : string = 'USD';
}

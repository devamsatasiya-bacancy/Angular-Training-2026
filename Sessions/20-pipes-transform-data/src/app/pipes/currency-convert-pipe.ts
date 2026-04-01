import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConvert',
})
export class CurrencyConvertPipe implements PipeTransform {
  transform(value: number, currency: string = 'USD'): unknown {
    /*
    a map of currency conversion rates and symbols for supported currencies
     these conversionrates are wrt. US Dollars
     */
    const conversionRates: { [key: string]: number } = {
      INR: 94,
      USD: 1,
      EUR: 0.85,
      JPY: 110,
    };
    const currencySymbols: { [key: string]: string } = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      JPY: '¥',
    };

    // check if the provided currency is supported
    if (conversionRates[currency]) {
      const convertedValue = value * conversionRates[currency];
      return `${currencySymbols[currency]}${convertedValue.toFixed(2)}`;
    }
    return null;
  }
}

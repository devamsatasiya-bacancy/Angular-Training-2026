# Angular Pipes - Transform Data

This project demonstrates the use of **Angular Pipes** to transform and format data in templates. It showcases both built-in Angular pipes and custom pipes for real-world scenarios.

## Project Overview

This application displays user profiles with various data transformations using pipes. It demonstrates how pipes can format currencies, dates, text, and sensitive information like Aadhar numbers.

## Pipes Used

### 1. **Built-in Angular Pipes**

#### `AsyncPipe`

- **Location**: `src/app/pages/user-dashboard/user-dashboard.html`
- **Usage**: `users$ | async`
- **Purpose**: Automatically subscribes to the Observable `users$` from UserService and unwraps the emitted values for template rendering

#### `DatePipe`

- **Location**: `src/app/components/user-profile/user-profile.html`
- **Usage**: `{{ user.joiningDate | date }}`
- **Purpose**: Formats the joining date into a readable date format

#### `UpperCasePipe`

- **Location**: `src/app/components/user-profile/user-profile.html`
- **Usage**: `user.address.street + ', ' + user.address.city | uppercase`
- **Purpose**: Converts the concatenated address string to uppercase before further processing

### 2. **Custom Pipes**

#### `CurrencyConvertPipe`

- **Location**: `src/app/pipes/currency-convert-pipe.ts`
- **Name**: `currencyConvert`
- **Usage**: `{{ user.salary | currencyConvert : currentCurrency }}`
- **Purpose**: Converts salary from USD to selected currency (INR, EUR, JPY) with proper symbols
- **Parameters**:
  - `value`: number - The amount in USD
  - `currency`: string - Target currency code (default: 'USD')
- **Supported Currencies**: USD ($), INR (₹), EUR (€), JPY (¥)

#### `TextEllipsizePipe`

- **Location**: `src/app/pipes/text-ellipsize-pipe.ts`
- **Name**: `textEllipsize`
- **Usage**: `{{ user.address... | uppercase | textEllipsize: 20 }}`
- **Purpose**: Truncates long text to specified length and adds ellipsis (...)
- **Parameters**:
  - `value`: string - The text to truncate
  - `maxlength`: number - Maximum characters to display (default: 20)
  - `ellipsis`: string - Suffix to add (default: '...')

#### `AdharNumberEllipsizePipe`

- **Location**: `src/app/pipes/text-ellipsize-pipe.ts`
- **Name**: `adharNumberEllipsize`
- **Usage**: `{{ user.adharNumber | adharNumberEllipsize: 4 : 'XXXX ' }}`
- **Purpose**: Masks sensitive Aadhar number showing only last N digits
- **Parameters**:
  - `value`: string - The Aadhar number
  - `lastLength`: number - Number of digits to show from end (default: 4)
  - `ellipsis`: string - Masking pattern (default: 'XXXX ')

## Pipe Chaining Example

The address field demonstrates pipe chaining:

```typescript
user.address.street + ', ' + user.address.city + ', ' + user.address.state + ', ' + user.address.zipCode
  | uppercase
  | textEllipsize: 20
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Project Structure

```
src/app/
├── components/
│   └── user-profile/          # User profile display component
├── pages/
│   └── user-dashboard/        # Main dashboard page
├── pipes/
│   ├── currency-convert-pipe.ts    # Currency conversion pipe
│   └── text-ellipsize-pipe.ts      # Text truncation & masking pipes
├── services/
│   └── user-service.ts        # User data service
└── models/
    └── UserModel.ts           # User & Address interfaces
```

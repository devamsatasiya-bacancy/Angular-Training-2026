import { Component } from '@angular/core';

import { ContactUsForm } from '../../components/contact-us-form/contact-us-form';

@Component({
  selector: 'app-contact-us',
  imports: [ContactUsForm],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs {}

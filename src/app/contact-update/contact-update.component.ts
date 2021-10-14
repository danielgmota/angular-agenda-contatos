import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  id: any;
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(private contactsService: ContactsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'] || null;
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');

      this.contactsService.retrieveContacts(this.id).subscribe(contact => {
        this.contactForm.reset(contact);
      },
      (error) => {
        console.log(error);
      });
    });
  }

  updateContact(){
    this.contactsService.updateContact({id: this.id, ...this.contactForm.value})
    .subscribe(contact => {
      this.contactForm.reset(contact);
    })
  }
}

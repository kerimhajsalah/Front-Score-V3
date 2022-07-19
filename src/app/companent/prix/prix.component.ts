import { Component, OnInit,Injectable,Inject,VERSION } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup, FormControl , FormArray, FormBuilder, Validators, NgForm} from '@angular/forms';
import { PrixService } from '../../../app/services/prix.service';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
@Component({
  selector: 'app-prix',
  templateUrl: './prix.component.html',
  styleUrls: ['./prix.component.css']
})
export class PrixComponent implements OnInit {
  form: FormGroup;
  description:string;
  desc:string;
  title:string;
  prix:string;
  currency:string;
  fileToUpload:any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PrixComponent>,
    private http :HttpClient,
    private _prix: PrixService,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
}

  ngOnInit(): void {
    this.form = this.fb.group({
      desc: [this.desc, []],
      title: [this.title, []],
     prix: [this.prix, []],
     currency: [this.currency, []],
  });
  this._prix.getPrixForm().subscribe((result)=>{
  /*   console.log("result",result[0].prix) */
    this.desc=result[0].desc;
    this.title=result[0].title;
    this.prix=result[0].prix;
    this.currency=result[0].currency
    this.form = this.fb.group({
      desc: [this.desc, []],
      title: [this.title, []],
     prix: [this.prix, []],
     currency: [this.currency, []],
  });
 
  })
  }
  save() {
  /*   console.log(this.form) */
    this.dialogRef.close(this.form.value);
}

}

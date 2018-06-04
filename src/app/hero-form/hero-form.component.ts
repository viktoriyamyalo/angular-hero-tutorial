import { Component, OnInit } from '@angular/core';
import { HeroApplication } from '../hero-application';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  powers = ['1', '2', '3', '4'];
  model = new HeroApplication(18, 'Thunderstorm', this.powers[0], 'Ashley');
  submitted = false;
  onSubmit() {
    this.submitted = true;
  }

  newHero() {
    this.model = new HeroApplication(42, '', '');
  }

  get diagnostic() {return JSON.stringify(this.model);}

}

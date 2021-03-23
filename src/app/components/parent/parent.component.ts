import {Component, Input, OnInit} from '@angular/core';
import {element} from 'protractor';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.categoryList = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]
    this.budgetRange = {from: 0, to: 0};
    this.weatherRange = {from: 0, to: 0};
  }

  categoryList;
  inputList;
  budgetRange: {from: number, to: number}
  weatherRange: {from: number, to: number}

  checkTypes(num : any){
    this.categoryList[num] = !this.categoryList[num];
    if (num == 0){
      if (this.categoryList[num] == true)
      for ( let i = 0; i < 6 ; i++)
        this.categoryList[i] = true;
      else
        for ( let i = 0; i < 6 ; i++)
          this.categoryList[i] = false;
    }
  }

  checkInputsBudget(num){
    this.budgetRange.from = num.from;
    this.budgetRange.to = num.to;
  }

  checkInputsWeather(num){
    this.weatherRange.from = num.from;
    this.weatherRange.to = num.to;
  }


}

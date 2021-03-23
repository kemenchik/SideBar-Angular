import {Component, OnInit, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.maxCost = 1000;
    this.minCost = 0;
    this.stepCost = 100;
    this.sliderInit();
  }

  maxCost;
  minCost;
  stepCost;
  @Output() onCheckTypes = new EventEmitter<number>();
  @Output() inputCheckBudget = new EventEmitter<{from:number, to:number}>();
  @Output() inputCheckWeather = new EventEmitter<{from:number, to:number}>();
  check(num){
    if (num == 0){
      if ((<HTMLInputElement> document.getElementsByClassName('chill_type')[0]).checked == true)
        for (let i = 0; i < document.getElementsByClassName('chill_type').length; i++)
          (<HTMLInputElement> document.getElementsByClassName('chill_type')[i]).checked = true;
      else
        for (let i = 0; i < document.getElementsByClassName('chill_type').length; i++)
          (<HTMLInputElement> document.getElementsByClassName('chill_type')[i]).checked = false;
    }
    this.onCheckTypes.emit(num);
  }

  sliderInit(){
    let inputsRy = {
      sliderWidth: 200,
      minRange: 0,
      maxRange: 1000000,
      outputWidth: 30,
      thumbWidth: 10,
      thumbBorderWidth: 3,
      trackHeight: 5,
      theValue: [200000, 500000], // theValue[0] < theValue[1]

      minRange2: 0,
      maxRange2: 100,
      theValue2: [10, 30] // theValue[0] < theValue[1]
    };

    let inputCheckBudget = this.inputCheckBudget;
    let inputCheckWeather = this.inputCheckWeather;

    let isDragging0 = false;
    let isDragging1 = false;
    let isDragging2 = false;
    let isDragging3 = false;



    let range0 = inputsRy.maxRange - inputsRy.minRange;
    let range1 = inputsRy.maxRange2 - inputsRy.minRange2;
    let rangeStep0 = inputsRy.sliderWidth / range0;
    let rangeStep1 = inputsRy.sliderWidth / range1;
    let container = document.querySelectorAll(".container");
    let thumbRealWidth = inputsRy.thumbWidth + 2 * inputsRy.thumbBorderWidth;

// styles
    let slider = document.querySelectorAll(".slider");
    for (let i = 0; i < slider.length; i++) {
      (<HTMLElement> slider[i]).style.height = inputsRy.trackHeight + "px";
      (<HTMLElement> slider[i]).style.width = inputsRy.sliderWidth + "px";
    }


    let thumbs0 = document.querySelectorAll(".thumb0");
    let thumbs1 = document.querySelectorAll(".thumb1");
    for (let i = 0; i < thumbs0.length; i++) {
      (<HTMLElement> thumbs0[i]).style.width = (<HTMLElement> thumbs0[i]).style.height = (<HTMLElement> thumbs1[i]).style.width = (<HTMLElement> thumbs1[i]).style.height = inputsRy.thumbWidth + "px";
      (<HTMLElement> thumbs0[i]).style.borderWidth =  (<HTMLElement> thumbs1[i]).style.borderWidth = inputsRy.thumbBorderWidth + "px";
      (<HTMLElement> thumbs0[i]).style.top = (<HTMLElement> thumbs1[i]).style.top = -(inputsRy.thumbWidth / 2 + inputsRy.thumbBorderWidth - inputsRy.trackHeight / 2) + "px";
      (<HTMLElement> thumbs0[i]).style.left = (inputsRy.theValue[i] - inputsRy.minRange) * rangeStep0 - (thumbRealWidth / 2)  + "px";
      (<HTMLElement> thumbs1[i]).style.left = inputsRy.theValue2[i] + "px";
    }


//events

    thumbs0[0].addEventListener("mousedown", function() {
      isDragging0 = true;
      console.log("dada");
    }, false);
    thumbs0[1].addEventListener("mousedown", function() {
      isDragging1 = true;
    }, false);
    thumbs1[0].addEventListener("mousedown", function() {
      isDragging2 = true;
    }, false);
    thumbs1[1].addEventListener("mousedown", function() {
      isDragging3 = true;
    }, false);
    container[0].addEventListener("mouseup", function() {
      isDragging0 = false;
      isDragging1 = false;
      isDragging2 = false;
      isDragging3 = false;
      inputCheckBudget.emit({from: inputsRy.theValue[0], to: inputsRy.theValue[1]})
    }, false);
    container[0].addEventListener("mouseout", function() {
      isDragging0 = false;
      isDragging1 = false;
      isDragging2 = false;
      isDragging3 = false;
    }, false);
    container[1].addEventListener("mouseup", function() {
      isDragging0 = false;
      isDragging1 = false;
      isDragging2 = false;
      isDragging3 = false;
      inputCheckWeather.emit({from: inputsRy.theValue2[0], to: inputsRy.theValue2[1]})
    }, false);
    container[1].addEventListener("mouseout", function() {
      isDragging0 = false;
      isDragging1 = false;
      isDragging2 = false;
      isDragging3 = false;
    }, false);

    container[0].addEventListener("mousemove", function(evt) {
      let mousePos = oMousePos(this, evt);
      let theValue0 = (isDragging0) ? Math.round(mousePos.x / rangeStep0) + inputsRy.minRange : inputsRy.theValue[0];
      let theValue1 = (isDragging1) ? Math.round(mousePos.x / rangeStep0) + inputsRy.minRange : inputsRy.theValue[1];
      if (isDragging0) {
        if (theValue0 < theValue1 - (thumbRealWidth / 2) && theValue0 >= inputsRy.minRange) {
          inputsRy.theValue[0] = theValue0;
          (<HTMLElement> thumbs0[0]).style.left = (theValue0 - inputsRy.minRange) * rangeStep0 - (thumbRealWidth / 2) + "px";
          (<HTMLElement> slider[0]).style.paddingLeft = (theValue0 - inputsRy.minRange) * rangeStep0 + "px";
          (<HTMLInputElement> document.getElementById('inputNum1')).value = String(inputsRy.theValue[0]);
        }
      } else if (isDragging1) {
        if (theValue1 > theValue0 + (thumbRealWidth / 2) && theValue1 <= inputsRy.maxRange) {
          inputsRy.theValue[1] = theValue1;
          (<HTMLElement> thumbs0[1]).style.left = (theValue1 - inputsRy.minRange) * rangeStep0 - (thumbRealWidth / 2) + "px";
          (<HTMLInputElement> document.getElementById('inputNum2')).value = String(inputsRy.theValue[1]);
        }
      }
    }, false);

    container[1].addEventListener("mousemove", function(evt) {
      let mousePos = oMousePos(this, evt);
      let theValue0 = (isDragging2) ? Math.round(mousePos.x / rangeStep1) + inputsRy.minRange2 : inputsRy.theValue2[0];
      let theValue1 = (isDragging3) ? Math.round(mousePos.x / rangeStep1) + inputsRy.minRange2 : inputsRy.theValue2[1];
      if (isDragging2) {
        console.log(theValue0);
        if (theValue0 < theValue1 - (thumbRealWidth / 2) && theValue0 >= inputsRy.minRange2) {
          inputsRy.theValue2[0] = theValue0;
          (<HTMLElement> thumbs1[0]).style.left = (theValue0 - inputsRy.minRange2) * rangeStep1 - (thumbRealWidth / 2) + "px";
          (<HTMLElement> slider[0]).style.paddingLeft = (theValue0 - inputsRy.minRange2) * rangeStep1 + "px";
          (<HTMLInputElement> document.getElementById('inputNum3')).value = String(inputsRy.theValue2[0]);
        }
      } else if (isDragging3) {
        if (theValue1 > theValue0 + (thumbRealWidth / 2) && theValue1 <= inputsRy.maxRange2) {
          inputsRy.theValue2[1] = theValue1;
          (<HTMLElement> thumbs1[1]).style.left = (theValue1 - inputsRy.minRange2) * rangeStep1 - (thumbRealWidth / 2) + "px";
          (<HTMLInputElement> document.getElementById('inputNum4')).value = String(inputsRy.theValue2[1]);
        }
      }
    }, false);

// helpers

    function oMousePos(element, evt) {
      let ClientRect = element.getBoundingClientRect();
      return { //object
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
      }
    }
  }
}

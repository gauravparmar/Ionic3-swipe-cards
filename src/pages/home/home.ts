import { Component, ViewChild, ViewChildren, QueryList  } from '@angular/core';
import { NavController } from 'ionic-angular';

// For swipe cards
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
import { empty } from 'rxjs/observable/empty';
import { isEmpty } from 'rxjs/operator/isEmpty';
/// For swipe cards

@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})

export class HomePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  
  cards: Array<any>;
  // tempCards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  
  constructor(private http: Http) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 300;
      }
    };
  }
  
  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
    
    // this.cards = [{email: ''}];
    this.cards = [];
    this.addNewCards(3);
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);
    
    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    } 

    if(color.length>7){
      color='#FFFFFF';
    }

    // console.log('color :'+color.length);

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }
 
  // Connected through HTML
  voteUp(like: boolean) {
    console.log('voteup called with '+like);
    console.log('this.cards : '+JSON.stringify(this.cards));
    let removedCard = this.cards.pop();
    console.log('length '+Object.keys(removedCard).length);
    
    // if(Object.keys(removedCard).length == 0){
    //   console.log('Popped two cards');
    //   removedCard = this.cards.pop();
    // }
    console.log('removedCard : '+JSON.stringify(removedCard));
    this.addNewCards(1);
    if (like) {
      // this.recentCard = 'You liked: ' + removedCard.email;
      console.log('You liked: ' + removedCard.name.first+' '+removedCard.name.last);
    } else {
      // this.recentCard = 'You disliked: ' + removedCard.email;
      console.log('You disliked: ' + removedCard.name.first+' '+removedCard.name.last);
      // console.log('You disliked: ' + removedCard.email);
    }
  }

  // Add new cards to our array
  addNewCards(count: number) {
    this.http.get('https://randomuser.me/api/?results=' + count)
    .map(data => data.json().results)
    .subscribe(result => {
      for (let val of result) {
        console.log("pushing : "+JSON.stringify(val));
        // this.cards=this.cards.reverse();
        // if(this.cards.length>1){
        //   console.log('popping cards');
        //   let card2=this.cards.pop();
        //   console.log('popped'+card2);
        //   let card1=this.cards.pop();
        //   console.log('popped'+card1);
        // }
        let shiftCards,oldCard,oldCard2;
        shiftCards=false;
        if(this.cards.length==2){
          oldCard = this.cards.pop();
          oldCard2 = this.cards.pop();
          shiftCards=true;
        }
        this.cards.push(val);
        
        if(shiftCards){
          // console.log('Pushing oldCard '+oldCard);
          this.cards.push(oldCard2);
          this.cards.push(oldCard);
        }
        
        // if(this.cards.length>1){
        //   this.cards.push(card1);
        //   this.cards.push(card2);
        // }
        
        // this.cards=this.cards.reverse();
        // this.cards.unshift(val);
        // this.cards.reverse();
      }
      // this.cards=this.cards.reverse();
      console.log("cards : "+JSON.stringify(this.cards));
    })
  }

  // Add new cards to our array
  // addNewCards2(count: number) {
  //   this.http.get('https://randomuser.me/api/?results=' + count)
  //   .map(data => data.json().results)
  //   .subscribe(result => {
  //     for (let val of result) {
  //       console.log("pushing : "+JSON.stringify(val));
  //       // this.cards=this.cards.reverse();
  //       this.cards.unshift(val);
  //       // this.cards=this.cards.reverse();
  //       // this.cards.unshift(val);
  //       // this.cards.reverse();
  //     }
  //     // this.cards=this.cards.reverse();
  //     console.log("cards : "+JSON.stringify(this.cards));
  //   })
  // }
  
  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    
    return hex;
  }

  trackByCards(index:number,cardData:any){
    // console.log('trackByCards');
    // console.log(cardData);
    // console.log(cardData.email);
    // if(cardData)
      return cardData.email;
    // else
    //   return true;
  }

}
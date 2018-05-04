import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'calculator',
    templateUrl: 'calculator.html'
})

export class Calculator {
    public height: number;
    public weight: number;

    constructor(public alertCtrl: AlertController) {
    }

    private onSubmit(form): void {
        if(form.valid) {
            let alert = this.alertCtrl.create({
                title: 'BMI',
                subTitle: this.bmiCalculator().toString(),
                buttons: ['OK']
            })
            alert.present();
        }
    }

    private bmiCalculator(): number {
        //if(typeof this.height == "number") {
            return this.weight / Math.pow(this.height, 2) * 10000;
        //}
    }
}
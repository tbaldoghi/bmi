import { categoryService } from './../services/category.service';
import { Component, AfterViewInit } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';

@Component({
    selector: 'calculator',
    templateUrl: 'calculator.html'
})

export class Calculator implements AfterViewInit {
    public height: number;
    public weight: number;

    public data: Array<any>;

    public loading: boolean = true;
    private readonly MAX_VALUE: number = 300;

    constructor(public alertCtrl: AlertController, private category: categoryService) {
    }

    ngAfterViewInit() {
        this.init();
    }

    private init() {
        this.category.data.subscribe((data) => {
            this.data = data;
            this.loading = false;
        });
    }

    private onSubmit(form): void {
        if(form.valid) {
            let alert = this.alertCtrl.create({
                title: 'BMI',
                subTitle: this.bmiCalculator(),
                buttons: ['OK']
            })
            alert.present();
        }
    }

    private bmiCalculator(): string {
        if((this.height > 0 && this.height < this.MAX_VALUE) && (this.weight > 0 && this.weight < this.MAX_VALUE)) {
            let bmi = this.weight / Math.pow(this.height, 2) * 10000;
            let category = '';
            
            for (let item of this.data) {
                if(bmi > item.min && bmi < item.max) {
                    category = item.name;
                }
            }

            return bmi.toString() + "<br>" + category;
        } else {
            return "Rossz értékek!";
        }
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class categoryService {
     private readonly dataUrL: string = 'http://www.mocky.io/v2/5af01a52310000570096c471';
     public data: any;
     public dataObserver: any;

    constructor(private http: HttpClient) {
        this.data = Observable.create((observer) => {
            this.dataObserver = observer;
            this.init();
        });
    }

    private async init() {
        try {
            this.data = this.getHttpData().subscribe(async (element) => {
                this.dataObserver.next(element);
            });
        } catch (e) {
            console.log(e);
        }
    }

    private getHttpData(): any {
        return this.http.get(this.dataUrL);
    }

    public getData(): any {
        return this.data;
    }
}

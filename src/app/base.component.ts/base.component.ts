import {AfterViewInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {hasOwnProperty} from 'tslint/lib/utils';

export abstract class BaseComponent implements AfterViewInit, OnDestroy {

    baseSub = new Subscription();

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    ngAfterViewInit() {
        console.log('BaseComponent ngAfterViewInit');
        if (this.hasOwnProperty('baseEffects$')) {
            this.baseSub.add((this as any).baseEffects$.subscribe());
        }
    }

    ngOnDestroy(): void {
        console.log('BaseComponent ngOnDestroy');
        this.baseSub.unsubscribe();
    }

}

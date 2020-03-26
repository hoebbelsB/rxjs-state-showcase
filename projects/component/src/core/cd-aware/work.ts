import {Subscribable} from 'rxjs';
import {ChangeDetectorRef, NgZone} from '@angular/core';
import {getChangeDetectionHandler} from '../utils';
import {CdConfig} from './cd-aware.abstract';

export interface WorkConfig {
    context: any;
    ngZone: NgZone;
    cdRef: ChangeDetectorRef;
}

export function setUpWork(cfg: WorkConfig): () => void {
    const render: (component?: any) => void = getChangeDetectionHandler(
        cfg.ngZone,
        cfg.cdRef
    );
    return () => render(cfg.context);
}

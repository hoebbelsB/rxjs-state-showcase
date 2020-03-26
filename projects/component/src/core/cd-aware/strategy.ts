import {coalesce, generateFrames} from '@rx-state/rxjs-state';
import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {ChangeDetectorRef, NgZone} from '@angular/core';
import {getDetectChanges} from '../utils/get-change-detection-handling';
import {hasZone} from '../utils';
import {map} from 'rxjs/operators';

function getSaveDurationSelector(ngZone: NgZone): () => Observable<number> {
    return () => hasZone(ngZone) ? generateFrames(
        (window as any).__zone_symbol__requestAnimationFrame,
        (window as any).__zone_symbol__cancelAnimationFrame
    ) : generateFrames();
}

export interface StrategyFactoryConfig {
    component: any;
    ngZone?: NgZone;
    cdRef?: ChangeDetectorRef;
}

export interface CdStrategy<T> {
    behaviour?: (cfg?: any) => MonoTypeOperatorFunction<Observable<T>>;
    work: () => void;
}

export function createIdleStrategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    return {
        work: (): void => {
            cfg.cdRef.markForCheck();
        }
    };
}

export function createDummyStrategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    const zoneFull = hasZone(cfg.ngZone);
    const detectChanges = getDetectChanges(cfg.ngZone, cfg.cdRef);
    const durationSelector = getSaveDurationSelector(cfg.ngZone);
    const coalesceConfig = {context: cfg.cdRef['_lView'] as any};

    const behaviour = (o$: Observable<Observable<T>>): Observable<Observable<T>> => o$.pipe(
        map((value$) => zoneFull ?
            value$.pipe(coalesce(durationSelector, coalesceConfig)) :
            value$
        )
    );

    return {
        behaviour: () => behaviour,
        work: (): void => {
            detectChanges(cfg.component);
        }
    };
}


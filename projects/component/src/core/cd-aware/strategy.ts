import {coalesce, generateFrames} from '@rx-state/rxjs-state';
import {MonoTypeOperatorFunction, NEVER, Observable} from 'rxjs';
import {ChangeDetectorRef, NgZone} from '@angular/core';
import {getDetectChanges} from '../utils/get-change-detection-handling';
import {hasZone} from '../utils';
import {tap} from 'rxjs/operators';

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
    behaviour: (cfg?: any) => MonoTypeOperatorFunction<Observable<T>>;
    render: () => void;
}

export function getStrategies(cfg: StrategyFactoryConfig) {
    return {
        idle: createIdleStrategy(cfg),
        pessimistic1: createPessimistic1Strategy(cfg),
        pessimistic2: createPessimistic2Strategy(cfg),
        optimistic1: createOptimistic1Strategy(cfg),
        optimistic2: createOptimistic2Strategy(cfg)
    };
}

export function createIdleStrategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    return {
        render: (): void => {
            cfg.cdRef.markForCheck();
        },
        behaviour: () => o => o.pipe(tap(v => console.log('idle')))
    };
}
export function createPessimistic1Strategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    return {
        render: (): void => {
            cfg.cdRef.markForCheck();
        },
        behaviour: () => o => o.pipe(tap(v => console.log('pessimistic1')))
    };
}
export function createPessimistic2Strategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    return {
        render: (): void => {
            cfg.cdRef.markForCheck();
        },
        behaviour: () => o => o.pipe(tap(v => console.log('pessimistic2')))
    };
}
export function createOptimistic1Strategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    return {
        render: (): void => {
            cfg.cdRef.markForCheck();
        },
        behaviour: () => o => o.pipe(tap(v => console.log('optimistic1')))
    };
}
export function createOptimistic2Strategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    return {
        render: (): void => {
            cfg.cdRef.markForCheck();
        },
        behaviour: () => o => o.pipe(tap(v => console.log('optimistic2')))
    };
}

export function createDummyStrategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    const zoneFull = hasZone(cfg.ngZone);
    const detectChanges = getDetectChanges(cfg.ngZone, cfg.cdRef);
    const durationSelector = getSaveDurationSelector(cfg.ngZone);
    const coalesceConfig = {context: cfg.cdRef['_lView'] as any};

    const behaviour = (o$: Observable<Observable<T>>): Observable<Observable<T>> => zoneFull ?
        o$.pipe(coalesce(durationSelector, coalesceConfig)) :
        o$;

    return {
        behaviour: () => behaviour,
        render: (): void => {
            detectChanges(cfg.component);
        }
    };
}


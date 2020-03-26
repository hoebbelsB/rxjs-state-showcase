import {coalesce, generateFrames} from '@rx-state/rxjs-state';
import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {ChangeDetectorRef, NgZone, ɵmarkDirty, ɵdetectChanges} from '@angular/core';
import {getDetectChanges} from '../utils/get-change-detection-handling';
import {hasZone, isIvy} from '../utils';

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

/**
 * Idle Strategy
 *
 * This strategy is the drop-in replacement for Angular's built-in `async` pipe. This is the only strategy that **does not also work in zone-less environments**.
 *
 * - \>=ViewEngine
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | cdRef.markForCheck | ❌         | None           |
 * | ZoneLess | cdRef.markForCheck | ❌         | None           |
 *
 * - Ivy
 *
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | cdRef.markForCheck | ❌         | None           |
 * | ZoneLess | cdRef.markForCheck | ❌         | None           |
 */
export function createIdleStrategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    return {
        render: (): void => {
            cfg.cdRef.markForCheck();
        },
        behaviour: () => o => {
            console.log('idle');
            return o;
        }
    };
}

/**
 *
 * Pessimistic1 Strategy
 *
 * This strategy is providing only Angular built-in features.
 *  If Ivy is present it uses the latest methods as they are.
 *
 * - \>=ViewEngine
 *
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | cdRef.markForCheck | ❌         | None           |
 * | ZoneLess | cdRef.detectChange | ✔️         | None           |
 *
 * - Ivy
 *
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | ɵmarkDirty         | ❌         | None           |
 * | ZoneLess | ɵmarkDirty         | ❌         | None           |
 */
export function createPessimistic1Strategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    const inIvy = isIvy();
    const inZone = hasZone(cfg.ngZone);
    const durationSelector = getSaveDurationSelector(cfg.ngZone);
    const renderMethod = inIvy ? ɵmarkDirty : inZone ? cfg.cdRef.markForCheck : cfg.cdRef.detectChanges

    const behaviour = (o$: Observable<Observable<T>>): Observable<Observable<T>> => {
        console.log('pessimistic1');
        return !inZone && inIvy ?
            o$.pipe(coalesce(durationSelector)) :
            o$;
    };

    return {
        behaviour: () => behaviour,
        render: (): void => {
            renderMethod(cfg.component);
        }
    };
}

/**
 *  Pessimistic2 Strategy
 *
 * This strategy is providing only Angular built-in features and optimized behavior in the ZoneLess environment.
 * If Ivy is present it uses the latest methods as they are.
 *
 * - \>=ViewEngine
 *
 *  |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | cdRef.markForCheck | ❌         | None           |
 * | ZoneLess | cdRef.detectChange | ✔️         | Component      |
 *
 * - Ivy
 *
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | ɵmarkDirty         | ❌         | None           |
 * | ZoneLess | ɵmarkDirty         | ❌         | None           |
 */
export function createPessimistic2Strategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    const inIvy = isIvy();
    const inZone = hasZone(cfg.ngZone);
    const durationSelector = getSaveDurationSelector(cfg.ngZone);

    const renderMethod = inIvy ? ɵmarkDirty : inZone ? cfg.cdRef.markForCheck : cfg.cdRef.detectChanges;
    const coalesceConfig = !inIvy ? {context: cfg.component as any} : undefined;

    const behaviour = (o$: Observable<Observable<T>>): Observable<Observable<T>> => {
        console.log('pessimistic2');
        return !inZone ?
            o$.pipe(coalesce(durationSelector, coalesceConfig)) :
            o$;
    };

    return {
        behaviour: () => behaviour,
        render: (): void => {
            renderMethod(cfg.component);
        }
    };
}

/**
 * Optimistic1 Strategy
 *
 *  - \>=ViewEngine
 *
 *  |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | cdRef.markForCheck | ❌         | None           |
 * | ZoneLess | cdRef.detectChange | ✔️         | Component      |
 *
 *  - Ivy
 *
 *  |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | ɵmarkDirty         | ❌         | None           |
 * | ZoneLess | ɵdetectChanges     | ✔️         | LView          |
 */
export function createOptimistic1Strategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    const inIvy = isIvy();
    const inZone = hasZone(cfg.ngZone);
    const durationSelector = getSaveDurationSelector(cfg.ngZone);

    const renderMethod = inIvy ?
        (inZone ? ɵmarkDirty :  ɵdetectChanges) :
        (inZone ? cfg.cdRef.markForCheck : cfg.cdRef.detectChanges);
    const coalesceConfig = {context: (inIvy ? cfg.cdRef['_lView'] : cfg.component) as any};

    const behaviour = (o$: Observable<Observable<T>>): Observable<Observable<T>> => {
        console.log('optimistic1');
        return inZone ?
            o$.pipe(coalesce(durationSelector, coalesceConfig)) :
            o$;
    };

    return {
        behaviour: () => behaviour,
        render: (): void => {
            renderMethod(cfg.component);
        }
    };
}

/**
 * Optimistic2 Strategy
 *
 * This strategy is then the most performing one and integrated all optimizations.
 *
 * - \>=ViewEngine
 *
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | cdRef.detectChange | ✔️         | Component      |
 * | ZoneLess | cdRef.detectChange | ✔️         | Component      |
 *
 * - Ivy
 *
 * |          | Render Method      | Coalescing | Coalesce Scope |
 * | -------- | -------------------| ---------- | -------------- |
 * | ZoneFull | ɵdetectChange      | ✔️         | LView          |
 * | ZoneLess | ɵdetectChanges     | ✔️         | LView          |
 */
export function createOptimistic2Strategy<T>(cfg: StrategyFactoryConfig): CdStrategy<T> {
    const inIvy = isIvy();
    const detectChanges = getDetectChanges(cfg.ngZone, cfg.cdRef);
    const durationSelector = getSaveDurationSelector(cfg.ngZone);
    const coalesceConfig = {context: (inIvy ? cfg.cdRef['_lView'] : cfg.component) as any};

    const behaviour = (o$: Observable<Observable<T>>): Observable<Observable<T>> => {
        console.log('optimistic2');
        return o$.pipe(coalesce(durationSelector, coalesceConfig));
    };

    return {
        behaviour: () => behaviour,
        render: (): void => {
            detectChanges(cfg.component);
        }
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


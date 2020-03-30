# @ngrx/component

The Component package is a set of primitive reactive helpers to enable fully reactive, fully zone-less applications.

## Introduction

This package includes primitives that act as the glue in reactive Angular applications.
They take over rendering and provide reactivity to parts where Angular doesn't out of the box. 

## Reactive Helpers

### Template Bindings

To render observable values this package provides a set of template bindings helpers to trigger rendering:

  - [Push Pipe](guide/component/push)
  - [Let Directive](guide/component/let)

### RxJS Operators

To render observable values, or fix change detection this package provides a set of helpers operators trigger rendering:
  - [generateFrames](guide/component/rxjs/generateFrames)
  - [coalesce](guide/component/rxjs/operators/coalesce)

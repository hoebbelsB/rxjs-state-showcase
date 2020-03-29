// this._context.isCoalescing = false

// Object: this._context (always different)
// Property: 'isCoalescing' (always the same)


type context = {} & object;

export interface Properties {
    isCoalescing: boolean;
}

const propertyMap = new WeakMap<context, Properties>();

export function getProperties(ctx: context): Properties {
    let properties: Properties = propertyMap.get(ctx);
    if (!properties) {
        properties = {
            isCoalescing: hasKey(ctx, 'isCoalescing') ? ctx.isCoalescing : false,
        };
        propertyMap.set(ctx, properties);
    }
    return properties;
}

export function setProperties(ctx: context, props: Partial<Properties>): Properties {
    const properties: Properties = getProperties(ctx);
    Object.entries(props).forEach(([prop, value]) => {
        properties[prop] = value;
    });
    propertyMap.set(ctx, properties);
    return properties;
}

function hasKey<K extends { [key: string]: any }>(ctx: any, property: keyof K): ctx is K {
    return ctx[property] != null;
}

// ===========================

const someObject = {
    foo: 'bar'
};

console.log('someObject', someObject);
// { foo: 'bar' }
setProperties(someObject, {isCoalescing: true});

console.log('someObject', someObject);
// { foo: 'bar' }

const props = getProperties(someObject);
console.log('props', props);
// { isCoalescing: true }

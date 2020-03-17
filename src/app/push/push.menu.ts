import {MenuItem} from '@navigation';


export const MENU_ITEMS: MenuItem[] = [
    // 01. One single-shot observable bound by one ngrxPush as template expression
    {
        link: 'push-01',
        label: 'Push Pipe 01'
    },
    // 02. One single-shot observable bound by multiple ngrxPush as template expression
    {
        link: 'push-02',
        label: 'Push Pipe 02'
    },
    // 03. Multiple single-shot observables bound by multiple ngrxPush as template expression
    {
        link: 'push-03',
        label: 'Push Pipe 03'
    },
    // 04. one sync multi-shot observables bound by multiple ngrxPush as template expression
    {
        link: 'push-04',
        label: 'Push Pipe 04'
    },
    // 11. One single-shot observable bound by one ngrxPush as input binding
    {
        link: 'push-11',
        label: 'Push Pipe 11'
    },
    // 12. One single-shot observable passed directly to input binding rendered over ngrxPush
    {
        link: 'push-12',
        label: 'Push Pipe 12'
    },
    // 13. One single-shot observable bound by multiple ngrxPush as input binding
    {
        link: 'push-13',
        label: 'Push Pipe 13'
    },
    // 14. Multiple single-shot observables bound by multiple ngrxPush as input binding
    {
        link: 'push-14',
        label: 'Push Pipe 14'
    },
    // 21. One single-shot observable bound by one ngrxPush as input binding. The nested components uses ngrxPush to render changes.
    {
        link: 'push-21',
        label: 'Push Pipe 21'
    }
];

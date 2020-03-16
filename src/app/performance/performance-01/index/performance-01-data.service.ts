import { Injectable } from '@angular/core';
import persons from '../../../data/data.json';

export interface Person {
    _id: string;
    isActive: boolean;
    balance: string;
    picture: string;
    eyeColor: string;
    company: string;
    phone: string;
    address: string;
    name: string;
    age: number;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class Performance01DataService {

    constructor() { }

    getData(limit?: number): Person[] {
        let data: Person[] = persons;
        if (limit) {
            data = data.slice(0, limit);
        }
        return data;
    }
}

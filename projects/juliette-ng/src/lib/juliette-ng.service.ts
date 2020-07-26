import { Injectable } from '@angular/core';
import { sum } from 'juliette';

@Injectable({
  providedIn: 'root',
})
export class JulietteNgService {
  constructor() {}

  sum(a: number, b: number): number {
    return sum(a, b);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomCharacterService {

  constructor() { }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public randomLowerCase(): string {
    const code = this.randomInt(97, 122);
    return String.fromCharCode(code);
  }

  public randomUpperCase(): string {
    const code = this.randomInt(65, 90);
    return String.fromCharCode(code);
  }

  public randomDigit(): string {
    return this.randomInt(0, 9).toString();
  }

  public randomSymbol(): string {
    const symbols = ".,;:/!&~'{}()[]-|^$£µ*+@",
      randomIndex = this.randomInt(0, symbols.length - 1);
    return symbols[randomIndex];
  }
}

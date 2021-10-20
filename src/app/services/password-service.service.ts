import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Params } from '../types/Params';
import { RandomCharacterService } from './random-character.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordServiceService {
  private passwordLength: number = 15;
  private params: Params = {
    uppercase: true,
    lowercase: true,
    digits: true,
    symbols: false,
  };
  private password!: string;
  public passwordSubject = new Subject<string>();
  public copySuccessSubject = new Subject<boolean>();

  constructor(private charService: RandomCharacterService) { }

  public getPassword(): string {
    return this.password;
  }

  // ===== ===== ===== ===== =====
  // Parameters logic
  // ===== ===== ===== ===== =====

  private isNoParamSet(): boolean {
    return Object.values(this.params).every(bool => bool === false);
  }

  public getParam(key: keyof Params): boolean {
    return this.params[key];
  }

  public setParam(key: keyof Params, value: boolean): void {
    this.params[key] = value;
    this.emitPassword();
  }

  public setLength(value: number) {
    this.passwordLength = value;
    this.emitPassword();
  }

  // ===== ===== ===== ===== =====
  // Password generation logic
  // ===== ===== ===== ===== =====

  private shufflePassword(): void {
    this.password = this.password
      .split("")
      .sort(() => Math.random() - .5)
      .join("");
  }

  private addCharacter(param: keyof Params): void {
    switch (param) {
      case "lowercase":
        this.password += this.charService.randomLowerCase();
        break;
      case "uppercase":
        this.password += this.charService.randomUpperCase();
        break;
      case "digits":
        this.password += this.charService.randomDigit();
        break;
      case "symbols":
        this.password += this.charService.randomSymbol();
    }
  }

  private addCharacters(): void {
    main: while (true) {
      let param: keyof Params;
      for (param in this.params) {
        if (this.password.length === this.passwordLength)
          break main;

        if (!this.params[param])
          continue;

        this.addCharacter(param);
      }
    }
  }

  public generatePassword(): string {
    if (this.isNoParamSet())
      return "";

    this.password = "";
    this.addCharacters();
    this.shufflePassword();
    return this.password;
  }

  public emitPassword(): void {
    this.generatePassword();
    this.passwordSubject.next(this.password);
  }

  // ===== ===== ===== ===== =====
  // Success message
  // ===== ===== ===== ===== =====

  public showCopySuccess() {
    this.copySuccessSubject.next(true);
  }
}

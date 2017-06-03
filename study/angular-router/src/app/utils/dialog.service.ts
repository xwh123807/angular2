import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

  constructor() { }

  confirm(message: string): Promise<boolean> {
    return new Promise<boolean>(r => {
      return r(window.confirm(message || 'Is it OK?'));
    });
  }
}

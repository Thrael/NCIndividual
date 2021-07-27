import { Subject, Subscription, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { BusEvent } from './bus-event';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private observerMap: Map<String, Subject<BusEvent>> = new Map();
  constructor(private toastService: ToastService) { }

  public subscribe(type: string, callback: (event:BusEvent) => void): Subscription {
    return this.getSubject(type).subscribe(event => callback(event));
  }

  private getSubject(type: string): Subject<BusEvent> {
    if (!this.observerMap.has(type)) {
      this.observerMap.set(type, new Subject());
    }
    return this.observerMap.get(type)!;
  }

  public post(event: BusEvent): void {
    this.toastService.show('I am a success toast', { classname: 'bg-success text-light'})
    this.getSubject(event.type).next(event);
  }
}

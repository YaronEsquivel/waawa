import { Injectable } from '@angular/core';
import { Observable, Subscriber, timer } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export enum SseEventType {
  connectionUp,
  connectionDown,
  reconnecting,
  data,
}
export interface SseEvent {
  type: SseEventType;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private eventSource?: EventSource;
  private retries = 0;

  constructor(private keycloak: KeycloakService) {}

  getServerSentEvent(url: string): Observable<SseEvent> {
    return new Observable<SseEvent>((observer) => {
      this.getEventSource(url, observer);
    });
  }

  private async eventSourceFactory(url: string) {
    const token = await this.keycloak.getToken().catch(() => null);

    url = token ? `${url}?access_token=${token}` : url;

    return new EventSource(url);
  }

  private async getEventSource(
    url: string,
    observer: Subscriber<SseEvent>
  ): Promise<void> {
    this.eventSource = await this.eventSourceFactory(url);

    this.eventSource.addEventListener('open', () => {
      this.retries = 0;
      observer.next({
        type: SseEventType.connectionUp,
      });
    });

    this.eventSource.addEventListener('message', (event: any) => {
      observer.next({
        type: SseEventType.data,
        data: event.data,
      });
    });

    this.eventSource.addEventListener('error', (error?: any) => {
      if (this.retries < environment.sse.maxRetries) {
        observer.next({
          type: SseEventType.reconnecting,
        });

        this.destroy();
        this.retries++;
        timer(environment.sse.retryInterval).subscribe(() => {
          this.getEventSource(url, observer);
        });
      } else {
        this.destroy();
        observer.next({
          type: SseEventType.connectionDown,
        });
        observer.error(error);
        this.retries = 0;
      }
    });
  }

  destroy() {
    this.eventSource?.close();
    this.eventSource = undefined;
  }
}

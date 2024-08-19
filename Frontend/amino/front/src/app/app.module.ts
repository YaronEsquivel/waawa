import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LogService } from './services/log.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from 'src/environments/environment';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireAnalytics,
  AngularFireAnalyticsModule,
  DEBUG_MODE,
  ScreenTrackingService,
} from '@angular/fire/compat/analytics';
import { LoggerManagerService } from './services/logger-manager.service';
function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        // redirectUri: environment.keycloak.redirectUri
        // onLoad: 'check-sso',
        // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      },
      // ENDPOITNS SIN INYECCION DE TOKEN EN ENCABEZADOS
      bearerExcludedUrls: [],
    });
}

function initializeLoggerService(
  googleAnalytics: AngularFireAnalytics
): LoggerManagerService {
  return new LoggerManagerService(googleAnalytics, environment.loggerStrategy);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),
    KeycloakAngularModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [
    LogService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: LoggerManagerService,
      useFactory: initializeLoggerService,
      deps: [AngularFireAnalytics],
    },
    // MODO DEBUG SOLO PARA DESARROLLO, ELIMINAR EN PROYECTO REAL
    { provide: DEBUG_MODE, useValue: true },
    // ESTE SERVICIO HACE LOG AUTOMÁTICO DE NAVEGACIÓN ENTRE PANTALLAS BASADO EN ANGULAR ROUTER
    // https://github.com/angular/angularfire/blob/master/docs/analytics/getting-started.md#tracking-screen-views
    ScreenTrackingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

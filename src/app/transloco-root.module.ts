import { HttpClient } from "@angular/common/http";
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from "@ngneat/transloco";
import { Injectable, NgModule } from "@angular/core";
import { environment } from "../environments/environment";
import { TranslocoLocaleModule } from "@ngneat/transloco-locale";

@Injectable({ providedIn: "root" })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  imports: [
    TranslocoLocaleModule.forRoot({
      langToLocaleMapping: {
        en: "en-US",
        mr: "mr-IN",
      },
    }),
  ],
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        prodMode: environment.production,
        availableLangs: [
          { id: "en", label: "English" },
          { id: "mr", label: "Marathi" },
        ],
        reRenderOnLangChange: true,
        fallbackLang: "mr",
        defaultLang: "en",
        missingHandler: {
          useFallbackTranslation: false,
        },
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}

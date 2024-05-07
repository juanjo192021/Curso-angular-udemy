import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``,
})
export class SelectorPageComponent implements OnInit {
  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countryService: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(): Region[] {
    return this.countryService.regions;
  }

  onRegionChanged(): void {
    this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => (this.borders = [])),
        switchMap((region) => this.countryService.getCountriesByRegion(region))
      )
      .subscribe((countries) => {
        //Obtiene la información de los países y la ordena alfabéticamente
        this.countriesByRegion = countries.sort((c1, c2) =>
          c1.name.localeCompare(c2.name)
        );
      });
  }

  onCountryChanged(): void {
    this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode)
        ),
        switchMap( country => this.countryService.getCountryBordersByCode(country.borders) )
      )
      .subscribe((countries) => {
        //Obtiene la información de los países y la ordena alfabéticamente
        // this.countriesByRegion = countries.sort((c1, c2) =>
        //   c1.name.localeCompare(c2.name)
        // );
        this.borders = countries;
      });
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexChartsDefaultAttributes } from 'src/app/constants/charts';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [
        NgApexchartsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update theme mode', () => {
    expect(component.mode).toBe('light');
    expect(component.chart.foreColor).toBe('#373d3f');
    expect(component.theme).toEqual({ mode: 'light', palette: 'palette1' });
    component.mode = 'dark';
    component.updateThemeMode();
    expect(component.mode).toBe('dark');
    expect(component.chart.foreColor).toBe('#f6f7f8');
    expect(component.theme).toEqual({ mode: 'dark', palette: 'palette1' });
  });

  it('should set attributes values', () => {
    expect(component.attr).toEqual(ApexChartsDefaultAttributes);
    component.attributes = {
      title: {
        text: '$424,652'
      },
      subtitle: {
        text: 'Sales'
      },
      labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        show: false
      },
    }
    component.setAttributesValues();
    expect(component.attr['title']).toEqual(component.attributes.title);
    expect(component.attr['subtitle']).toEqual(component.attributes.subtitle);
    expect(component.attr['labels']).toEqual(component.attributes.labels);
    expect(component.attr['dataLabels']).toEqual(component.attributes.dataLabels);
    expect(component.attr['xaxis']).toEqual(component.attributes.xaxis);
    expect(component.attr['yaxis']).toEqual(component.attributes.yaxis);
  });
});

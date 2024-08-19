import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApexChart, ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { ApexChartAttributes } from 'src/app/model/chart/chart.model';
import { BasicUser, User } from 'src/app/model/http/users.model';

@Component({ selector: 'app-users-form', template: '' })
export class MockUsersFormComponent {
    @Input() user = new User();
    @Output() submitEmitter = new EventEmitter<BasicUser>();
}

@Component({ selector: 'app-chart', template: '' })
export class MockChartComponent {
  @Input() chart: ApexChart = { type: 'bar' };
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries = [];
  @Input() attributes?: ApexChartAttributes;
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BpmRestDatasource} from '../../../model/datasource/bpm.rest.datasource';
import {WithingsBloodPressure} from '../../../model/data/bpm.model';
import * as moment from 'moment';
import {
  getDateAsString, getDateTimeAsString,
  getDifferenceInMins, isGradeHypertensionDiastolic,
  isGradeHypertensionSystolic, isHighNormalDiastolic,
  isHighNormalSystolic, isNormalDiastolic,
  isNormalSystolic, isOptimalDiastolic,
  isOptimalSystolic,
  toDate
} from '../../bpm.utils';

import {
  lightningChart,
  AxisTickStrategies,
  PointShape,
  ColorRGBA,
  Themes,
  ChartXY,
  Color,
  IndividualPointFill,
  Point, SolidLine, SolidFill, ColorHEX
} from '@arction/lcjs';

@Component({
  selector: 'app-bmp-chart',
  templateUrl: './bpm-chart.component.html'
})
export class BpmChartComponent implements OnDestroy, OnInit  {

  chart: ChartXY;

  private normalColor = ColorRGBA(40, 167, 69);
  private highNormalColor = ColorRGBA(255, 193, 7);
  private hypertensionColor = ColorRGBA(220, 53, 69);

  constructor(private dataSource: BpmRestDatasource, private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }

  ngOnInit(): void {

    this.chart = lightningChart().ChartXY({
      theme: Themes.light
    });

    const yAxis = this.chart.getDefaultAxisY();
    const sysBand = yAxis.addBand(false);
    sysBand
      .setValueStart(90)
      .setValueEnd(129)
      .setStrokeStyle(
        new SolidLine({
          thickness: 1,
          fillStyle: new SolidFill({ color: ColorHEX('#5b19') })
        })
      )
      .setFillStyle(
        new SolidFill({ color: ColorHEX('#5b19') })
      );

    const diaBand = yAxis.addBand(false);
    diaBand
      .setValueStart(60)
      .setValueEnd(84)
      .setStrokeStyle(
        new SolidLine({
          thickness: 1,
          fillStyle: new SolidFill({ color: ColorHEX('#5b19') })
        })
      )
      .setFillStyle(
        new SolidFill({ color: ColorHEX('#5b19') })
      );

    const individualStyle = new IndividualPointFill();
    individualStyle.setFallbackColor(this.normalColor);

    const parser = (builder, series, Xvalue, Yvalue) => {
      return builder
        .addRow(series.getName() + ' (mm Hg): ' + Math.floor(Yvalue));
    };

    const systoleSeries = this.chart.addPointSeries({ pointShape: PointShape.Circle })
      .setName('Sys')
      .setPointFillStyle(individualStyle)
      .setPointSize(8).setResultTableFormatter(parser);

    const diastoleSeries = this.chart.addPointSeries({ pointShape: PointShape.Triangle })
      .setName('Dia')
      .setPointFillStyle(individualStyle)
      .setPointSize(8).setResultTableFormatter(parser);

    this.route.queryParams.subscribe(params => {

      const from = new Date(params.from);
      const to = new Date(params.to);

      this.dataSource.getBloodPressures([from, to]).subscribe(data => {

        this.chart.setTitle(`Blood Pressures: ${this.getPeriodStart(data)} - ${this.getPeriodEnd(data)}`);

        const dateOrigin = this.getDateOrigin(data);
        const systolePoints = this.getSystolePoints(data);
        const diastolePoints = this.getDiastolePoints(data);

        this.chart.getDefaultAxisX()
          .setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin));

        // Set the correct value to use for the data frequency: 1000ms * 60s
        const dataFrequency = 1000 * 60;

        this.chart.getDefaultAxisX()
          .setInterval(0, this.getDiffs(data) * dataFrequency, true, true);
        this.chart.getDefaultAxisY()
          .setScrollStrategy(undefined)
          .setInterval(0, 200, true, true)
          .setTitle('mmHg');

        systoleSeries.add(
          systolePoints.map((point) => (
            { x: point.x * dataFrequency, y: point.y, color: this.getSystoleColor(point.y) }
            )));

        diastoleSeries.add(
          diastolePoints.map((point) => (
            { x: point.x * dataFrequency, y: point.y, color: this.getDiastoleColor(point.y) }
            )));

        this.chart.setAutoCursor((cursor) => {
          cursor
            .setResultTableAutoTextStyle(true)
            .setTickMarkerXAutoTextStyle(true)
            .setTickMarkerYAutoTextStyle(true);
        });
      });
    });
  }

  private getSystolePoints(data: WithingsBloodPressure[]): Point[] {
    const baseDate = toDate(data[0].timestamp);
    return data.filter(bp => bp.systole > 0).map(bp => {
      return {x: this.diff(baseDate, bp.timestamp), y: bp.systole};
    });
  }

  private getDiastolePoints(data: WithingsBloodPressure[]): Point[] {
    const baseDate = toDate(data[0].timestamp);
    return data.filter(bp => bp.diastole > 0).map(bp => {
      return {x: this.diff(baseDate, bp.timestamp), y: bp.diastole};
    });
  }

  private diff(base: Date, timestamp: number): number {
    return moment(toDate(timestamp)).diff(base, 'minutes');
  }

  private getDateOrigin(data: WithingsBloodPressure[]): Date {
    return toDate(data[0].timestamp);
  }

  private getDiffs(data: WithingsBloodPressure[]): number {
    const first = data[0].timestamp;
    const last = data[data.length - 1].timestamp;
    return getDifferenceInMins(last, first);
  }

  private getSystoleColor(value: number): Color {
    if (isOptimalSystolic(value) || isNormalSystolic(value)) {
      return this.normalColor;
    }
    if (isHighNormalSystolic(value)) {
      return this.highNormalColor;
    }
    if (isGradeHypertensionSystolic(value)) {
      return this.hypertensionColor;
    }
  }

  private getDiastoleColor(value: number): Color {
    if (isOptimalDiastolic(value) || isNormalDiastolic(value)) {
      return this.normalColor;
    }
    if (isHighNormalDiastolic(value)) {
      return this.highNormalColor;
    }
    if (isGradeHypertensionDiastolic(value)) {
      return this.hypertensionColor;
    }
  }

  private getPeriodStart(data: WithingsBloodPressure[]): string {
    return getDateAsString(toDate(data[0].timestamp));
  }

  private getPeriodEnd(data: WithingsBloodPressure[]): string {
    return getDateAsString(toDate(data[data.length - 1].timestamp));
  }
}

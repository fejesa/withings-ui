import {Component, OnDestroy, OnInit} from '@angular/core';

import {
  AutoCursorModes,
  AxisScrollStrategies,
  ChartXY,
  ColorHEX,
  DataPatterns,
  lightningChart,
  Point,
  SolidFill,
  SolidLine,
  Themes
} from '@arction/lcjs';
import {createSampledDataGenerator} from '@arction/xydata';
import {WithingsSignal} from '../../../model/data/bpm.model';
import {BpmRestDatasource} from '../../../model/datasource/bpm.rest.datasource';
import {ActivatedRoute} from '@angular/router';
import {getDateTimeAsString} from '../../bpm.utils';

@Component({
  selector: 'app-bpm-ecg',
  templateUrl: './bpm-ecg.component.html',
  styleUrls: ['./bpm-ecg.component.css']
})
export class BpmEcgComponent implements OnDestroy, OnInit  {

  chart: ChartXY;

  constructor(private dataSource: BpmRestDatasource, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    const signalId: number = +this.route.snapshot.paramMap.get('id');

    this.chart = lightningChart().ChartXY({
      theme: Themes.light
    }).setTitle('ECG - Measure time: ' + this.getMeasureTime());

    const series = this.chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive });
    series
      .setStrokeStyle(new SolidLine({
        thickness: 2,
        fillStyle: new SolidFill({ color: ColorHEX('#6666b2') })
      }))
      .setMouseInteractions(false);

    this.chart.setAutoCursorMode(AutoCursorModes.disabled);

    this.chart.getDefaultAxisY()
      .setTitle('mV')
      .setInterval(-300, 1600)
      .setScrollStrategy(AxisScrollStrategies.expansion);

    this.chart.getDefaultAxisX()
      .setTitle('millisec')
      .setInterval(0, 2500)
      .setScrollStrategy(AxisScrollStrategies.progressive);

    this.dataSource.getSignal(signalId).subscribe(data => {
        const points = this.getPoints(data);
        createSampledDataGenerator()
          .setSamplingFrequency(0.5)
          .setInputData(points)
          .generate()
          .setStreamBatchSize(20)
          .setStreamInterval(50)
          .toStream()
          .forEach(point => {
            // @ts-ignore
            series.add({ x: point.timestamp, y: point.data.y });
          });
      });
  }

  private getMeasureTime(): string {
    const value = +this.route.snapshot.paramMap.get('time');
    return getDateTimeAsString(value);
  }

  ngOnDestroy(): void {
    // "dispose" should be called when the component is unmounted to free all the resources used by the chart
    this.chart.dispose();
  }

  private getPoints(signal: WithingsSignal): Point[] {
    const result: Point[] = [];
    for (let i = 0; i < signal.signal.length; ++i) {
      result.push({x: i, y: signal.signal[i]});
    }
    return result;
  }
}

export class WithingsHeart {

  constructor(public diastole: number,
              public systole: number,
              public heartRate: number,
              public deviceName: string,
              public timestamp: number,
              public signalId: number,
              public nextRecInDays?: number
              ) {}
}

export class WithingsSignal {
  constructor(public signal: Array<number>,
              public samplingFrequency: number,
              public deviceName: string,
              public wearPosition: string) {}
}

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

export class WithingsHeartResponse {
  constructor(public hearts: WithingsHeart[],
              public offset: number,
              public pageNumber: number,
              public pageSize: number) {}
}

export class WithingsSignal {
  constructor(public signal: Array<number>,
              public samplingFrequency: number,
              public deviceName: string,
              public wearPosition: string) {}
}

export class WithingsBloodPressure {
  constructor(public diastole: number,
              public systole: number,
              public heartRate: number,
              public timestamp: number) {}
}

// systolic
export function isOptimalSystolic(value: number): boolean {
  return value < 120;
}

export function isNormalSystolic(value: number): boolean {
  return value >= 120 && value < 130;
}

export function isHighNormalSystolic(value: number): boolean {
  return value >= 130 && value < 140;
}

export function isGrade1HypertensionSystolic(value: number): boolean {
  return value >= 140 && value < 160;
}

export function isGrade2HypertensionSystolic(value: number): boolean {
  return value >= 160 && value < 180;
}

export function isGrade3HypertensionSystolic(value: number): boolean {
  return value >= 180;
}

// diastolic
export function isOptimalDiastolic(value: number): boolean {
  return value < 80;
}

export function isNormalDiastolic(value: number): boolean {
  return value >= 80 && value < 85;
}

export function isHighNormalDiastolic(value: number): boolean {
  return value >= 85 && value < 90;
}

export function isHighGrade1HypertensionDiastolic(value: number): boolean {
  return value >= 90 && value < 100;
}

export function isHighGrade2HypertensionDiastolic(value: number): boolean {
  return value >= 100 && value < 110;
}

export function isHighGrade3HypertensionDiastolic(value: number): boolean {
  return value >= 110;
}

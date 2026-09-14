export interface PredictionRequest {
  age: number
  sex: "male" | "female"
  bmi: number
  children: number
  smoker: "yes" | "no"
  region: "southwest" | "southeast" | "northwest" | "northeast"
}

export interface PredictionResponse {
  predicted_charges: number
}

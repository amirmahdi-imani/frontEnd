import { API_BASE_URL } from "@/config/env"
import type {
  PredictionRequest,
  PredictionResponse,
} from "@/types/prediction"

export async function predict(
  data: PredictionRequest
): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    let errorMessage = "Prediction request failed."

    try {
      const errorData = await response.json()

      if (errorData?.detail) {
        errorMessage = errorData.detail
      }
    } catch {
      // Ignore JSON parsing errors and use the default message.
    }

    throw new Error(errorMessage)
  }

  const result: PredictionResponse = await response.json()

  if (typeof result.predicted_charges !== "number") {
    throw new Error("Invalid prediction response from API.")
  }

  return result
}
"use client"

import { useState } from "react"
import { Loader2, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { PredictionRequest } from "@/types/prediction"

interface PredictionFormProps {
  onSubmit: (data: PredictionRequest) => void | Promise<void>
  loading?: boolean
}

const initialForm: PredictionRequest = {
  age: 30,
  sex: "male",
  bmi: 28.5,
  children: 2,
  smoker: "no",
  region: "southwest",
}

export function PredictionForm({
  onSubmit,
  loading = false,
}: PredictionFormProps) {
  const [form, setForm] = useState<PredictionRequest>(initialForm)

  function updateField<K extends keyof PredictionRequest>(
    field: K,
    value: PredictionRequest[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="age" className="text-[11px] font-medium">
            Age
          </Label>
          <Input
            id="age"
            type="number"
            min={0}
            max={120}
            value={form.age}
            onChange={(event) =>
              updateField("age", Number(event.target.value))
            }
            className="h-9 px-3 text-xs leading-none"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="bmi" className="text-[11px] font-medium">
            BMI
          </Label>
          <Input
            id="bmi"
            type="number"
            min={0}
            step="0.1"
            value={form.bmi}
            onChange={(event) =>
              updateField("bmi", Number(event.target.value))
            }
            className="h-9 px-3 text-xs leading-none"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="children" className="text-[11px] font-medium">
            Children
          </Label>
          <Input
            id="children"
            type="number"
            min={0}
            max={20}
            value={form.children}
            onChange={(event) =>
              updateField("children", Number(event.target.value))
            }
            className="h-9 px-3 text-xs leading-none"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium">Sex</Label>
          <Select
            value={form.sex}
            onValueChange={(value) =>
              updateField("sex", value as PredictionRequest["sex"])
            }
          >
            <SelectTrigger className="h-9 w-full px-3 text-xs">
              <SelectValue placeholder="Select sex" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium">Smoker</Label>
          <Select
            value={form.smoker}
            onValueChange={(value) =>
              updateField("smoker", value as PredictionRequest["smoker"])
            }
          >
            <SelectTrigger className="h-9 w-full px-3 text-xs">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium">Region</Label>
          <Select
            value={form.region}
            onValueChange={(value) =>
              updateField("region", value as PredictionRequest["region"])
            }
          >
            <SelectTrigger className="h-9 w-full px-3 text-xs">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="southwest">Southwest</SelectItem>
              <SelectItem value="southeast">Southeast</SelectItem>
              <SelectItem value="northwest">Northwest</SelectItem>
              <SelectItem value="northeast">Northeast</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="h-10 w-full text-xs"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Running prediction...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Predict Medical Cost
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
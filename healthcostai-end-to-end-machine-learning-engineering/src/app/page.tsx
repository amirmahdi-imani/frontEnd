
import Link from "next/link"
import { ArrowRight, BrainCircuit, ShieldCheck, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-background to-background" />

        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border bg-background/80 px-3 py-1 text-sm font-medium shadow-sm backdrop-blur">
              <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
              AI-Powered Medical Cost Prediction
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Predict Your{" "}
              <span className="text-primary">Medical Costs</span>{" "}
              with AI
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              HealthCost AI uses machine learning to estimate medical
              insurance costs based on your personal information.
              Fast, simple, and powered by a trained machine learning model.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/predict">
                <Button size="lg">
                  Get Your Prediction
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Estimates are for informational purposes only.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Why HealthCost AI
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple prediction, powered by machine learning
            </h2>

            <p className="mt-4 text-muted-foreground">
              A straightforward interface connected to a real machine
              learning prediction API.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BrainCircuit className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold">
                Machine Learning
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Predictions are generated using a trained Random Forest
                regression model.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold">
                Fast & Simple
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Enter a few details and receive your estimated medical
                cost in seconds.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold">
                Modern Architecture
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Built with Next.js, FastAPI, and a deployed machine
                learning model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border bg-card px-6 py-12 text-center shadow-sm sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to estimate your medical cost?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Enter your information and let HealthCost AI generate an
              estimated medical insurance cost.
            </p>

            <div className="mt-8">
              <Link href="/predict">
                <Button size="lg">
                  Start Prediction
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
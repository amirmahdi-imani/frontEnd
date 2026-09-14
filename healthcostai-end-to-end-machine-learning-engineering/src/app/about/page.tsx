
"use client"

import Link from "next/link"
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Database,
  GitBranch,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const iconUrl = (name: string) =>
  `https://cdn.simpleicons.org/${name}`

function BrandIcon({
  name,
  label,
  size = "h-5 w-5",
}: {
  name: string
  label: string
  size?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={iconUrl(name)}
      alt={label}
      className={`${size} object-contain dark:brightness-110`}
    />
  )
}

function SectionLabel({
  number,
  children,
}: {
  number: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="font-mono text-[10px] text-primary">
        {number}
      </span>

      <span className="h-px w-5 bg-primary/40" />

      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {children}
      </span>
    </div>
  )
}

function FlowNode({
  icon,
  title,
  subtitle,
  accent = false,
}: {
  icon?: string
  title: string
  subtitle: string
  accent?: boolean
}) {
  return (
    <div
      className={`flex-1 rounded-xl border p-3 ${
        accent
          ? "border-primary/30 bg-primary/5"
          : "bg-background/60"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            accent ? "bg-primary/10" : "bg-muted"
          }`}
        >
          {icon ? (
            <BrandIcon name={icon} label={title} />
          ) : (
            <BrainCircuit className="h-4 w-4 text-primary" />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold">{title}</p>

          <p className="truncate text-[10px] text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

const technologies = [
  ["nextdotjs", "Next.js"],
  ["react", "React"],
  ["typescript", "TypeScript"],
  ["tailwindcss", "Tailwind"],
  ["python", "Python"],
  ["fastapi", "FastAPI"],
  ["scikitlearn", "scikit-learn"],
  ["docker", "Docker"],
  ["git", "Git"],
  ["github", "GitHub"],
  ["vercel", "Vercel"],
  ["render", "Render"],
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Identity */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel number="00">
                Project
              </SectionLabel>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  HealthCost
                  <span className="text-primary"> AI</span>
                </h1>

                <span className="font-mono text-[10px] text-muted-foreground">
                  ML ENGINEERING
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                End-to-end medical cost prediction system combining
                machine learning, REST API, modern frontend and cloud
                deployment.
              </p>
            </div>

            <Link href="/predict">
              <Button>
                Try Prediction
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionLabel number="01">
          Architecture
        </SectionLabel>

        <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <FlowNode
              icon="nextdotjs"
              title="Next.js"
              subtitle="Frontend"
            />

            <ArrowRight className="mx-auto hidden h-4 w-4 text-primary lg:block" />

            <FlowNode
              icon="fastapi"
              title="FastAPI"
              subtitle="REST API"
            />

            <ArrowRight className="mx-auto hidden h-4 w-4 text-primary lg:block" />

            <FlowNode
              title="ML Pipeline"
              subtitle="Preprocessing + model"
              accent
            />

            <ArrowRight className="mx-auto hidden h-4 w-4 text-primary lg:block" />

            <FlowNode
              icon="scikitlearn"
              title="Prediction"
              subtitle="Medical charges"
            />
          </div>
        </div>
      </section>

      {/* ML + Data */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Model */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <SectionLabel number="02">
              Machine Learning
            </SectionLabel>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <BrainCircuit className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Random Forest Regressor
                </h2>

                <p className="text-xs text-muted-foreground">
                  scikit-learn Pipeline
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "200 estimators",
                "Median imputation",
                "Standard scaling",
                "One-hot encoding",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <SectionLabel number="03">
              Input Schema
            </SectionLabel>

            <div className="grid grid-cols-3 gap-2">
              {[
                "age",
                "bmi",
                "children",
                "sex",
                "smoker",
                "region",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border bg-muted/20 px-3 py-2"
                >
                  <code className="text-[11px]">{item}</code>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
              <Database className="h-3.5 w-3.5 text-primary" />

              Output:

              <code className="font-semibold text-foreground">
                charges
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* API + Engineering */}
      <section className="border-y bg-muted/10">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* API */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <SectionLabel number="04">
                API
              </SectionLabel>

              <div className="space-y-2">
                {[
                  ["GET", "/health"],
                  ["POST", "/predict"],
                  ["GET", "/model-info"],
                ].map(([method, endpoint]) => (
                  <div
                    key={endpoint}
                    className="flex items-center gap-3 rounded-lg border bg-background/60 px-3 py-2.5"
                  >
                    <span
                      className={`w-11 rounded-md px-1.5 py-1 text-center font-mono text-[9px] font-bold ${
                        method === "POST"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {method}
                    </span>

                    <code className="text-xs">
                      {endpoint}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <SectionLabel number="05">
                Engineering
              </SectionLabel>

              <div className="grid grid-cols-2 gap-2">
                {[
                  "TypeScript",
                  "Input validation",
                  "Environment config",
                  "Reusable components",
                  "CORS",
                  "Docker",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg border bg-background/60 px-3 py-2.5"
                  >
                    <Check className="h-3.5 w-3.5 text-primary" />

                    <span className="text-[11px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionLabel number="06">
          Technology
        </SectionLabel>

        <div className="flex flex-wrap gap-2">
          {technologies.map(([icon, label]) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              <BrandIcon
                name={icon}
                label={label}
                size="h-4 w-4"
              />

              <span className="text-[11px] font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Deployment */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <SectionLabel number="07">
          Deployment
        </SectionLabel>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <BrandIcon
                  name="vercel"
                  label="Vercel"
                  size="h-5 w-5"
                />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Vercel
                </p>

                <p className="text-[10px] text-muted-foreground">
                  Next.js frontend
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="hidden h-px w-10 bg-border sm:block" />

              <span className="rounded-full border bg-muted px-3 py-1 font-mono text-[9px] text-muted-foreground">
                REST
              </span>

              <div className="hidden h-px w-10 bg-border sm:block" />
            </div>

            <div className="flex items-center gap-3 sm:justify-end">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <BrandIcon
                  name="render"
                  label="Render"
                  size="h-5 w-5"
                />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Render
                </p>

                <p className="text-[10px] text-muted-foreground">
                  FastAPI backend
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 border-t pt-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BrandIcon
                name="github"
                label="GitHub"
                size="h-3.5 w-3.5"
              />
              GitHub
            </span>

            <span className="flex items-center gap-1.5">
              <BrandIcon
                name="docker"
                label="Docker"
                size="h-3.5 w-3.5"
              />
              Docker
            </span>

            <span className="flex items-center gap-1.5">
              <GitBranch className="h-3.5 w-3.5" />
              CI-ready workflow
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
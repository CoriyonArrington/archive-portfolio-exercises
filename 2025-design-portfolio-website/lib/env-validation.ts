// This file validates environment variables at build time

type EnvVar = {
  name: string
  required: boolean
  defaultValue?: string
}

const requiredEnvVars: EnvVar[] = [
  { name: "NEXT_PUBLIC_SUPABASE_URL", required: true },
  { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", required: true },
  { name: "SUPABASE_SERVICE_ROLE_KEY", required: false }, // Optional for some features
]

export function validateEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar.name]

    if (envVar.required && (!value || value.trim() === "")) {
      missing.push(envVar.name)
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}

// This function provides fallbacks for missing env vars in development
export function setupEnvFallbacks() {
  if (process.env.NODE_ENV !== "production") {
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar.name] && envVar.defaultValue) {
        process.env[envVar.name] = envVar.defaultValue
      }
    }
  }
}

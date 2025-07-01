export function useToast() {
  const notify = {
    success: (msg: string) => alert(`✅ ${msg}`),
    error: (msg: string) => alert(`❌ ${msg}`),
    info: (msg: string) => alert(`ℹ️ ${msg}`),
  }

  return notify
}

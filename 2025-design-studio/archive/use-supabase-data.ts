import { useEffect, useState } from 'react'
import { supabase } from '@/lib/utils/supabaseClient'

export function useSupabaseData<T = any>(table: string, columns = '*', filter?: Record<string, any>) {
  const [data, setData] = useState<T[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      let query = supabase.from(table).select(columns)
      if (filter) {
        for (const key in filter) {
          query = query.eq(key, filter[key])
        }
      }

      const { data, error } = await query
      if (error) setError(error.message)
      else setData(data as T[])

      setLoading(false)
    }

    fetchData()
  }, [table, columns, JSON.stringify(filter)])

  return { data, loading, error }
}

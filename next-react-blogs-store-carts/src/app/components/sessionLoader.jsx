// app/components/SessionLoader.js
'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentSession } from '@/lib/sessionManager'
import { setUser } from '../auth/login/loginSlice'

export function SessionLoader() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function loadSession() {
      const { user } = await getCurrentSession()
      if (user) {
        dispatch(setUser(user))
        console.log(user)
      }
    }
    loadSession()
  }, [dispatch])

  return null
}

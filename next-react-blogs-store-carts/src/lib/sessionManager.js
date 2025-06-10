import { supabase } from './supabaseClient'

/**
 * دریافت سشن کاربر (فقط user و access_token)
 * @returns {Promise<{ user: Object|null, access_token: string|null }>}
 */
export async function getCurrentSession() {
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession()

    if (error) {
        console.error('Error getting session:', error.message)
        return { user: null, access_token: null }
    }

    if (!session) return { user: null, access_token: null }

    return {
        user: session.user,
        access_token: session.access_token,
    }
}
"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import axios from "@/lib/axios"
import { setUser } from "@/lib/redux/slices/auth.slice"

interface ProtectedResponse {
  message: string
  user: {
    id: string
    role: string
    name: string
    email: string
    username: string
    iat: number
    exp: number
  }
}

type AuthRole = "user" | "admin"

export function useAuth(role: AuthRole) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const endpoint =
          role === "admin"
            ? "/api/protected-admin"
            : "/api/protected-users"

        const response =
          await axios.get<ProtectedResponse>(endpoint)

        dispatch(setUser(response.data.user))
        setIsChecking(false)
      } catch (error) {
        console.error("Authentication check failed:", error)

        router.push("/auth/login")
      }
    }

    verifyUser()
  }, [dispatch, router, role])

  return {
    isChecking,
  }
}
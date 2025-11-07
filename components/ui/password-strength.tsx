'use client'

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Check, X, Shield, AlertTriangle } from "lucide-react"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)

  const checkPasswordStrength = (pass: string) => {
    if (!pass) {
      setStrength(0)
      return
    }

    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[A-Z]/, text: "One uppercase letter" },
      { regex: /[a-z]/, text: "One lowercase letter" },
      { regex: /\d/, text: "One number" },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "One special character" }
    ]

    const metRequirements = requirements.filter(req => req.regex.test(pass))
    const strengthPercentage = (metRequirements.length / requirements.length) * 100
    
    setStrength(strengthPercentage)
  }

  useEffect(() => {
    checkPasswordStrength(password)
  }, [password])

  const getStrengthText = () => {
    if (strength === 0) return ""
    if (strength <= 20) return "Very Weak"
    if (strength <= 40) return "Weak"
    if (strength <= 60) return "Fair"
    if (strength <= 80) return "Good"
    return "Strong"
  }

  const getStrengthIcon = () => {
    if (strength <= 40) return <X className="w-4 h-4 text-red-500" />
    if (strength <= 60) return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    return <Check className="w-4 h-4 text-green-500" />
  }

  return (
    <div className="space-y-3">
      {strength > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Password Strength</span>
              {getStrengthIcon()}
            </div>
            <span className={`text-sm font-medium ${
              strength <= 40 ? 'text-red-500' : 
              strength <= 60 ? 'text-yellow-500' : 
              'text-green-500'
            }`}>
              {getStrengthText()}
            </span>
          </div>
          <Progress value={strength} className="h-2" />
        </div>
      )}
      
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-700">Password requirements:</p>
        <div className="space-y-1">
          {[
            { text: "At least 8 characters", regex: /.{8,}/ },
            { text: "One uppercase letter", regex: /[A-Z]/ },
            { text: "One lowercase letter", regex: /[a-z]/ },
            { text: "One number", regex: /\d/ },
            { text: "One special character", regex: /[!@#$%^&*(),.?":{}|<>]/ }
          ].map((req, index) => (
            <div key={index} className="flex items-center gap-2">
              {req.regex.test(password) ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <X className="w-3 h-3 text-gray-300" />
              )}
              <span className={`text-xs ${
                req.regex.test(password) ? 'text-green-600' : 'text-gray-500'
              }`}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

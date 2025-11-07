import React from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Smartphone } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface OTPVerificationProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => Promise<void>
  onResend: () => void
  isLoading?: boolean
  title?: string
  description?: string
  email?: string
}

export function OTPVerification({
  isOpen,
  onClose,
  onVerify,
  onResend,
  isLoading = false,
  title = "Verify Your Email",
  description = "Enter the 8-digit verification code sent to your email address.",
  email
}: OTPVerificationProps) {
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '', '', ''])

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newOtp = [...otpCode]
    newOtp[index] = value
    setOtpCode(newOtp)
    
    // Auto-focus next input
    if (value && index < 7) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
      if (prevInput) {
        prevInput.focus()
        const newOtp = [...otpCode]
        newOtp[index - 1] = ''
        setOtpCode(newOtp)
      }
    }
  }

  const handleVerify = async () => {
    const enteredOTP = otpCode.join('')
    
    if (enteredOTP.length !== 8) {
      toast.error('Please enter all 8 digits')
      return
    }
    
    await onVerify(enteredOTP)
  }

  const handleResend = () => {
    setOtpCode(['', '', '', '', '', '', '', ''])
    onResend()
  }

  // Reset OTP when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setOtpCode(['', '', '', '', '', '', '', ''])
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center text-lg">
            <Smartphone className="w-5 h-5 mr-2 text-orange-500" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {description}
            {email && (
              <span className="block mt-1 text-orange-600 font-medium">
                {email}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-2">
          <div className="flex justify-center gap-1 px-4">
            {otpCode.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleOTPKeyDown(index, e)}
                className="w-10 h-10 text-center text-lg font-semibold border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors flex-shrink-0"
                disabled={isLoading}
              />
            ))}
          </div>
          
          <div className="text-center px-4">
            <p className="text-sm text-gray-600">
              Didn&apos;t receive the code?{' '}
              <button
                onClick={handleResend}
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            disabled={isLoading}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'Verify'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

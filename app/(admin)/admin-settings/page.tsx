'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Settings, 
  Bell, 
  Shield, 
  Lock,
  Globe,
  Save,
  RefreshCw,
  Edit,
  Camera,
  CheckCircle,
  Calendar
} from "lucide-react"
import { toast } from "sonner"
import { useSession } from "@/components/session-provider"

export default function AdminSettingsPage() {
  const { user } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "ScholarBlock",
    siteDescription: "Barangay San Miguel Scholarship Management System",
    adminEmail: "admin@scholarblock.com",
    
    // Notification Settings
    emailNotifications: true,
    applicationAlerts: true,
    budgetAlerts: false,
    systemUpdates: true,
    
    // Security Settings
    sessionTimeout: "30",
    passwordMinLength: "8",
    twoFactorAuth: false,
    
    // Application Settings
    applicationPeriodStart: "2024-01-01",
    applicationPeriodEnd: "2024-12-31",
    maxApplicationsPerStudent: "1",
    autoApproveThreshold: "85",
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    backupFrequency: "daily",
  })

  const handleSaveSettings = async () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Settings saved successfully!')
      setIsLoading(false)
    }, 1500)
  }

  const handleResetSettings = () => {
    setSettings({
      siteName: "ScholarBlock",
      siteDescription: "Barangay San Miguel Scholarship Management System",
      adminEmail: "admin@scholarblock.com",
      emailNotifications: true,
      applicationAlerts: true,
      budgetAlerts: false,
      systemUpdates: true,
      sessionTimeout: "30",
      passwordMinLength: "8",
      twoFactorAuth: false,
      applicationPeriodStart: "2024-01-01",
      applicationPeriodEnd: "2024-12-31",
      maxApplicationsPerStudent: "1",
      autoApproveThreshold: "85",
      maintenanceMode: false,
      debugMode: false,
      backupFrequency: "daily",
    })
    toast.info('Settings reset to default values')
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      toast.success('Profile image updated!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="md:ml-64 md:pt-20 pb-16 md:pb-0">
        <div className="p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-red-500" />
                Admin Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Configure system settings and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-1"
              >
                <Card>
                  <CardHeader className="text-center">
                    <div className="relative mx-auto">
                      <Avatar className="w-24 h-24 mx-auto">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-red-100 text-red-600 text-2xl">
                          {(user?.user_metadata?.name as string)?.charAt(0) || user?.email?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <label className="absolute bottom-0 right-0 bg-red-500 rounded-full p-2 cursor-pointer hover:bg-red-600 transition-colors">
                        <Camera className="w-4 h-4 text-white" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <CardTitle className="mt-4">{(user?.user_metadata?.name as string) || user?.email?.split('@')[0]}</CardTitle>
                    <CardDescription>{user?.email}</CardDescription>
                    <Badge variant="secondary" className="mt-2 bg-red-100 text-red-700">
                      Administrator
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Admin since January 2024
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      System administrator
                    </div>
                    <div className="pt-4 border-t">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => toast.info('Password change feature coming soon')}
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Settings Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* General Settings */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <Globe className="w-5 h-5 mr-2 text-red-500" />
                          General Settings
                        </CardTitle>
                        <CardDescription>
                          Basic system configuration
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          value={settings.siteName}
                          onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-gray-50' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminEmail">Admin Email</Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          value={settings.adminEmail}
                          onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-gray-50' : ''}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        value={settings.siteDescription}
                        onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                        rows={3}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveSettings}
                          disabled={isLoading}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-red-500" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Configure email and system notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive email alerts for important events</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Application Alerts</Label>
                        <p className="text-sm text-gray-500">Notify when new applications are submitted</p>
                      </div>
                      <Switch
                        checked={settings.applicationAlerts}
                        onCheckedChange={(checked) => setSettings({...settings, applicationAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Budget Alerts</Label>
                        <p className="text-sm text-gray-500">Alert when budget thresholds are reached</p>
                      </div>
                      <Switch
                        checked={settings.budgetAlerts}
                        onCheckedChange={(checked) => setSettings({...settings, budgetAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Updates</Label>
                        <p className="text-sm text-gray-500">Receive notifications about system updates</p>
                      </div>
                      <Switch
                        checked={settings.systemUpdates}
                        onCheckedChange={(checked) => setSettings({...settings, systemUpdates: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Security Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-red-500" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Configure security and authentication options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Select value={settings.sessionTimeout} onValueChange={(value) => setSettings({...settings, sessionTimeout: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                        <Select value={settings.passwordMinLength} onValueChange={(value) => setSettings({...settings, passwordMinLength: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 characters</SelectItem>
                            <SelectItem value="8">8 characters</SelectItem>
                            <SelectItem value="10">10 characters</SelectItem>
                            <SelectItem value="12">12 characters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                      </div>
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={handleResetSettings}
                    className="flex items-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                    className="flex items-center bg-red-600 hover:bg-red-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save All Settings'}
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

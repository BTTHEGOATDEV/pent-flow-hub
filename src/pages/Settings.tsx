import { useState } from "react";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Key, Palette, Monitor } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useTheme } from "@/components/ThemeProvider";

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState({
    name: "Okunola Babatola",
    email: "walex.com",
    role: "Senior Pentester",
    company: "Walex Inc.",
  });

  const [notifications, setNotifications] = useState({
    scanCompletion: false,
    highSeverityFindings: false,
    weeklyReports: false,
    systemMaintenance: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Updated",
      description: `${section} settings have been saved successfully.`,
    });
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-muted-foreground">Manage your account and application preferences</p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                System
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline">Change Photo</Button>
                      <p className="text-sm text-muted-foreground">JPG, PNG up to 2MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => handleProfileChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profile.email}
                        onChange={(e) => handleProfileChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={profile.role}
                        onChange={(e) => handleProfileChange("role", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => handleProfileChange("company", e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("Profile")} className="w-full">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure when and how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="scan-completion">Scan Completion</Label>
                        <p className="text-sm text-muted-foreground">Get notified when scans complete</p>
                      </div>
                      <Switch
                        id="scan-completion"
                        checked={notifications.scanCompletion}
                        onCheckedChange={(checked) => handleNotificationChange("scanCompletion", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="high-severity">High Severity Findings</Label>
                        <p className="text-sm text-muted-foreground">Immediate alerts for critical vulnerabilities</p>
                      </div>
                      <Switch
                        id="high-severity"
                        checked={notifications.highSeverityFindings}
                        onCheckedChange={(checked) => handleNotificationChange("highSeverityFindings", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weekly-reports">Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">Summary of weekly activity</p>
                      </div>
                      <Switch
                        id="weekly-reports"
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance">System Maintenance</Label>
                        <p className="text-sm text-muted-foreground">Scheduled maintenance notifications</p>
                      </div>
                      <Switch
                        id="maintenance"
                        checked={notifications.systemMaintenance}
                        onCheckedChange={(checked) => handleNotificationChange("systemMaintenance", checked)}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("Notification")} className="w-full">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and access controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="2fa">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Switch
                        id="2fa"
                        checked={security.twoFactorAuth}
                        onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <Input
                          id="session-timeout"
                          value={security.sessionTimeout}
                          onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                        <Input
                          id="password-expiry"
                          value={security.passwordExpiry}
                          onChange={(e) => handleSecurityChange("passwordExpiry", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button variant="outline" className="w-full">
                        <Key className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Database className="h-4 w-4 mr-2" />
                        Download Account Data
                      </Button>
                    </div>

                    <Button onClick={() => handleSave("Security")} className="w-full">
                      Save Security Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    System Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure application behavior and appearance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Theme</Label>
                      <p className="text-sm text-muted-foreground mb-3">Choose your preferred color theme</p>
                      <div className="flex gap-2">
                        <Button 
                          variant={theme === "light" ? "cyber" : "outline"} 
                          size="sm"
                          onClick={() => setTheme("light")}
                          className="transition-all duration-200"
                        >
                          Light
                        </Button>
                        <Button 
                          variant={theme === "dark" ? "cyber" : "outline"} 
                          size="sm"
                          onClick={() => setTheme("dark")}
                          className="transition-all duration-200"
                        >
                          Dark
                        </Button>
                        <Button 
                          variant={theme === "system" ? "cyber" : "outline"} 
                          size="sm"
                          onClick={() => setTheme("system")}
                          className="transition-all duration-200"
                        >
                          Auto
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Language</Label>
                      <p className="text-sm text-muted-foreground mb-3">Select your preferred language</p>
                      <div className="flex gap-2">
                        <Button variant="cyber" size="sm">English</Button>
                        <Button variant="outline" size="sm">Spanish</Button>
                        <Button variant="outline" size="sm">French</Button>
                      </div>
                    </div>

                    <div>
                      <Label>Data Retention</Label>
                      <p className="text-sm text-muted-foreground mb-3">How long to keep scan data</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">30 days</Button>
                        <Button variant="outline" size="sm">90 days</Button>
                        <Button variant="cyber" size="sm">1 year</Button>
                        <Button variant="outline" size="sm">Forever</Button>
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => handleSave("System")} className="w-full">
                    Save System Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
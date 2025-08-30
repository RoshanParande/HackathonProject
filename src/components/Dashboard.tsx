import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  FileText, 
  Brain, 
  Share2, 
  Upload, 
  Activity, 
  Calendar,
  MapPin,
  CreditCard,
  QrCode,
  TrendingUp,
  Clock
} from "lucide-react";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const Dashboard = () => {
  const mockRecords = [
    { id: 1, type: "Blood Test", date: "2024-01-15", size: "2.4 MB" },
    { id: 2, type: "X-Ray Chest", date: "2024-01-10", size: "15.2 MB" },
    { id: 3, type: "MRI Brain", date: "2024-01-05", size: "245 MB" },
  ];

  const aiRecommendations = [
    { type: "Provider", text: "Mayo Clinic - 2.3 miles away", rating: "4.9★" },
    { type: "Habit", text: "Consider 30min walking daily based on your profile", impact: "High" },
    { type: "Insurance", text: "BlueCross Premium might save you $200/month", savings: "$2,400/year" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Patient Dashboard</h1>
          <p className="text-muted-foreground">Manage your health records securely with AI-powered insights</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card variant="medical" className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Dr. Jane Smith</CardTitle>
                  <CardDescription>Patient ID: HL-2024-001</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Age</p>
                  <p className="font-medium">34 years</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Blood Type</p>
                  <p className="font-medium">O+</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Insurance</p>
                  <p className="font-medium">BlueCross</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Emergency</p>
                  <p className="font-medium">John Smith</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Health Records */}
          <Card variant="default" className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Health Records
                  </CardTitle>
                  <CardDescription>Your secure medical documents</CardDescription>
                </div>
                <Button variant="hero" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-smooth">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{record.type}</p>
                        <p className="text-sm text-muted-foreground">{record.date} • {record.size}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card variant="feature" className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-secondary" />
                AI Health Assistant
              </CardTitle>
              <CardDescription>Personalized recommendations based on your health profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-gradient-card rounded-lg border border-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {rec.type}
                      </Badge>
                      {rec.type === "Provider" && <MapPin className="w-4 h-4 text-muted-foreground" />}
                      {rec.type === "Habit" && <Activity className="w-4 h-4 text-muted-foreground" />}
                      {rec.type === "Insurance" && <CreditCard className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <p className="text-sm font-medium mb-1">{rec.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {rec.rating || rec.impact || rec.savings}
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="medical" className="w-full mt-4">
                <Brain className="w-4 h-4 mr-2" />
                Get More Recommendations
              </Button>
            </CardContent>
          </Card>

          {/* Quick Share */}
          <Card variant="glass" className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                Quick Share
              </CardTitle>
              <CardDescription>Generate secure access links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-24 h-24 bg-white border-2 border-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-12 h-12 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Last generated: 2 hours ago
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  1 Hour Access
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  24 Hour Access
                </Button>
                <Button variant="hero" className="w-full">
                  Generate New QR
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Health Metrics */}
          <Card variant="medical" className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Health Metrics Overview
              </CardTitle>
              <CardDescription>Your health trends and key indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="w-full h-48 bg-gradient-card rounded-lg flex items-center justify-center"
                style={{
                  backgroundImage: `url(${dashboardPreview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="glass p-6 rounded-lg">
                  <p className="text-sm font-medium">Health Score: 87/100</p>
                  <p className="text-xs text-muted-foreground">Based on recent records and AI analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
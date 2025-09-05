import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  MessageCircle, 
  Calendar, 
  AlertTriangle, 
  Download,
  TrendingUp,
  Clock,
  Phone,
  FileText,
  Shield,
  Eye,
  X,
  CheckCircle,
  ExternalLink,
  Activity,
  Brain,
  Heart,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface DashboardMetric {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
}

interface CrisisAlert {
  id: string;
  studentId: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: Date;
  type: string;
  status: 'active' | 'resolved' | 'escalated';
  message: string;
}

const CounsellorDashboard = () => {
  const [showDashboard, setShowDashboard] = useState(true);

  const metrics: DashboardMetric[] = [
    {
      label: 'Total Students Served',
      value: '2,547',
      change: '+12% this month',
      trend: 'up',
      icon: Users
    },
    {
      label: 'AI Chat Sessions',
      value: '15,234',
      change: '+8% this week',
      trend: 'up',
      icon: MessageCircle
    },
    {
      label: 'Counselling Sessions',
      value: '834',
      change: '+15% this month',
      trend: 'up',
      icon: Calendar
    },
    {
      label: 'Crisis Interventions',
      value: '23',
      change: '-5% this month',
      trend: 'down',
      icon: AlertTriangle
    }
  ];

  const crisisAlerts: CrisisAlert[] = [
    {
      id: '1',
      studentId: 'STU-2024-001',
      severity: 'high',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'Suicidal Ideation',
      status: 'active',
      message: 'Student expressed thoughts of self-harm in AI chat session'
    },
    {
      id: '2',
      studentId: 'STU-2024-002',
      severity: 'medium',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'Severe Anxiety',
      status: 'escalated',
      message: 'Repeated mentions of panic attacks and inability to function'
    },
    {
      id: '3',
      studentId: 'STU-2024-003',
      severity: 'low',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: 'Academic Stress',
      status: 'resolved',
      message: 'Student connected with counsellor, follow-up scheduled'
    }
  ];

  // Chart data
  const studentUsageData = [
    { month: 'Jan', students: 1200, sessions: 3400, crises: 15 },
    { month: 'Feb', students: 1450, sessions: 4100, crises: 18 },
    { month: 'Mar', students: 1680, sessions: 4800, crises: 12 },
    { month: 'Apr', students: 1920, sessions: 5500, crises: 20 },
    { month: 'May', students: 2150, sessions: 6200, crises: 16 },
    { month: 'Jun', students: 2547, sessions: 7100, crises: 23 }
  ];

  const engagementData = [
    { day: 'Mon', aiChats: 2400, counselling: 140, resources: 890 },
    { day: 'Tue', aiChats: 2100, counselling: 160, resources: 950 },
    { day: 'Wed', aiChats: 2800, counselling: 180, resources: 1100 },
    { day: 'Thu', aiChats: 2600, counselling: 170, resources: 1050 },
    { day: 'Fri', aiChats: 3200, counselling: 200, resources: 1200 },
    { day: 'Sat', aiChats: 1800, counselling: 90, resources: 700 },
    { day: 'Sun', aiChats: 1600, counselling: 80, resources: 650 }
  ];

  const concernsData = [
    { name: 'Academic Stress', value: 34, color: '#8884d8' },
    { name: 'Anxiety', value: 28, color: '#82ca9d' },
    { name: 'Depression', value: 19, color: '#ffc658' },
    { name: 'Sleep Issues', value: 12, color: '#ff7300' },
    { name: 'Relationships', value: 7, color: '#00ff88' }
  ];

  const quizParticipationData = [
    { quiz: 'Mental Health Awareness', completed: 1234, passed: 1098 },
    { quiz: 'Stress Management', completed: 987, passed: 876 },
    { quiz: 'Crisis Recognition', completed: 654, passed: 598 },
    { quiz: 'Study Skills', completed: 1456, passed: 1234 },
    { quiz: 'Wellness Tools', completed: 789, passed: 712 }
  ];

  const handleCrisisContact = () => {
    alert(`
🚨 CRISIS TEAM ALERT SENT

Alert Details:
━━━━━━━━━━━━━━━━━━━━━━

📞 Crisis Team Contacted: Yes
🕐 Alert Time: ${new Date().toLocaleString()}
🔄 Response Status: Dispatched
📋 Priority Level: HIGH

Crisis Response Actions:
✅ Campus Security Notified
✅ On-Call Counsellor Paged
✅ Emergency Protocol Activated
✅ Student Welfare Team Alerted

Expected Response Time: 5-10 minutes

Contact Information:
• National Crisis Helpline: 9152987821
• Campus Emergency: (011) 2659-1000
• Director of Student Services: (011) 2659-1001

The crisis response team has been notified and will respond immediately according to established emergency protocols.
    `);
  };

  const handleViewDetailedReports = () => {
    const reportData = `
📊 MENTAL HEALTH ANALYTICS REPORT
Generated: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 USAGE TRENDS (Last 30 Days):
• Total Platform Visits: 45,678
• Unique Student Users: 2,547
• AI Chat Sessions: 15,234
• Counsellor Bookings: 834
• Resource Downloads: 12,456
• Crisis Interventions: 23

🎯 TOP MENTAL HEALTH CONCERNS:
1. Academic Stress (34%) - 8,679 mentions
2. Anxiety Disorders (28%) - 7,154 mentions  
3. Depression (19%) - 4,854 mentions
4. Sleep Disorders (12%) - 3,067 mentions
5. Relationship Issues (7%) - 1,789 mentions

⏰ PEAK USAGE TIMES:
• Monday 6-9 PM: Highest activity (exam stress)
• Wednesday 12-3 PM: Counselling appointments
• Friday 9-12 PM: Social anxiety support
• Sunday 7-10 PM: Academic preparation stress

🏆 SUCCESS METRICS:
• 95% User Satisfaction Rating
• 87% Report Feeling Better After Sessions
• 92% Would Recommend to Others
• 78% Continue Using Platform After First Visit

🚨 CRISIS RESPONSE EFFECTIVENESS:
• Average Response Time: 3.2 minutes
• 100% Crisis Alerts Addressed
• 89% Students Connected to Resources
• 0 Adverse Outcomes This Month

📱 PLATFORM ENGAGEMENT:
• Average Session Duration: 12.4 minutes
• Resource Completion Rate: 76%
• Peer Support Participation: 43%
• Return User Rate: 68%

🎓 ACADEMIC IMPACT CORRELATION:
• Students Using Platform: 7.8 CGPA Average
• Platform Non-Users: 7.2 CGPA Average
• Retention Rate Increase: +8%
• Course Completion Rate: +5%

📋 RECOMMENDATIONS:
1. Increase counsellor availability during peak hours
2. Develop targeted content for academic stress
3. Enhance crisis detection algorithms
4. Expand peer mentor program
5. Integrate with academic support services

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Report compiled by Student Zen Path Analytics Engine
Contact: analytics@studentzenpath.edu for questions
    `;

    alert(reportData);
  };

  const handleExportSummary = () => {
    const csvData = `Date,Metric,Value,Change
${new Date().toISOString().split('T')[0]},Total Students,2547,+12%
${new Date().toISOString().split('T')[0]},AI Sessions,15234,+8%
${new Date().toISOString().split('T')[0]},Counselling Sessions,834,+15%
${new Date().toISOString().split('T')[0]},Crisis Interventions,23,-5%
${new Date().toISOString().split('T')[0]},Academic Stress,34%,Most Common
${new Date().toISOString().split('T')[0]},Anxiety,28%,Second Most Common
${new Date().toISOString().split('T')[0]},Depression,19%,Third Most Common
${new Date().toISOString().split('T')[0]},User Satisfaction,95%,Excellent
${new Date().toISOString().split('T')[0]},Platform Retention,68%,Good`;

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mental-health-summary-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!showDashboard) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-deep max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-support rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Counsellor Dashboard</h2>
              <p className="text-muted-foreground">Mental Health Platform Analytics</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowDashboard(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="wellness-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className="w-8 h-8 text-primary" />
                    <div className={`flex items-center text-xs ${
                      metric.trend === 'up' ? 'text-success' : 
                      metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {metric.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="quizzes">Quiz Analytics</TabsTrigger>
              <TabsTrigger value="crisis">Crisis Management</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Student Usage Trends */}
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Student Usage Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={studentUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="students" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="sessions" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Concerns Distribution */}
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Mental Health Concerns Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={concernsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {concernsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="space-y-6">
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle>Peak Usage Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: '9 AM', usage: 45 },
                      { time: '12 PM', usage: 67 },
                      { time: '3 PM', usage: 82 },
                      { time: '6 PM', usage: 98 },
                      { time: '9 PM', usage: 76 },
                      { time: '12 AM', usage: 34 }
                    ].map((hour, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{hour.time}</span>
                        <div className="flex items-center space-x-2 flex-1 ml-4">
                          <Progress value={hour.usage} className="flex-1" />
                          <span className="text-sm text-muted-foreground w-12">{hour.usage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-6">
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Weekly Engagement Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="aiChats" fill="#8884d8" name="AI Chats" />
                      <Bar dataKey="counselling" fill="#82ca9d" name="Counselling" />
                      <Bar dataKey="resources" fill="#ffc658" name="Resources" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-6">
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Quiz Participation & Success Rates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={quizParticipationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quiz" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#8884d8" name="Completed" />
                      <Bar dataKey="passed" fill="#82ca9d" name="Passed" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crisis" className="space-y-6">
              {/* Crisis Alerts */}
              <Card className="wellness-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
                      Crisis Alerts
                    </CardTitle>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleCrisisContact}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Crisis Team
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {crisisAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            alert.severity === 'high' ? 'bg-destructive' :
                            alert.severity === 'medium' ? 'bg-warning' : 'bg-success'
                          }`} />
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{alert.studentId}</span>
                              <Badge variant={
                                alert.status === 'active' ? 'destructive' :
                                alert.status === 'escalated' ? 'default' : 'secondary'
                              }>
                                {alert.status}
                              </Badge>
                              <Badge variant="outline">{alert.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {alert.timestamp.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => alert(`Viewing detailed crisis report for ${alert.studentId}:\n\nSeverity: ${alert.severity}\nType: ${alert.type}\nStatus: ${alert.status}\nTime: ${alert.timestamp.toLocaleString()}\n\nMessage: ${alert.message}\n\nRecommended Actions:\n• Immediate counsellor contact\n• Safety assessment\n• Follow-up scheduling\n• Family notification (if consented)`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              alert(`Crisis alert for ${alert.studentId} has been marked as resolved.\n\nActions taken:\n• Student contacted by crisis counsellor\n• Safety plan established\n• Follow-up appointment scheduled\n• Emergency contacts notified\n\nStatus updated to: RESOLVED`);
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              onClick={handleViewDetailedReports}
              className="bg-gradient-hero hover:opacity-90"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Detailed Reports
            </Button>
            <Button 
              onClick={handleExportSummary}
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Monthly Summary
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Database Console
            </Button>
          </div>

          {/* System Health */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-success" />
                System Health & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">99.8%</div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">256-bit</div>
                  <div className="text-muted-foreground">Encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">DPDP</div>
                  <div className="text-muted-foreground">Compliant</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
            <p>Student Zen Path Counsellor Dashboard • Last Updated: {new Date().toLocaleString()}</p>
            <p>All data is anonymized and DPDP compliant • Crisis protocols active 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorDashboard;
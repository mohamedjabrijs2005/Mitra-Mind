import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "@/components/ChatInterface";
import { MoodTracker } from "@/components/MoodTracker";
import { MentalHealthDashboard } from "@/components/MentalHealthDashboard";
import { ResourcesLibrary } from "@/components/ResourcesLibrary";
import { Games } from "@/components/Games";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { LanguageContext, useLanguage, Language } from "@/hooks/useLanguage";
import { translations } from "@/lib/i18n";
import { 
  Brain, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  BookOpen, 
  Sparkles,
  Shield,
  Users,
  ArrowRight,
  Gamepad2
} from "lucide-react";

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const IndexContent = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t('aiCompanion'),
      description: t('aiCompanionDesc'),
      color: "text-purple-600"
    },
    {
      icon: Heart,
      title: t('moodTracking'),
      description: t('moodTrackingDesc'),
      color: "text-red-500"
    },
    {
      icon: TrendingUp,
      title: t('progressAnalytics'),
      description: t('progressAnalyticsDesc'),
      color: "text-blue-500"
    },
    {
      icon: BookOpen,
      title: t('wellnessResources'),
      description: t('wellnessResourcesDesc'),
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Language Switch */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitch />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full floating" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-primary-glow/30 rounded-lg floating" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/25 rounded-full floating" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium shadow-elegant">
              <Brain className="w-4 h-4" />
              {t('heroSubtitle')}
              <Sparkles className="w-4 h-4" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
              <span className="gradient-text">{t('heroTitle')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {t('heroDescription')}
            </p>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title}
                  className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-soft transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-subtle rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Application Interface */}
      <div className="container mx-auto px-6 pb-20">
        <Card className="bg-card/90 backdrop-blur-sm border-primary/20 shadow-elegant">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-gradient-subtle p-1 mb-6">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {t('dashboard')}
              </TabsTrigger>
              <TabsTrigger 
                value="chat"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('aiChat')}
              </TabsTrigger>
              <TabsTrigger 
                value="mood"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <Heart className="w-4 h-4 mr-2" />
                {t('moodTracker')}
              </TabsTrigger>
              <TabsTrigger 
                value="games"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                {t('games')}
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {t('resources')}
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="dashboard" className="mt-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold gradient-text mb-2">Your Wellness Dashboard</h2>
                  <p className="text-muted-foreground">
                    Track your progress and get personalized insights about your mental health journey.
                  </p>
                </div>
                <MentalHealthDashboard />
              </TabsContent>

              <TabsContent value="chat" className="mt-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold gradient-text mb-2">{t('chatTitle')}</h2>
                  <p className="text-muted-foreground">
                    {t('chatDescription')}
                  </p>
                </div>
                <ChatInterface />
              </TabsContent>

              <TabsContent value="mood" className="mt-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold gradient-text mb-2">{t('moodTracker')}</h2>
                  <p className="text-muted-foreground">
                    Log your emotions and identify patterns to better understand your mental wellness.
                  </p>
                </div>
                <MoodTracker />
              </TabsContent>

              <TabsContent value="games" className="mt-0">
                <Games />
              </TabsContent>

              <TabsContent value="resources" className="mt-0">
                <ResourcesLibrary />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>

      {/* Trust & Security Section */}
      <div className="bg-gradient-primary py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="text-primary-foreground">
            <Shield className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Your Privacy is Protected</h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-6">
              All conversations and data are encrypted and private. Mitra Mind follows strict privacy guidelines 
              to ensure your mental health journey remains confidential and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4" />
                End-to-end encryption
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4" />
                HIPAA compliant
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="w-4 h-4" />
                Clinically validated
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold gradient-text mb-4">
          Ready to Start Your Wellness Journey?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Begin tracking your mental health with personalized insights and AI-powered support.
        </p>
        <Button 
          size="lg"
          onClick={() => setActiveTab("chat")}
          className="bg-gradient-primary hover:shadow-glow text-primary-foreground px-12 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          {t('startChatting')}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
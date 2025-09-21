export interface Translations {
  // Navigation
  dashboard: string;
  aiChat: string;
  moodTracker: string;
  resources: string;
  games: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Features
  aiCompanion: string;
  aiCompanionDesc: string;
  moodTracking: string;
  moodTrackingDesc: string;
  progressAnalytics: string;
  progressAnalyticsDesc: string;
  wellnessResources: string;
  wellnessResourcesDesc: string;
  
  // Chat
  chatTitle: string;
  chatDescription: string;
  chatPlaceholder: string;
  
  // Common
  startChatting: string;
  privacyProtected: string;
  readyToStart: string;
}

export const translations: Record<string, Translations> = {
  en: {
    dashboard: "Dashboard",
    aiChat: "AI Chat", 
    moodTracker: "Mood Tracker",
    resources: "Resources",
    games: "Games",
    heroTitle: "Mental Wellness Made Personal",
    heroSubtitle: "Mitra Mind - Your Mental Wellness Companion",
    heroDescription: "Connect with your AI companion Mitra for personalized mental health support, mood tracking, and wellness resources - all in one secure, private space.",
    aiCompanion: "AI Companion",
    aiCompanionDesc: "Chat with Mitra, your empathetic AI companion available 24/7 for emotional support.",
    moodTracking: "Mood Tracking",
    moodTrackingDesc: "Track your emotional patterns and gain insights into your mental wellness journey.",
    progressAnalytics: "Progress Analytics", 
    progressAnalyticsDesc: "Visualize your mental health progress with personalized insights and recommendations.",
    wellnessResources: "Wellness Resources",
    wellnessResourcesDesc: "Access curated mental health resources, exercises, and crisis support information.",
    chatTitle: "Chat with Mitra",
    chatDescription: "Your empathetic AI companion is here to listen and provide supportive guidance.",
    chatPlaceholder: "Share what's on your mind...",
    startChatting: "Start Chatting with Mitra",
    privacyProtected: "Your Privacy is Protected",
    readyToStart: "Ready to Start Your Wellness Journey?"
  },
  es: {
    dashboard: "Panel",
    aiChat: "Chat IA",
    moodTracker: "Monitor de Ánimo",
    resources: "Recursos", 
    games: "Juegos",
    heroTitle: "Bienestar Mental Personalizado",
    heroSubtitle: "Mitra Mind - Tu Compañero de Bienestar Mental",
    heroDescription: "Conéctate con tu compañero IA Mitra para apoyo personalizado de salud mental, seguimiento del estado de ánimo y recursos de bienestar - todo en un espacio seguro y privado.",
    aiCompanion: "Compañero IA",
    aiCompanionDesc: "Chatea con Mitra, tu compañero IA empático disponible 24/7 para apoyo emocional.",
    moodTracking: "Seguimiento del Estado de Ánimo",
    moodTrackingDesc: "Rastrea tus patrones emocionales y obtén información sobre tu viaje de bienestar mental.",
    progressAnalytics: "Análisis de Progreso",
    progressAnalyticsDesc: "Visualiza tu progreso de salud mental con información personalizada y recomendaciones.",
    wellnessResources: "Recursos de Bienestar",
    wellnessResourcesDesc: "Accede a recursos curados de salud mental, ejercicios e información de apoyo en crisis.",
    chatTitle: "Chatea con Mitra",
    chatDescription: "Tu compañero IA empático está aquí para escuchar y proporcionar orientación de apoyo.",
    chatPlaceholder: "Comparte lo que tienes en mente...",
    startChatting: "Comenzar a Chatear con Mitra",
    privacyProtected: "Tu Privacidad Está Protegida",
    readyToStart: "¿Listo para Comenzar tu Viaje de Bienestar?"
  },
  fr: {
    dashboard: "Tableau de Bord",
    aiChat: "Chat IA",
    moodTracker: "Suivi d'Humeur", 
    resources: "Ressources",
    games: "Jeux",
    heroTitle: "Bien-être Mental Personnalisé",
    heroSubtitle: "Mitra Mind - Votre Compagnon de Bien-être Mental",
    heroDescription: "Connectez-vous avec votre compagnon IA Mitra pour un soutien personnalisé de santé mentale, suivi d'humeur et ressources de bien-être - tout dans un espace sécurisé et privé.",
    aiCompanion: "Compagnon IA",
    aiCompanionDesc: "Chattez avec Mitra, votre compagnon IA empathique disponible 24h/24 pour le soutien émotionnel.",
    moodTracking: "Suivi d'Humeur",
    moodTrackingDesc: "Suivez vos schémas émotionnels et obtenez des informations sur votre parcours de bien-être mental.",
    progressAnalytics: "Analyse des Progrès",
    progressAnalyticsDesc: "Visualisez vos progrès de santé mentale avec des informations personnalisées et des recommandations.",
    wellnessResources: "Ressources de Bien-être",
    wellnessResourcesDesc: "Accédez aux ressources de santé mentale organisées, exercices et informations de soutien en cas de crise.",
    chatTitle: "Chattez avec Mitra",
    chatDescription: "Votre compagnon IA empathique est là pour écouter et fournir des conseils de soutien.",
    chatPlaceholder: "Partagez ce qui vous préoccupe...",
    startChatting: "Commencer à Chatter avec Mitra",
    privacyProtected: "Votre Vie Privée est Protégée",
    readyToStart: "Prêt à Commencer votre Parcours de Bien-être?"
  }
};
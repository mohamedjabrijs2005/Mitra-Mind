import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  PlayCircle, 
  Headphones, 
  Phone, 
  ExternalLink,
  Clock,
  Star,
  Users
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "audio" | "hotline";
  duration?: string;
  rating?: number;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Understanding Anxiety: A Beginner's Guide",
    description: "Learn about anxiety symptoms, causes, and coping strategies in this comprehensive guide.",
    type: "article",
    duration: "8 min read",
    rating: 4.8,
    category: "Anxiety",
    icon: BookOpen
  },
  {
    id: "2",
    title: "5-Minute Breathing Exercise",
    description: "Quick breathing techniques to help manage stress and anxiety in the moment.",
    type: "audio",
    duration: "5 min",
    rating: 4.9,
    category: "Mindfulness",
    icon: Headphones
  },
  {
    id: "3",
    title: "Managing Depression: Daily Strategies",
    description: "Practical video guide on building daily routines that support mental wellness.",
    type: "video",
    duration: "12 min",
    rating: 4.7,
    category: "Depression",
    icon: PlayCircle
  },
  {
    id: "4",
    title: "National Suicide Prevention Lifeline",
    description: "24/7 crisis support for people in emotional distress or suicidal crisis.",
    type: "hotline",
    category: "Crisis Support",
    icon: Phone
  },
  {
    id: "5",
    title: "Progressive Muscle Relaxation",
    description: "Learn to release physical tension and mental stress through guided relaxation.",
    type: "audio",
    duration: "15 min",
    rating: 4.6,
    category: "Relaxation",
    icon: Headphones
  },
  {
    id: "6",
    title: "Building Self-Compassion",
    description: "Research-backed techniques for developing a kinder relationship with yourself.",
    type: "article",
    duration: "10 min read",
    rating: 4.9,
    category: "Self-Care",
    icon: BookOpen
  }
];

const categories = ["All", "Anxiety", "Depression", "Mindfulness", "Self-Care", "Crisis Support", "Relaxation"];

export const ResourcesLibrary = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "article": return "bg-blue-500/10 text-blue-600";
      case "video": return "bg-red-500/10 text-red-600";
      case "audio": return "bg-green-500/10 text-green-600";
      case "hotline": return "bg-purple-500/10 text-purple-600";
      default: return "bg-gray-500/10 text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article": return BookOpen;
      case "video": return PlayCircle;
      case "audio": return Headphones;
      case "hotline": return Phone;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">Mental Health Resources</h2>
        <p className="text-muted-foreground">
          Curated resources to support your mental wellness journey
        </p>
      </div>

      {/* Category Filter */}
      <Card className="p-4 bg-gradient-subtle border-primary/20">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="border-primary/20 hover:bg-primary/5"
            >
              {category}
            </Button>
          ))}
        </div>
      </Card>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);
          return (
            <Card key={resource.id} className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-soft transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                  <TypeIcon className="w-5 h-5" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {resource.category}
                </Badge>
              </div>

              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {resource.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {resource.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {resource.duration}
                    </div>
                  )}
                  {resource.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {resource.rating}
                    </div>
                  )}
                </div>

                <Button size="sm" className="bg-gradient-primary hover:shadow-elegant text-primary-foreground">
                  {resource.type === "hotline" ? (
                    <>
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </>
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Emergency Support */}
      <Card className="p-6 bg-gradient-primary">
        <div className="text-center text-primary-foreground">
          <h3 className="text-lg font-semibold mb-2">Need Immediate Support?</h3>
          <p className="mb-4 text-primary-foreground/90">
            If you're experiencing a mental health crisis, please reach out for immediate help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="secondary" 
              className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30"
            >
              <Phone className="w-4 h-4 mr-2" />
              Crisis Text Line: Text HOME to 741741
            </Button>
            <Button 
              variant="secondary"
              className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30"
            >
              <Phone className="w-4 h-4 mr-2" />
              National Suicide Prevention: 988
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
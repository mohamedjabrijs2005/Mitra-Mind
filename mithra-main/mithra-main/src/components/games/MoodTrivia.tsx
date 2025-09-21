import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Brain, CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

export const MoodTrivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Which neurotransmitter is often called the 'happiness chemical'?",
      options: ["Dopamine", "Serotonin", "Adrenaline", "Cortisol"],
      correct: 1,
      explanation: "Serotonin is often called the happiness chemical because it contributes to wellbeing and happiness!",
      category: "Science"
    },
    {
      id: 2,
      question: "How many minutes of exercise per day can help improve mood?",
      options: ["5 minutes", "15 minutes", "30 minutes", "60 minutes"],
      correct: 1,
      explanation: "Just 15 minutes of moderate exercise can boost your mood by releasing endorphins!",
      category: "Wellness"
    },
    {
      id: 3,
      question: "What technique involves focusing on the present moment?",
      options: ["Daydreaming", "Mindfulness", "Multitasking", "Planning"],
      correct: 1,
      explanation: "Mindfulness is the practice of being fully present and engaged in the current moment.",
      category: "Mindfulness"
    },
    {
      id: 4,
      question: "Which of these is a proven way to reduce stress?",
      options: ["Deep breathing", "Holding your breath", "Rapid breathing", "Irregular breathing"],
      correct: 0,
      explanation: "Deep breathing activates the body's relaxation response and helps reduce stress hormones.",
      category: "Wellness"
    },
    {
      id: 5,
      question: "How much sleep do most adults need for optimal mental health?",
      options: ["4-5 hours", "6-7 hours", "7-9 hours", "10+ hours"],
      correct: 2,
      explanation: "Most adults need 7-9 hours of quality sleep for optimal mental and physical health.",
      category: "Health"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setGameComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You're a wellness expert! 🌟";
    if (percentage >= 60) return "Great job! You know a lot about wellbeing! 👏";
    if (percentage >= 40) return "Good effort! Keep learning about mental health! 💪";
    return "Every step in learning about mental health counts! 🌱";
  };

  if (gameComplete) {
    return (
      <div className="space-y-6">
        <Card className="p-8 bg-gradient-primary text-primary-foreground text-center">
          <Star className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          <div className="text-6xl font-bold mb-2">{score}</div>
          <div className="text-xl mb-4">out of {questions.length}</div>
          <p className="text-lg mb-6">{getScoreMessage()}</p>
          <Button 
            onClick={resetGame}
            variant="secondary"
            size="lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-primary/5 border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <span className="font-semibold">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="text-sm font-medium">
            Score: {score}/{questions.length}
          </div>
        </div>

        <Card className="p-6 mb-6 bg-card border-primary/20">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
              {currentQ.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                variant="outline"
                className={`w-full text-left justify-start p-4 h-auto transition-all duration-300 ${
                  showResult
                    ? index === currentQ.correct
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'opacity-50'
                    : 'border-primary/20 hover:border-primary/40 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  {showResult && (
                    <>
                      {index === currentQ.correct && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {selectedAnswer === index && index !== currentQ.correct && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </>
                  )}
                  <span>{option}</span>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {showResult && (
          <Card className="p-4 bg-primary/5 border-primary/20 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {selectedAnswer === currentQ.correct ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium mb-1">
                  {selectedAnswer === currentQ.correct ? "Correct!" : "Not quite right"}
                </p>
                <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
              </div>
            </div>
          </Card>
        )}

        {showResult && (
          <div className="text-center">
            <Button 
              onClick={nextQuestion}
              className="bg-gradient-primary hover:shadow-elegant text-primary-foreground"
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-4 bg-card/50 border-primary/20">
        <p className="text-center text-sm text-muted-foreground">
          🧠 <strong>Benefits:</strong> Learning about mental health helps you make informed decisions about your wellbeing and reduces stigma around mental health topics.
        </p>
      </Card>
    </div>
  );
};
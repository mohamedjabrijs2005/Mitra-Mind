import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, RotateCcw, Trophy } from "lucide-react";

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [canFlip, setCanFlip] = useState(true);

  const emojis = ["🌟", "💖", "🌈", "🦋", "🌸", "☀️", "🍀", "🎈"];

  const initializeGame = () => {
    const gameEmojis = [...emojis, ...emojis];
    const shuffled = gameEmojis.sort(() => Math.random() - 0.5);
    
    const initialCards = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }));
    
    setCards(initialCards);
    setFlippedCards([]);
    setMoves(0);
    setIsComplete(false);
    setCanFlip(true);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setCanFlip(false);
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true }
              : card
          ));
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every(card => card.isMatched);
    if (allMatched && !isComplete) {
      setIsComplete(true);
    }
  }, [cards, isComplete]);

  const handleCardClick = (cardId: number) => {
    if (!canFlip || flippedCards.includes(cardId)) return;
    
    const card = cards.find(c => c.id === cardId);
    if (card?.isMatched || card?.isFlipped) return;

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-primary/5 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <span className="font-semibold">Moves: {moves}</span>
          </div>
          <Button 
            onClick={initializeGame}
            variant="outline"
            size="sm"
            className="border-primary/20"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>

        {isComplete && (
          <Card className="p-4 bg-gradient-primary text-primary-foreground mb-4">
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-bold mb-1">Congratulations! 🎉</h3>
              <p>You completed the game in {moves} moves!</p>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {cards.map((card) => (
            <Card
              key={card.id}
              className={`aspect-square flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                card.isFlipped || card.isMatched
                  ? 'bg-gradient-primary text-primary-foreground shadow-elegant'
                  : 'bg-card hover:bg-primary/5 border-primary/20'
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <span className="text-2xl">
                {card.isFlipped || card.isMatched ? card.emoji : '?'}
              </span>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-card/50 border-primary/20">
        <p className="text-center text-sm text-muted-foreground">
          💡 <strong>Benefits:</strong> Memory games help improve cognitive function, concentration, and mental agility while providing a fun, stress-free activity.
        </p>
      </Card>
    </div>
  );
};
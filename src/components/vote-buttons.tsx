"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  songId: string;
  upvotes: number;
  downvotes: number;
  userVote: 1 | -1 | null;
  onVote?: (songId: string, voteType: 1 | -1) => void;
}

export function VoteButtons({
  songId,
  upvotes,
  downvotes,
  userVote,
  onVote,
}: VoteButtonsProps) {
  const [currentVote, setCurrentVote] = useState(userVote);
  const [ups, setUps] = useState(upvotes);
  const [downs, setDowns] = useState(downvotes);

  const handleVote = (type: 1 | -1) => {
    if (currentVote === type) {
      setCurrentVote(null);
      if (type === 1) setUps((v) => v - 1);
      else setDowns((v) => v - 1);
    } else {
      if (currentVote === 1) setUps((v) => v - 1);
      if (currentVote === -1) setDowns((v) => v - 1);
      setCurrentVote(type);
      if (type === 1) setUps((v) => v + 1);
      else setDowns((v) => v + 1);
    }
    onVote?.(songId, type);
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => handleVote(1)}
        className={cn(
          "transition-colors",
          currentVote === 1
            ? "text-primary hover:text-primary"
            : "text-muted-foreground hover:text-primary"
        )}
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <span
        className={cn(
          "min-w-[2ch] text-center text-sm font-semibold tabular-nums",
          ups - downs > 0
            ? "text-primary"
            : ups - downs < 0
              ? "text-destructive"
              : "text-muted-foreground"
        )}
      >
        {ups - downs}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => handleVote(-1)}
        className={cn(
          "transition-colors",
          currentVote === -1
            ? "text-destructive hover:text-destructive"
            : "text-muted-foreground hover:text-destructive"
        )}
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
}

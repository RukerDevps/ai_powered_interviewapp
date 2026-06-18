"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Send, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isPaused: boolean;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
}

export const AnswerInput = ({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  isPaused,
  isRecording,
  setIsRecording,
}: AnswerInputProps) => {
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize SpeechRecognition in useEffect to avoid SSR errors
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }

          if (finalTranscript) {
            onChange(value + (value ? " " : "") + finalTranscript.trim());
          }
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          // If we were supposed to be recording, restart or reset state
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [onChange, value, setIsRecording]);

  // Handle start/stop of speech recognition
  const toggleRecording = () => {
    if (!isSpeechSupported || isPaused) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Failed to start speech recognition", err);
      }
    }
  };

  // Stop recording if the session gets paused
  useEffect(() => {
    if (isPaused && isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
  }, [isPaused, isRecording, setIsRecording]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (!isSubmitting && value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label htmlFor="answer-textarea" className="text-sm font-semibold text-text-primary">
            Your Answer
          </label>
          {isRecording && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-error uppercase tracking-wider animate-pulse">
              <span className="h-2 w-2 rounded-full bg-error" />
              Recording Voice...
            </span>
          )}
        </div>

        <div className="relative">
          <Textarea
            id="answer-textarea"
            placeholder="Type or speak your answer here... (Press Ctrl+Enter to submit)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting || isPaused}
            className="min-h-[140px] resize-none pr-3 pt-3 rounded-xl bg-surface border-border text-sm leading-relaxed focus:border-accent focus:ring-accent"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {isSpeechSupported ? (
            <Button
              type="button"
              variant={isRecording ? "destructive" : "outline"}
              onClick={toggleRecording}
              disabled={isSubmitting || isPaused}
              className={cn(
                "h-11 rounded-lg px-4 font-semibold text-sm transition-all flex items-center gap-2",
                isRecording && "bg-error hover:bg-error-hover text-destructive-foreground"
              )}
            >
              {isRecording ? <MicOff className="h-4.5 w-4.5" /> : <Mic className="h-4.5 w-4.5 text-text-secondary" />}
              {isRecording ? "Stop Recording" : "Speak Answer"}
            </Button>
          ) : (
            <div className="text-xs text-text-muted flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4" />
              Voice input unsupported in this browser
            </div>
          )}

          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || isPaused || !value.trim()}
            className="h-11 rounded-lg px-5 bg-accent hover:bg-accent-hover text-accent-foreground font-semibold flex items-center gap-2"
          >
            Submit Answer
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1.5 border-t border-border/50 pt-3">
          <span className="flex h-1.5 w-1.5 rounded-full bg-accent" />
          <span>Tip: Take your time. Think clearly before answering.</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Brain,
  Sparkles,
  Award,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion, MistakeEntry } from '../types';
import { ADAPTIVE_QUIZ_POOL } from '../data/mockAcademicData';

interface AdaptiveQuizEngineProps {
  onLogMistake: (mistake: MistakeEntry) => void;
  onUpdateScore: (points: number) => void;
  onOpenMistakeBank: () => void;
}

export const AdaptiveQuizEngine: React.FC<AdaptiveQuizEngineProps> = ({
  onLogMistake,
  onUpdateScore,
  onOpenMistakeBank
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizHistory, setQuizHistory] = useState<Array<{
    question: QuizQuestion;
    selected: number;
    correct: boolean;
  }>>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [identifiedWeakness, setIdentifiedWeakness] = useState<string | null>(null);

  const currentQ = ADAPTIVE_QUIZ_POOL[currentQuestionIndex] || ADAPTIVE_QUIZ_POOL[0];

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQ.correctAnswerIndex;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
      onUpdateScore(50);
    } else {
      // Log to Mistake Bank
      const newMistake: MistakeEntry = {
        id: `mst-${Date.now()}`,
        subject: currentQ.subject,
        topic: currentQ.topic,
        subtopic: currentQ.misconceptionTriggered || 'Core Principle Rule',
        mistakeCount: 1,
        identifiedMisconception: currentQ.explanation,
        lastOccurred: 'Just now in Adaptive Quiz',
        remediationStatus: 'Pending',
        remedialLesson: `Review rule for ${currentQ.topic}: ${currentQ.explanation}`
      };
      onLogMistake(newMistake);

      if (currentQ.misconceptionTriggered) {
        setIdentifiedWeakness(currentQ.misconceptionTriggered);
      }
    }

    setQuizHistory(prev => [
      ...prev,
      {
        question: currentQ,
        selected: selectedOption,
        correct: isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < ADAPTIVE_QUIZ_POOL.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizHistory([]);
    setIsFinished(false);
    setIdentifiedWeakness(null);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Engine Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4" />
            <span>Cognitive Adaptive Assessment Engine</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Adaptive Knowledge Evaluator
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Calibrates question difficulty (Easy → Medium → Hard) based on your real-time responses to uncover conceptual blindspots.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <div className="text-right">
            <div className="text-[11px] text-slate-400 font-medium">Adaptive Level</div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              currentQ.difficulty === 'Hard'
                ? 'bg-rose-100 text-rose-700'
                : currentQ.difficulty === 'Medium'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-emerald-100 text-emerald-700'
            }`}>
              {currentQ.difficulty} Tier
            </span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Question Meta & Tracker */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900">
                Question {currentQuestionIndex + 1} of {ADAPTIVE_QUIZ_POOL.length}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-indigo-600 font-medium">{currentQ.subject}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{currentQ.topic}</span>
            </div>

            <div className="flex items-center space-x-1">
              {ADAPTIVE_QUIZ_POOL.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full ${
                    idx < currentQuestionIndex
                      ? quizHistory[idx]?.correct
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                      : idx === currentQuestionIndex
                      ? 'bg-indigo-600 ring-2 ring-indigo-200'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctAnswerIndex;

              let optionClasses = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300';
              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionClasses = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                } else if (isSelected && !isCorrectAnswer) {
                  optionClasses = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                } else {
                  optionClasses = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                optionClasses = 'bg-indigo-50 border-indigo-500 text-indigo-950 font-medium ring-2 ring-indigo-100';
              }

              return (
                <div
                  key={idx}
                  onClick={() => !isAnswerSubmitted && setSelectedOption(idx)}
                  className={`p-4 rounded-xl border text-sm transition-all cursor-pointer flex items-center justify-between ${optionClasses}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              selectedOption === currentQ.correctAnswerIndex
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                : 'bg-rose-50/70 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center space-x-1.5">
                  {selectedOption === currentQ.correctAnswerIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Correct Answer! (+50 XP)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Conceptual Gap Identified • Logged to Mistake Bank</span>
                    </>
                  )}
                </span>
              </div>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-400">
              Score: <strong>{score}</strong> / {currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)}
            </span>

            {!isAnswerSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 active:scale-95"
              >
                <span>{currentQuestionIndex + 1 < ADAPTIVE_QUIZ_POOL.length ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Complete Results Card */
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900">Assessment Complete!</h2>
            <p className="text-slate-500 text-sm mt-1">
              You scored <strong>{score}</strong> out of <strong>{ADAPTIVE_QUIZ_POOL.length}</strong> ({Math.round((score / ADAPTIVE_QUIZ_POOL.length) * 100)}%).
            </p>
          </div>

          {identifiedWeakness && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 max-w-md mx-auto text-left space-y-1">
              <div className="font-bold flex items-center space-x-1.5 text-amber-800">
                <Brain className="w-4 h-4" />
                <span>Identified Cognitive Misconception:</span>
              </div>
              <p className="leading-relaxed">
                “{identifiedWeakness}” — This has been added to your <strong>Mistake Bank</strong> with a 2-minute remediation plan.
              </p>
            </div>
          )}

          <div className="flex items-center justify-center space-x-3 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>
            <button
              onClick={onOpenMistakeBank}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-md active:scale-95"
            >
              <span>View Mistake Bank →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

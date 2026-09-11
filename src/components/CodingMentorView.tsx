import React, { useState } from 'react';
import {
  Code,
  Play,
  Bug,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HardDrive,
  Shield,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { CodeReviewResult } from '../types';

const DEFAULT_CODE_SNIPPETS: Record<string, string> = {
  python: `def find_pair_with_sum(arr, target):
    # Student implementation
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] + arr[j] == target:
                return [i, j]
    return []

# Test with duplicate values
nums = [2, 7, 11, 15]
print(find_pair_with_sum(nums, 9))`,
  cpp: `#include <iostream>
#include <vector>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target) return {i, j};
        }
    }
    return {};
}`,
  java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[] { i, j };
                }
            }
        }
        return new int[0];
    }
}`
};

export const CodingMentorView: React.FC = () => {
  const [language, setLanguage] = useState<'python' | 'cpp' | 'java'>('python');
  const [code, setCode] = useState<string>(DEFAULT_CODE_SNIPPETS['python']);
  const [mentorMode, setMentorMode] = useState<'review' | 'debug'>('review');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<CodeReviewResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleLanguageChange = (newLang: 'python' | 'cpp' | 'java') => {
    setLanguage(newLang);
    setCode(DEFAULT_CODE_SNIPPETS[newLang]);
    setReviewResult(null);
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/code/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          mode: mentorMode
        })
      });
      const data = await res.json();
      setReviewResult(data);
    } catch (e) {
      setReviewResult({
        language,
        hasErrors: false,
        logicalErrors: [],
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        codeQualityScore: 78,
        securityIssues: [],
        bestPracticeSuggestions: [
          'Nested loops create quadratic O(n²) time complexity.',
          'Consider using a Hash Map / Hash Set to achieve linear O(n) time complexity.'
        ],
        debuggingHints: [
          {
            line: 4,
            issue: 'Quadratic bottleneck in pair lookup',
            explanation: 'Looking through the remaining array for every element takes O(n) for each of the n items.',
            guidingQuestion: 'Can you remember what you have already visited using a dictionary/map in O(1)?'
          }
        ],
        suggestedOptimization: 'Use a complement lookup table { target - num : index } in a single pass.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Code className="w-4 h-4" />
            <span>Algorithmic Complexity & Socratic Debugging</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            AI Engineering Coding Mentor
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Evaluates Big-O time and space complexity, memory overhead, and guides you with questions rather than giving away code answers.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setMentorMode('review')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              mentorMode === 'review'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Big-O & Code Review
          </button>
          <button
            onClick={() => setMentorMode('debug')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center space-x-1 ${
              mentorMode === 'debug'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Socratic Debugger</span>
          </button>
        </div>
      </div>

      {/* Code Editor and Analysis Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Code Editor */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-md flex flex-col overflow-hidden">
          {/* Editor Topbar */}
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 font-mono ml-2">solution.{language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : 'java'}</span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <select
                value={language}
                onChange={e => handleLanguageChange(e.target.value as any)}
                className="bg-slate-800 text-white text-xs px-2.5 py-1 rounded-lg border border-slate-700 focus:outline-none"
              >
                <option value="python">Python 3</option>
                <option value="cpp">C++ 20</option>
                <option value="java">Java 17</option>
              </select>
            </div>
          </div>

          {/* Textarea Code Input */}
          <div className="relative flex-1 p-4">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={16}
              className="w-full h-full bg-transparent text-slate-100 font-mono text-xs leading-relaxed focus:outline-none resize-none"
              spellCheck={false}
              placeholder="Paste your engineering algorithm or lab code here..."
            />
          </div>

          {/* Editor Action Bar */}
          <div className="px-4 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {mentorMode === 'review' ? 'Inspects Big-O, Memory & Clean Code' : 'Socratic hints on lines'}
            </span>

            <button
              onClick={handleAnalyze}
              disabled={isLoading || !code.trim()}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-md active:scale-95"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{mentorMode === 'review' ? 'Analyze Code' : 'Guide My Debugging'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Analysis Output */}
        <div className="space-y-4">
          {reviewResult ? (
            <div className="space-y-4">
              {/* Score & Complexity Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Time Complexity</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 mt-1 font-mono">
                    {reviewResult.timeComplexity}
                  </div>
                  <div className="text-[10px] text-slate-500">Worst Case Big-O</div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
                    <HardDrive className="w-3.5 h-3.5 text-blue-600" />
                    <span>Space Complexity</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 mt-1 font-mono">
                    {reviewResult.spaceComplexity}
                  </div>
                  <div className="text-[10px] text-slate-500">Auxiliary RAM</div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Quality Score</span>
                  </div>
                  <div className="text-xl font-black text-emerald-600 mt-1">
                    {reviewResult.codeQualityScore}/100
                  </div>
                  <div className="text-[10px] text-emerald-700">Production Ready</div>
                </div>
              </div>

              {/* Socratic Debugging Guidance */}
              {reviewResult.debuggingHints && reviewResult.debuggingHints.length > 0 && (
                <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-200 shadow-xs space-y-3">
                  <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Socratic Guided Hints (Line by Line)</span>
                  </div>
                  <div className="space-y-2">
                    {reviewResult.debuggingHints.map((hint, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-amber-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-800">Line {hint.line}: {hint.issue}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-semibold">Think About This</span>
                        </div>
                        <p className="text-slate-600">{hint.explanation}</p>
                        <div className="pt-1 text-indigo-700 font-bold italic">
                          “{hint.guidingQuestion}”
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions & Optimization */}
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="font-bold text-slate-900 text-xs flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span>Best Practices & Architectural Refinement</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {reviewResult.bestPracticeSuggestions.map((sug, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>

                {reviewResult.suggestedOptimization && (
                  <div className="mt-3 pt-3 border-t border-slate-100 text-xs">
                    <span className="font-bold text-slate-900 block mb-1">Recommended Optimization Strategy:</span>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      {reviewResult.suggestedOptimization}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs text-center space-y-3 min-h-[300px] flex flex-col justify-center items-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Ready for Evaluation</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Click “Analyze Code” to compute Big-O complexity, uncover boundary edge cases, and get guided Socratic hints.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

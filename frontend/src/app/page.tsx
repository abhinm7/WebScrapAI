"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createTask } from "../lib/api";
import TaskCard from "./components/TaskCard";

export default function Home() {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [tasks, setTasks] = useState<{ id: string; question: string }[]>([]);

  const createTaskMutation = useMutation({
    mutationFn: () => createTask(url, question),
    onSuccess: (data) => {
      const newId = data.created;
      setTasks((prev) => [
        { id: newId, question },
        ...prev,
      ]);
      setQuestion("");
      setUrl("");
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-8">

        {/* 1. The Main "Asker" Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              🤖 <span className="tracking-tight">Web Scraper AI</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Paste a URL and let the AI analyze it for you.
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8 space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                Target Website
              </label>
              <input
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 outline-none"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                Your Question
              </label>
              <textarea
                className="w-full min-h-[120px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 outline-none resize-none"
                placeholder="What would you like to know about this site?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <button
              onClick={() => createTaskMutation.mutate()}
              disabled={createTaskMutation.isPending || !url || !question}
              className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200"
            >
              {createTaskMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Ask AI Agent"
              )}
            </button>
          </div>
        </div>

        {/* 2. The Results Feed */}
        <div className="space-y-4">
          {tasks.length > 0 && (
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-2">
              Recent Activity
            </h2>
          )}

          {tasks.map((task) => (
            <TaskCard
              key={task.id} // REMEMBER: Use task.id, not index!
              taskId={task.id}
              question={task.question}
            />
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12 opacity-50">
              <div className="text-4xl mb-3">👻</div>
              <p className="text-gray-500 text-sm">No tasks yet. Start by asking a question!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
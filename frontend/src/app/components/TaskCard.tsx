"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTask } from "../../lib/api";
import { Task } from "../../types/task";

interface TaskResponse {
  id: string;
  task: Task;
}

export default function TaskCard({
  taskId,
  question,
}: {
  taskId: string;
  question: string;
}) {

  const taskQuery = useQuery<TaskResponse, Error>({
    queryKey: ["task", taskId],
    queryFn: () => fetchTask(taskId),
    enabled: !!taskId,
    refetchInterval: (query) => {
      const status = query.state.data?.task?.status;
      if (status === "completed" || status === "failed") {
        return false;
      }
      return 2000;
    },
  });
  
  const taskData = taskQuery.data?.task;
  
  const isProcessing =
    taskQuery.isLoading ||
    taskData?.status === "queued" ||
    taskData?.status === "processing";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="font-medium text-slate-800">{question}</p>
        {isProcessing && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
        )}
      </div>

      <p className="mt-1 text-xs text-slate-500">
        Status:{" "}
        <span className="capitalize font-medium text-indigo-600">
          {taskData?.status || "Loading..."}
        </span>
      </p>

      {taskData?.answer && (
        <div className="mt-4 rounded-md bg-slate-50 border border-slate-100 p-3 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
          {taskData.answer}
        </div>
      )}

      {taskData?.status === "failed" && (
        <p className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
          Failed to process this task. Please try again.
        </p>
      )}
    </div>
  );
}
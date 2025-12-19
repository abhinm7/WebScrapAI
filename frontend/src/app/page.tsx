"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createTask, fetchTask } from "../lib/api";
import { Task } from "../types/task";

export default function Home() {
  const [url, setUrl] = useState('');
  const [question, setQuestion] = useState('');
  const [taskId, setTaskId] = useState<string | null>(null);

  const createTaskMutation = useMutation({
    mutationFn: () => createTask(url, question),
    onSuccess: (data) => {
      setTaskId(data.taskId);
    },
  });

  const taskQuery = useQuery<Task, Error>({
    queryKey: ['task', taskId],
    queryFn: () => fetchTask(taskId!),
    enabled: !!taskId,
    refetchInterval: (query) => {
      const task = query.state.data;
      if (!task) return 2000;
      return task.status === 'completed' ? false : 2000;
    }
  })

  return (
    <div>
      
    </div>
  );
}

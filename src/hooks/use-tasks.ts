"use client";
import { getTasks } from "@/lib/actions/tasks";
import { Tables } from "@/types/database.types";
import { useEffect, useState } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState<Tables<"tasks">[]>([]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    async function pollTasks() {
      const tasks = await getTasks();
      setTasks(tasks || []);
      const hasActiveTasks = tasks?.some(
        (task) => task.status === "pending" || task.status === "inProgress"
      );

      // Only continue polling if there are active tasks
      if (hasActiveTasks) {
        timeoutId = setTimeout(pollTasks, 1000);
      }
    }

    // Start polling
    pollTasks();

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return { tasks };
}

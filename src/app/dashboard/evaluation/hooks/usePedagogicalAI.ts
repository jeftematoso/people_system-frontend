import { api } from "@/services/api";
import { useEffect, useState } from "react";

export function usePedagogicalAI(apprenticeId?: string) {

  const [summary, setSummary] = useState("");

  useEffect(() => {

    if (!apprenticeId) return;

    async function load() {

      try {

        const response = await api.get(
          `/pedagogical-ai/${apprenticeId}`
        );

        setSummary(response.data.summary);

      } catch {

        setSummary("");

      }

    }

    load();

  }, [apprenticeId]);

  return summary;

}
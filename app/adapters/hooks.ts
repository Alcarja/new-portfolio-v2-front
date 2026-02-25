import { useQuery } from "@tanstack/react-query";
import * as api from "./api";

export const useGetAllProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => api.getAllProjects(),
  });
};

export const useGetProjectById = (projectId: number) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => api.getProjectById(projectId),
    enabled: !!projectId,
  });
};

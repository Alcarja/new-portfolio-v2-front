import stpApi from "@/app/utils/stp-api";

// PROJECTS
export const getAllProjects = async () => {
  return stpApi.get("/api/projects/get-all-projects", {});
};

export const getProjectById = async (projectId: number) => {
  return stpApi.get(`/api/projects/get-project-by-id/${projectId}`, {});
};

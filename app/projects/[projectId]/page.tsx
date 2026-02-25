"use client";

import { useGetProjectById } from "@/app/adapters/hooks";
import { use } from "react";

const ProjectPage = ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = use(params);
  const { data: project, isLoading } = useGetProjectById(Number(projectId));

  if (isLoading) return <p>Loading...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div>
      <h1>{project.name}</h1>
      <p>
        {project.type} &middot; {project.year}
      </p>
    </div>
  );
};

export default ProjectPage;

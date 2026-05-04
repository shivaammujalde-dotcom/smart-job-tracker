import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import API from "../api/axios";

const columns = [
  "Applied",
  "Interview",
  "Hired",
  "Rejected",
];

export default function KanbanBoard() {
  const [jobs, setJobs] = useState([]);

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const { data } =
        await API.get("/jobs");

      setJobs(data?.jobs || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Drag End
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const jobId =
      result.draggableId;

    const newStatus =
      result.destination.droppableId;

    try {
      // Update Backend
      await API.patch(
        `/jobs/${jobId}`,
        {
          status: newStatus,
        }
      );

      // Update UI
      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId
            ? {
                ...job,
                status: newStatus,
              }
            : job
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Job Pipeline Board
        </h1>

        <p className="text-gray-500 mt-2">
          Drag and drop jobs between stages.
        </p>
      </div>

      {/* Board */}
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {columns.map((column) => {
            const columnJobs =
              jobs.filter(
                (job) =>
                  job.status === column
              );

            return (
              <Droppable
                key={column}
                droppableId={column}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 min-h-[500px]"
                  >
                    
                    {/* Column Header */}
                    <div className="mb-4">
                      
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {column}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {
                          columnJobs.length
                        }{" "}
                        jobs
                      </p>
                    </div>

                    {/* Cards */}
                    <div className="space-y-4">
                      
                      {columnJobs.map(
                        (
                          job,
                          index
                        ) => (
                          <Draggable
                            key={
                              job._id
                            }
                            draggableId={
                              job._id
                            }
                            index={
                              index
                            }
                          >
                            {(
                              provided
                            ) => (
                              <div
                                ref={
                                  provided.innerRef
                                }
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border dark:border-gray-700"
                              >
                                
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                  {
                                    job.company
                                  }
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 mt-1">
                                  {
                                    job.position
                                  }
                                </p>

                                <div className="mt-3 text-sm text-gray-500">
                                  Status:{" "}
                                  {
                                    job.status
                                  }
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}

                      {
                        provided.placeholder
                      }
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
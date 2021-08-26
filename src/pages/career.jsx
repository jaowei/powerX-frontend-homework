import { React, useState, useEffect } from "react";
import { CareerItem } from "../components/career-item";
import { Form } from "../components/form";

const getJobs = (page, signal) => {
  return fetch(
    `https://ecomm-service.herokuapp.com/job?limit=5&page=${page}` +
      (page === 2 ? "&delay=3000" : ""),
    {
      signal,
    }
  ).then((res) => res.json());
};

export const Career = () => {
  const [jobs, setJobs] = useState(undefined);

  const loadJobs = (pageNum, signal) =>
  getJobs(pageNum, signal)
    .then((data) => setJobs(data))
    .catch((err) => {
      if (err.name !== "AbortError") {
        throw err;
      }
    });

  const [page, setPage] = useState(1);

  useEffect(() => {
    const ab = new AbortController();
    loadJobs(page, ab.signal);
    return () => {
      ab.abort();
    };
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto px-3 py-12 space-y-6">
      <div className="mb-8">
          <div>
            <h1 className="text-6xl mb-4 font-extrabold">Careers</h1>
          </div>
        </div>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:w-1/2">
          <Form loadJobs={loadJobs}/>
        </div>
        <div className="md:flex-1">
          <div className="max-w-xl mx-auto p-6 space-y-5">
            {jobs &&
              jobs.map((job) => (
                <CareerItem
                  title={job.title}
                  department={job.department}
                  level={job.level}
                  onEdit={() => alert("Edit btn clicked, populate the form!")}
                  onDelete={() => alert("Delete btn clicked, delete the item!")}
                  key={job._id}
                />
              ))}
          </div>
          <div className="flex justify-between items-center max-w-xl mx-auto">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="
                inline-flex
                justify-center
                py-2
                px-4
                border border-transparent
                shadow-sm
                text-sm
                font-medium
                rounded-md
                text-white
                bg-pink-600
                hover:bg-pink-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-pink-500
              "
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              className="
                inline-flex
                justify-center
                py-2
                px-4
                border border-transparent
                shadow-sm
                text-sm
                font-medium
                rounded-md
                text-white
                bg-pink-600
                hover:bg-pink-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-pink-500
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
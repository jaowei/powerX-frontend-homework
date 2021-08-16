import React from "react";

const usePersistedState = (storageKey, defaultValue) => {
  const [value, setValue] = React.useState(
    () => sessionStorage.getItem(storageKey) || defaultValue
  );

  React.useEffect(() => {
    sessionStorage.setItem(storageKey, value);
  }, [value, storageKey]);

  return [value, setValue];
};

const createJob = (data) =>
  fetch("https://ecomm-service.herokuapp.com/job", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export function Form(props) {
  const [title, setTitle] = usePersistedState("jobTitle", "");

  const [level, setLevel] = usePersistedState("level", "internship");
  const [department, setDepartment] = usePersistedState("department", "");
  const [summary, setSummary] = usePersistedState("summary", "");
  const [headcount, setHeadcount] = usePersistedState("headcount", 1);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        createJob({
          title,
          level,
          department,
          summary,
          headcount: Number(headcount),
        }).then(() => {
          props.loadJobs();
          setTitle("");
          setLevel("internship");
          setDepartment("");
          setSummary("");
          setHeadcount(1);
        });
      }}
      className="p-3"
    >
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:px-6 text-lg">Add Job Posting</div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-5">
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
              <label htmlFor="title" className="block text-sm font-medium">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                required
              />
            </div>
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
              <label htmlFor="Level" className="block text-sm font-medium">
                Level
              </label>
              <select
                id="level"
                name="level"
                value={level}
                onChange={(ev) => setLevel(ev.target.value)}
                required
              >
                <option value="internship">Internship</option>
                <option value="entry">Entry</option>
                <option value="experienced">Experienced</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
              <label htmlFor="department" className="block text-sm font-medium">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={department}
                onChange={(ev) => setDepartment(ev.target.value)}
                placeholder="e.g. Engineering"
                required
              />
            </div>
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
              <label htmlFor="summary" className="block text-sm font-medium">
                Summary
              </label>
              <textarea
                id="summary"
                name="summary"
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
                required
              />
            </div>
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
              <label htmlFor="headcount" className="block text-sm font-medium">
                Headcount
              </label>
              <input
                type="number"
                id="headcount"
                name="headcount"
                value={headcount}
                onChange={(ev) => setHeadcount(ev.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6 flex justify-between">
          <button
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
            ADD
          </button>
        </div>
      </div>
    </form>
  );
}

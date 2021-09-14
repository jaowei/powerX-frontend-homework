import { useState } from "react";

let currentId = 0;

export const useId = (providedId) => {
  const [id] = useState(() => providedId || String(currentId++));
  return id;
};
const getContentType = (data: unknown) => {
  if (typeof data === "string" && !JSON.parse(data)) return "text/plain";
  if (typeof data === "string" && JSON.parse(data)) return "application/json";
};

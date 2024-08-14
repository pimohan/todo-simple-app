export const patchData = async (apiURL: string, id: number, values: object) => {
  const response = await fetch(`${apiURL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...values }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  console.log("PATCH", {
    method: "PATCH",
    body: JSON.stringify({ ...values }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const result = await response.json();

  console.log("PATCH RES", result);
  return result;
};

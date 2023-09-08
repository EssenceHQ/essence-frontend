export function formatDate() {
  var d = new Date();

  return d;
}

export const updateTimeSpent = async (timeSpent, notified, date) => {
  const id = "64f8dbf7e2309736762b7e09";
  const url = `${import.meta.env.VITE_API_END_POINT}/user/${id}`; // Replace this with the real API endpoint
  console.log(id, timeSpent, notified, date);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timeSpent, notified, date }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error();
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

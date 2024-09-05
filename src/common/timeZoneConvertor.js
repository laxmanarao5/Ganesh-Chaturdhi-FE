export const convertIsoToCustomFormat = (dateString) => {
  const date = new Date(dateString);

  // Adjust for IST (UTC +5:30)
  const offset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
  const istDate = new Date(date.getTime() + offset);

  // Extracting IST components
  const year = istDate.getUTCFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
  const day = String(istDate.getDate()).padStart(2, '0');
  const hours = String(istDate.getHours()).padStart(2, '0');
  const minutes = String(istDate.getMinutes()).padStart(2, '0');
  const seconds = String(istDate.getSeconds()).padStart(2, '0');

  // Formatting to the desired format: yyyy-mm-dd hours:minutes:seconds
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
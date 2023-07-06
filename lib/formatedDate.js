export const formatDate = (date) => {
    return date.toISOString().replace("T", " ").substring(0, 19);
  };

  export const formatDate2 = (dateISO) => {
    // let dateStr = "2023-06-26T15:20:00.000Z"; // ISO format date string
    let date = new Date(dateISO);

    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
const formatTimestampToTime = (timestamp: number) => {
  const date = new Date(timestamp);

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return formattedTime;
};

export default formatTimestampToTime;

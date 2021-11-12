export const timeConverter = (date) => {
  const userData = Intl.DateTimeFormat().resolvedOptions();
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString(
      userData.locale,
      {
        timeZone: userData.timeZone,
      }
    )
  ).toLocaleDateString(userData.locale, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

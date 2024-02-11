export function formatDate(dateStr) {
  const date = new Date(dateStr);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('ru-RU', options);
  return formattedDate;
}

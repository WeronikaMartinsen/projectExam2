export function DateFormatter(dateStr: string): string {
  const date = new Date(dateStr);

  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ags",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const day: number = date.getDate();
  const month: string = months[date.getMonth()];
  const year: number = date.getFullYear();

  return `${day} ${month} ${year}`;
}

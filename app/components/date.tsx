type DateProps = {
  date: string; // In ISO format like "YYYY-MM-DD"
};

export function FormattedDate({ date }: DateProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));

  return <p>{formattedDate}</p>;
}

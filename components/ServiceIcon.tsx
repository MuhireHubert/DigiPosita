const paths: Record<string, string> = {
  pickups:
    "M3 7h11v10H3z M14 10h4l3 4v3h-7 M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4 M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4 M6 4h5",
  tracking:
    "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0 M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  deliveries: "M3 7l9-4 9 4v10l-9 4-9-4z M3 7l9 4 9-4 M12 11v10 M7 5l10 4",
  auctions: "M14 3l7 7-4 4-7-7z M12 12l-8 8 M3 21h10 M7 4l3-3 M20 11l3 3",
  submissions: "M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 16h6",
  poboxes: "M3 9h18v12H3z M3 9l4-6h10l4 6 M8 13h8 M12 13v3",
  exports:
    "M3 12h18 M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 3c-5 6-5 12 0 18 M12 3c5 6 5 12 0 18",
  trade: "M3 8h18v13H3z M8 8V4h8v4 M3 13h18 M10 13v3h4v-3",
  shops:
    "M4 10v11h16V10 M3 10l2-7h14l2 7 M3 10q3 4 6 0 3 4 6 0 3 4 6 0 M9 21v-6h6v6",
  kashi: "M3 8l9-5 9 5z M5 11v7 M10 11v7 M15 11v7 M20 11v7 M3 21h18",
  other: "M4 4h16v13H9l-5 4z M8 8h8 M8 12h5",
};
export default function ServiceIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.other} />
    </svg>
  );
}

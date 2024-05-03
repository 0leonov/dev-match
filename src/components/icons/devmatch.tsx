export function DevMatch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0H1C0.447715 0 0 0.447715 0 1V5C0 5.55228 0.447715 6 1 6H12C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18H8C7.44772 18 7 17.5523 7 17V13C7 12.4477 6.55228 12 6 12H1C0.447715 12 0 12.4477 0 13V18C0 18.5523 0.447715 19 1 19H5C5.55228 19 6 19.4477 6 20V23C6 23.5523 6.44772 24 7 24H12C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0Z"
      />
    </svg>
  );
}

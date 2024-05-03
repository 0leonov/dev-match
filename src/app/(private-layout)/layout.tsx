import { PrivateHeader } from "@/components/header";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PrivateHeader />
      {children}
    </>
  );
}

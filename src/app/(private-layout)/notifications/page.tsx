import { get } from "@/features-1/connect";

import { RequestList } from "./request-list";

export default async function Notifications() {
  const requests = await get();

  return (
    <main className="container max-w-screen-sm py-8">
      {requests.length > 0 && <RequestList requests={requests} />}
    </main>
  );
}

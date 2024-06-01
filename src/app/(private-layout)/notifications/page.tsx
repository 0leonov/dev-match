import { getRequests } from "@/features/connections/actions";
import { RequestList } from "@/features/connections/request-list";

export default async function Notifications() {
  const requests = await getRequests();

  return (
    <main className="container max-w-screen-sm py-8">
      {requests.length > 0 && <RequestList requests={requests} />}
    </main>
  );
}

import { auth } from "@/auth";
import { EditProfileForm } from "@/features/edit-profile";

export default async function EditProfile() {
  const session = await auth();

  if (!session) {
    throw Error("Not authenticated");
  }

  return (
    <main className="container max-w-screen-sm py-8">
      <EditProfileForm session={session} />
    </main>
  );
}

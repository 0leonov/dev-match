import { auth } from "@/auth";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSkills } from "@/features/skills/lib";
import { deleteUser } from "@/features/users/actions";
import { EditProfileForm } from "@/features/users/edit-profile-form";
import { EditSkillsForm } from "@/features/users/edit-skills-form";
import { EditUsernameForm } from "@/features/users/edit-username-form";
import { getUserSkills } from "@/features/users/lib";

import { DeleteUserButton } from "./delete-user-button";

export default async function EditProfile() {
  const session = await auth();

  if (!session) {
    throw Error("Not authenticated");
  }

  const skills = await getSkills();

  const defaultSkillIds = (await getUserSkills(session.user.id)).map(
    ({ id }) => id,
  );

  return (
    <main className="container max-w-screen-sm space-y-8 py-8">
      <EditUsernameForm action="Save" username={session.user.username} />
      <EditSkillsForm allSkills={skills} defaultSkillIds={defaultSkillIds} />
      <EditProfileForm
        bio={session.user.bio}
        gender={session.user.gender}
        birthdate={session.user.birthdate}
        name={session.user.name}
      />

      <form action={deleteUser}>
        <Card className="overflow-hidden border-destructive/30 bg-destructive/30">
          <CardHeader className="bg-card">
            <CardTitle>Danger zone</CardTitle>

            <CardDescription>
              Deleting your account is irreversible. Proceed with caution.
            </CardDescription>
          </CardHeader>

          <CardFooter className="border-t border-destructive/30 px-6 py-4">
            <DeleteUserButton />
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}

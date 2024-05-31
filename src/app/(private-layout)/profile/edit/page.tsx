import { auth } from "@/auth";
import { getAll } from "@/features/skill";
import { getUserSkills } from "@/features/user";
import {
  EditProfileForm,
  EditSkillsForm,
  EditUsernameForm,
} from "@/features-1/edit-profile";

export default async function EditProfile() {
  const session = await auth();

  if (!session) {
    throw Error("Not authenticated");
  }

  const skills = await getAll();

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
    </main>
  );
}

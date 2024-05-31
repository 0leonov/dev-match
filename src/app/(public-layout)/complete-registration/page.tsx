import { EditUsernameForm } from "@/features/edit-profile";

export default function CompleteRegistration() {
  return (
    <main className="container max-w-screen-sm py-8">
      <EditUsernameForm
        title="Create your account"
        description="Enter your information to create an account"
        action="Create account"
        redirect={true}
      />
    </main>
  );
}

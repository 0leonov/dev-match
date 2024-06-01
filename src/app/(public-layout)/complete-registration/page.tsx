import { EditUsernameForm } from "@/features/users/edit-username-form";

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

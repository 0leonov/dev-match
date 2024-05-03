import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitHubSignInButton, GoogleSignInButton } from "@/features/sign-in";
import { routes } from "@/lib/routes";

export default function Login() {
  return (
    <main className="container max-w-screen-sm py-8">
      <Card>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>

          <CardDescription>
            Sign in with your Google or GitHub account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="grid w-full grid-cols-2 gap-4">
          <GoogleSignInButton />

          <GitHubSignInButton />
        </CardContent>

        <CardFooter>
          <p className="w-full text-center text-sm text-muted-foreground">
            By continuing you agree to our{" "}
            <Link
              href={routes.terms}
              className="font-medium underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={routes.terms}
              className="font-medium underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

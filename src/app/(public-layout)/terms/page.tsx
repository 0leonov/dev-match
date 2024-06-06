import Link from "next/link";

import { Footer } from "@/components/footer";

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container max-w-screen-md grow py-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Terms and Conditions
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: 06.06.2024
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Please read these Terms and Conditions (&quot;Terms&quot;, &quot;Terms
          and Conditions&quot;) carefully before using the DevMatch website
          (https://dev-match.tech) (the &quot;Service&quot;) operated by{" "}
          <strong>DevMatch</strong> (&quot;us&quot;, &quot;we&quot;, or
          &quot;our&quot;).
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          1. Accounts
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          By creating an account on our Service, you agree to:
        </p>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Provide accurate, complete, and current information.</li>
          <li>Maintain the security of your password and identification.</li>
          <li>
            Be responsible for all activities that occur under your account.
          </li>
          <li>Be at least 16 years of age.</li>
        </ul>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          2. User Content
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          You may post content on our Service, including comments and reviews.
          By posting content, you agree to the following rules:
        </p>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            You will not post any content that is unlawful, harmful,
            threatening, abusive, harassing, defamatory, vulgar, obscene,
            libelous, invasive of another&apos;s privacy, hateful, or racially,
            ethnically, or otherwise objectionable.
          </li>
          <li>
            You will not post any content that infringes any patent, trademark,
            trade secret, copyright, or other proprietary rights of any party.
          </li>
          <li>
            You grant us a non-exclusive, transferable, sub-licensable,
            royalty-free, worldwide license to use any content you post on or in
            connection with the Service.
          </li>
        </ul>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          3. Intellectual Property
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The Service and its original content (excluding content provided by
          users), features, and functionality are and will remain the exclusive
          property of DevMatch and its licensors. Our trademarks and trade dress
          may not be used in connection with any product or service without the
          prior written consent of DevMatch.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          4. Limitation of Liability
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          In no event shall DevMatch, nor its directors, employees, partners,
          agents, suppliers, or affiliates, be liable for any indirect,
          incidental, special, consequential, or punitive damages, including
          without limitation, loss of profits, data, use, goodwill, or other
          intangible losses, resulting from:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Your use of the Service.</li>
          <li>
            Any unauthorized access to or use of our servers and/or any personal
            information stored therein.
          </li>
        </ul>
        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          5. Governing Law
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          These Terms shall be governed and construed in accordance with the
          laws of [Your Jurisdiction], without regard to its conflict of law
          provisions.
        </p>
        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          6. Contact Us
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          If you have any questions about these Terms, please contact us at:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            Email:{" "}
            <Link href="mailto:6leonov@gmail.com">6leonov@gmail.com</Link>
          </li>
        </ul>
        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          7. Changes to These Terms
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material, we will provide at
          least 30 days&apos; notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole
          discretion.
        </p>
      </main>

      <Footer />
    </div>
  );
}

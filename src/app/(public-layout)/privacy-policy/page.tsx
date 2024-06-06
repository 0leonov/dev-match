import Link from "next/link";

import { Footer } from "@/components/footer";

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container max-w-screen-md grow py-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: 06.06.2024
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          <strong>DevMatch</strong> (&quot;we&quot;, &quot;our&quot;, or
          &quot;us&quot;) operates the DevMatch website (https://dev-match.tech)
          (the &quot;Service&quot;). This page informs you of our policies
          regarding the collection, use, and disclosure of personal data when
          you use our Service and the choices you have associated with that
          data.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          1. Information Collection and Use
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          We collect several types of information for various purposes to
          provide and improve our Service to you.
        </p>

        <h3 className="mt-8 text-2xl font-semibold tracking-tight">
          Types of Data Collected
        </h3>

        <h4 className="mt-6 text-xl font-semibold tracking-tight">
          Personal Data
        </h4>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          While using our Service, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you (&quot;Personal Data&quot;). Personally identifiable
          information may include, but is not limited to:
        </p>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Name</li>
          <li>Email address</li>
          <li>Date of birth</li>
          <li>Gender</li>
        </ul>

        <h4 className="text-xl font-semibold tracking-tight">
          Data Collection Methods
        </h4>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          We collect this information through forms and third-party services.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          2. Use of Data
        </h2>

        <p>DevMatch uses the collected data for various purposes:</p>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>To improve our Service</li>
        </ul>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          3. Data Storage and Security
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          We securely store your data in our database and retain it for as long
          as necessary to fulfill the purposes for which it was collected. We
          implement various access management practices to protect your data.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          4. User Rights
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          You have the following rights regarding your data:
        </p>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Access: You can request access to your data.</li>
          <li>Correction: You can request correction of your data.</li>
          <li>Deletion: You can request deletion of your data.</li>
        </ul>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          These rights can be exercised through forms and UI provided on our
          platform.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          5. Cookies and Tracking Technologies
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          We use cookies and similar tracking technologies to track the activity
          on our Service and hold certain information for security purposes.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          6. Service Providers
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          We do not share your data with any third-party service providers.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          7. Contact Us
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            Email:{" "}
            <Link href="mailto:6leonov@gmail.com">6leonov@gmail.com</Link>
          </li>
        </ul>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          8. Changes to This Privacy Policy
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>
      </main>

      <Footer />
    </div>
  );
}

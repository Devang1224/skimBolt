import Navbar from "@/components/ui/navbar";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the SkimBolt browser extension.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#f6f9fc] min-h-screen relative">
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white/80 border border-[#e2e8f0] rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-[#1e293b]">
            SkimBolt Privacy Policy
          </h1>
          <p className="text-sm text-[#64748b] mt-2">
            Effective date: February 2, 2026
          </p>

          <p className="mt-6 text-[#475569] leading-relaxed">
            This Privacy Policy explains how the SkimBolt browser extension
            collects and uses information. SkimBolt only summarizes text from
            the currently active webpage after you explicitly click the summarize
            action. We do not collect data in the background.
          </p>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e293b]">
              Information We Collect
            </h2>
            <ul className="mt-3 space-y-2 text-[#475569] list-disc pl-5">
              <li>
                Webpage text from the active tab, only when you request a
                summary.
              </li>
              <li>
                Summary output generated for you and displayed in the side
                panel.
              </li>
              <li>
                Authentication data (an existing SkimBolt website cookie and a
                local auth token) to identify your account.
              </li>
              <li>
                User preferences stored locally (such as summary settings).
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e293b]">
              How We Use Information
            </h2>
            <ul className="mt-3 space-y-2 text-[#475569] list-disc pl-5">
              <li>Generate summaries you request.</li>
              <li>Show summaries and controls in the side panel.</li>
              <li>Keep you signed in and personalize your preferences.</li>
              <li>Store requested summaries so you can access them later.</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e293b]">
              Data Storage and Security
            </h2>
            <ul className="mt-3 space-y-2 text-[#475569] list-disc pl-5">
              <li>
                The extension stores the auth token and preferences locally in
                Chrome storage.
              </li>
              <li>
                Summaries and authentication details are stored securely on the
                SkimBolt backend only to provide the requested functionality.
              </li>
              <li>
                Raw page text is used to create a summary and is not retained
                beyond what is necessary to deliver that summary.
              </li>
              <li>
                No remote code is downloaded or executed; all executable code is
                bundled within the extension.
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e293b]">
              Cookies and Authentication
            </h2>
            <ul className="mt-3 space-y-2 text-[#475569] list-disc pl-5">
              <li>
                The extension reads an existing authentication cookie for the
                SkimBolt website only, so it can recognize the logged-in user.
              </li>
              <li>
                The extension does not set or read cookies on any other
                websites.
              </li>
              <li>
                You can sign out to clear authentication and stop the extension
                from using your account.
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e293b]">
              Third-Party Services
            </h2>
            <p className="mt-3 text-[#475569] leading-relaxed">
              SkimBolt does not use third-party advertising, analytics, or
              tracking services. We do not sell or share your data with third
              parties. Any service providers used to host or operate the
              SkimBolt backend process data only on our behalf and are required
              to protect it.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e293b]">
              User Control and Consent
            </h2>
            <ul className="mt-3 space-y-2 text-[#475569] list-disc pl-5">
              <li>
                Data collection happens only when you click to summarize the
                active webpage.
              </li>
              <li>
                You can disable or remove the extension at any time from Chrome.
              </li>
              <li>
                You can clear extension storage in Chrome to remove local data.
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e293b]">
              What We Do Not Collect
            </h2>
            <ul className="mt-3 space-y-2 text-[#475569] list-disc pl-5">
              <li>We do not collect browsing history.</li>
              <li>We do not collect data from tabs you did not summarize.</li>
              <li>We do not collect precise location or device identifiers.</li>
              <li>We do not use data for ads, tracking, or profiling.</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e293b]">
              Permissions Explained
            </h2>
            <ul className="mt-3 space-y-2 text-[#475569] list-disc pl-5">
              <li>
                <span className="font-medium">activeTab:</span> Accesses the
                active page only after you click summarize.
              </li>
              <li>
                <span className="font-medium">scripting:</span> Injects the
                summarization script into the active page when requested.
              </li>
              <li>
                <span className="font-medium">storage:</span> Saves your token
                and preferences locally.
              </li>
              <li>
                <span className="font-medium">cookies:</span> Reads the SkimBolt
                website cookie only to identify your account.
              </li>
              <li>
                <span className="font-medium">sidePanel:</span> Displays the
                summary UI in a side panel.
              </li>
              <li>
                <span className="font-medium">webNavigation:</span> Detects
                page changes so summaries apply to the current page you are
                viewing.
              </li>
              <li>
                <span className="font-medium">host permissions:</span> Limited
                to the SkimBolt website for authentication and account actions.
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e293b]">
              Changes to This Policy
            </h2>
            <p className="mt-3 text-[#475569] leading-relaxed">
              We may update this policy to reflect product changes or legal
              requirements. When we make changes, we will update the effective
              date on this page.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e293b]">
              Contact Information
            </h2>
            <p className="mt-3 text-[#475569] leading-relaxed">
              If you have questions about this policy, contact us at
              devangmehra2001@gmail.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

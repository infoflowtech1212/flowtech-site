import type { Metadata } from "next";
import LegalShell, { LegalSection } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How FlowTech collects, uses, and protects information.",
};

const mail = (
  <a href="mailto:info@flowtechapps.com" className="text-teal-brand hover:text-teal-hover">
    info@flowtechapps.com
  </a>
);

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" effectiveDate="July 13, 2026">
      <LegalSection heading="1. Who we are">
        <p className="m-0">
          FlowTech (&quot;FlowTech,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          provides business strategy consulting, systems integration, workflow automation,
          analytics, and software development services for real estate investment and operations
          teams. This Privacy Policy explains how we collect, use, and protect information when
          you visit www.flowtechapps.com (the &quot;Site&quot;) or engage our services.
        </p>
      </LegalSection>
      <LegalSection heading="2. Information we collect">
        <p className="m-0 mb-2.5">
          <strong>Information you provide.</strong> When you contact us, book a call, or submit a
          form on the Site, we collect the information you choose to share, such as your name,
          company, email address, phone number, and the details of your inquiry.
        </p>
        <p className="m-0 mb-2.5">
          <strong>Information collected automatically.</strong> Like most websites, we may collect
          standard technical information when you visit the Site, such as browser type, device
          type, pages visited, and general usage data, through cookies or similar technologies.
        </p>
        <p className="m-0">
          <strong>Client engagement data.</strong> In the course of a consulting engagement,
          clients may share operational and business data with us. That data is governed by the
          terms of the applicable engagement agreement and any confidentiality obligations in it,
          not by this policy alone.
        </p>
      </LegalSection>
      <LegalSection heading="3. How we use information">
        <p className="m-0">
          We use the information we collect to respond to inquiries, schedule and conduct
          discovery calls, provide and improve our services, communicate with you about
          engagements, and operate and secure the Site. We do not sell your personal information.
        </p>
      </LegalSection>
      <LegalSection heading="4. How we share information">
        <p className="m-0">
          We may share information with trusted service providers who help us operate our business
          (such as scheduling, email, and hosting providers), when required by law, or in
          connection with a business transaction such as a merger or acquisition. Service
          providers are permitted to use information only to perform services on our behalf.
        </p>
      </LegalSection>
      <LegalSection heading="5. Data governance and security">
        <p className="m-0">
          Data governance and security are central to how we work, for our clients and for
          ourselves. We use reasonable administrative, technical, and physical safeguards designed
          to protect the information we hold. No method of transmission or storage is completely
          secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>
      <LegalSection heading="6. Data retention">
        <p className="m-0">
          We retain personal information only as long as needed for the purposes described in this
          policy, to comply with legal obligations, or as required under an engagement agreement,
          and then delete or de-identify it.
        </p>
      </LegalSection>
      <LegalSection heading="7. Your choices and rights">
        <p className="m-0">
          You may request access to, correction of, or deletion of your personal information by
          contacting us at {mail}. Depending on where you live, you may have additional rights
          under applicable privacy laws, and we will honor valid requests as required by those
          laws. You can also opt out of marketing communications at any time using the unsubscribe
          link in our emails or by contacting us.
        </p>
      </LegalSection>
      <LegalSection heading="8. Third-party links">
        <p className="m-0">
          The Site may link to third-party websites, including our product sites (doccreate.io,
          qrtrax.com, prismpm.ai). Those sites have their own privacy policies, and we are not
          responsible for their practices.
        </p>
      </LegalSection>
      <LegalSection heading="9. Children's privacy">
        <p className="m-0">
          The Site is intended for business audiences and is not directed to children under 13. We
          do not knowingly collect personal information from children.
        </p>
      </LegalSection>
      <LegalSection heading="10. Changes to this policy">
        <p className="m-0">
          We may update this Privacy Policy from time to time. The effective date above reflects
          the latest revision. Material changes will be posted on this page.
        </p>
      </LegalSection>
      <LegalSection heading="11. Contact us">
        <p className="m-0">Questions about this policy or our data practices: {mail}.</p>
      </LegalSection>
    </LegalShell>
  );
}

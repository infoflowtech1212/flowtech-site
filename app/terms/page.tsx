import type { Metadata } from "next";
import LegalShell, { LegalSection } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of www.flowtechapps.com.",
};

const mail = (
  <a href="mailto:info@flowtechapps.com" className="text-teal-brand hover:text-teal-hover">
    info@flowtechapps.com
  </a>
);

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" effectiveDate="July 13, 2026">
      <LegalSection heading="1. Acceptance of these terms">
        <p className="m-0">
          These Terms of Service (&quot;Terms&quot;) govern your use of www.flowtechapps.com (the
          &quot;Site&quot;), operated by FlowTech (&quot;FlowTech,&quot; &quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;). By accessing or using the Site, you agree to these
          Terms. If you do not agree, please do not use the Site.
        </p>
      </LegalSection>
      <LegalSection heading="2. The Site is informational">
        <p className="m-0">
          The Site describes our consulting services, capabilities, products, and past work.
          Content on the Site is provided for general information only and does not constitute
          professional, legal, financial, or investment advice. Consulting services are provided
          solely under a separate written engagement agreement between FlowTech and the client; in
          the event of any conflict, the engagement agreement controls.
        </p>
      </LegalSection>
      <LegalSection heading="3. Use of the Site">
        <p className="m-0">
          You agree to use the Site only for lawful purposes and in a way that does not infringe
          the rights of others or restrict their use of the Site. You may not attempt to gain
          unauthorized access to the Site, its servers, or any connected systems, or use automated
          means to scrape or copy Site content except as permitted by law.
        </p>
      </LegalSection>
      <LegalSection heading="4. Intellectual property">
        <p className="m-0">
          The Site and its content, including text, graphics, logos, designs, and software, are
          owned by FlowTech or its licensors and are protected by intellectual property laws.
          FlowTech, DocCreate, QR Trax, and PRISM names and logos are trademarks of FlowTech. You
          may not use them without our prior written consent.
        </p>
      </LegalSection>
      <LegalSection heading="5. Case studies and results">
        <p className="m-0">
          Case studies on the Site describe real engagements, presented in a way that protects
          client confidentiality. Results described are specific to those engagements and are not
          a guarantee of similar outcomes for any other organization.
        </p>
      </LegalSection>
      <LegalSection heading="6. Products and third-party sites">
        <p className="m-0">
          Our proprietary products (including DocCreate, QR Trax, and PRISM) are offered under
          their own terms on their own sites (doccreate.io, qrtrax.io, prismpm.ai). Links to
          third-party websites are provided for convenience; we are not responsible for their
          content or practices.
        </p>
      </LegalSection>
      <LegalSection heading="7. Disclaimers">
        <p className="m-0">
          The Site is provided &quot;as is&quot; and &quot;as available&quot; without warranties
          of any kind, express or implied, including warranties of merchantability, fitness for a
          particular purpose, and non-infringement. We do not warrant that the Site will be
          uninterrupted, error-free, or free of harmful components.
        </p>
      </LegalSection>
      <LegalSection heading="8. Limitation of liability">
        <p className="m-0">
          To the fullest extent permitted by law, FlowTech will not be liable for any indirect,
          incidental, special, consequential, or punitive damages, or any loss of profits,
          revenue, data, or goodwill, arising out of or related to your use of the Site. Our total
          liability for any claim relating to the Site will not exceed one hundred U.S. dollars
          ($100). Liability arising under an engagement agreement is governed by that agreement.
        </p>
      </LegalSection>
      <LegalSection heading="9. Indemnification">
        <p className="m-0">
          You agree to indemnify and hold FlowTech harmless from claims, damages, and expenses
          (including reasonable attorneys&#39; fees) arising from your misuse of the Site or
          violation of these Terms.
        </p>
      </LegalSection>
      <LegalSection heading="10. Changes to the Site or these Terms">
        <p className="m-0">
          We may modify the Site or these Terms at any time. Updated Terms take effect when
          posted, and the effective date above reflects the latest revision. Continued use of the
          Site after changes are posted constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>
      <LegalSection heading="11. Governing law">
        <p className="m-0">
          These Terms are governed by the laws of the United States and the state in which
          FlowTech is organized, without regard to conflict-of-law principles. Any disputes will
          be resolved in the courts of that state.
        </p>
      </LegalSection>
      <LegalSection heading="12. Contact">
        <p className="m-0">Questions about these Terms: {mail}.</p>
      </LegalSection>
    </LegalShell>
  );
}

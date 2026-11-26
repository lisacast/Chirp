import Link from "next/link";
import LegalPage, {
  COMPANY,
  Mail,
  SUPPORT_EMAIL,
  type LegalSection,
} from "@/components/LegalPage";

export const metadata = { title: "Privacy Policy · PlayChirp" };

const P = ({ children }: { children: React.ReactNode }) => <p>{children}</p>;
const UL = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="list-disc space-y-1 pl-5">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <P>
        PlayChirp is operated by {COMPANY}, Sacramento, California, USA
        (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;). This Privacy Policy
        explains what information the PlayChirp website and Chirp guide (the
        &quot;Service&quot;) handle, how it is used, and the choices you have.
        It is part of our{" "}
        <Link href="/terms" className="underline">
          Terms of Use
        </Link>
        .
      </P>
    ),
  },
  {
    heading: "Children under 13 (COPPA)",
    body: (
      <>
        <P>
          PlayChirp is not directed to children under 13, and we do not
          knowingly collect, use or disclose personal information from children
          under 13, in line with the U.S. Children&apos;s Online Privacy
          Protection Act (COPPA).
        </P>
        <UL
          items={[
            "Before anyone can use the Service, we ask for their birth month and year. We use the answer only on the device to check age; it is not sent to us or stored.",
            "If the answer shows the person is under 13, they cannot enter the Service or use the chat, and the device remembers this so the age check cannot simply be retried.",
            "If we learn that we have received personal information from a child under 13, we will delete it promptly.",
            "Parents or guardians who believe their child under 13 has used PlayChirp can contact us at " +
              SUPPORT_EMAIL +
              " and we will help remove any information. Clearing the browser data on the child's device also removes everything PlayChirp saved there.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "Information we do not collect",
    body: (
      <>
        <P>
          We designed PlayChirp to work with as little information as possible.
          We do not:
        </P>
        <UL
          items={[
            "require an account, or ask for your full name, email address, phone number, home address, school or photo;",
            "use advertising, ad trackers or third-party analytics, or use cookies to track you;",
            "sell or rent your personal information, or share it for targeted advertising; or",
            "keep a copy of your chat conversations on our servers.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "Information saved on your device",
    body: (
      <>
        <P>
          Some information is saved only in your own browser, using its built-in
          storage:
        </P>
        <UL
          items={[
            "your optional nickname, that you confirmed you are 13 or older and agreed to the Terms, your daily mood check-in, and which skills you marked as practiced (kept until you clear your browser data); and",
            "your current chat conversation (kept only for your browser session and removed when you close the tab, tap Start over, or use the quick-exit button).",
          ]}
        />
        <P>
          We cannot see or access this information. Anyone using the same device
          may be able to, so please use a private window on shared devices.
        </P>
      </>
    ),
  },
  {
    heading: "Information we process to run Chirp",
    body: (
      <>
        <P>
          When you chat with Chirp, the following is sent over an encrypted
          (HTTPS) connection to our server:
        </P>
        <UL
          items={[
            "the recent messages in your current conversation (which can include your nickname if Chirp greeted you by it), and",
            "the mood you picked today, if any.",
          ]}
        />
        <P>
          Our server checks the latest message for crisis words so it can show
          safety resources, then passes the conversation to our AI service
          provider to create Chirp&apos;s reply. The reply is sent back to your
          browser. We do not store the conversation. Our AI service provider
          processes it on our behalf to produce the reply, is not permitted to
          use it to train its models, and may keep it for a limited time under
          its own policies for safety and abuse monitoring before deleting it.
        </P>
        <P>
          <strong>Please do not share personal details</strong>, such as your
          full name, address, phone number, school, passwords or other
          people&apos;s private information, in the chat.
        </P>
      </>
    ),
  },
  {
    heading: "Technical information",
    body: (
      <P>
        Like almost every website, our hosting provider automatically records
        basic technical information when your browser requests a page, such as
        IP address, browser type, the page requested and the date and time. This
        is used to deliver the site, keep it secure, prevent abuse and see
        overall traffic, and is kept for a limited time. To prevent misuse, our
        server also briefly uses a scrambled (hashed) form of your IP address to
        limit how many messages can be sent per minute; this record is discarded
        within minutes.
      </P>
    ),
  },
  {
    heading: "How we use information",
    body: (
      <UL
        items={[
          "to provide the Service, including generating Chirp's replies and suggesting skills;",
          "to show crisis and safety resources when a message suggests someone may be at risk;",
          "to keep the Service secure, reliable and free from abuse, and to fix problems; and",
          "to comply with the law and protect the rights and safety of our users and others.",
        ]}
      />
    ),
  },
  {
    heading: "Who we share information with",
    body: (
      <>
        <P>We share information only as needed to run the Service:</P>
        <UL
          items={[
            "Service providers who work on our behalf under contracts that limit how they use it: our website hosting provider and our AI service provider. If we add paid subscriptions, our payment processor will handle payment details directly; we will not see or store full card numbers.",
            "Legal and safety reasons: if required by law, court order or other legal process, or when we believe in good faith that disclosure is needed to protect someone's life or safety.",
            "Business transfers: if PlayChirp is involved in a merger, acquisition or sale of assets, subject to this Privacy Policy.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "Subscriptions and payments",
    body: (
      <P>
        If you buy a subscription, a parent or guardian must make the purchase
        if you are under 18. Payments are handled by our payment processor,
        which collects the billing details needed to charge you (such as name,
        email, billing address and card details) under its own privacy policy.
        We receive only what we need to manage the subscription, such as its
        status and the email used, and keep it for as long as the subscription
        is active and as required for tax and accounting.
      </P>
    ),
  },
  {
    heading: "How long we keep information",
    body: (
      <P>
        We keep information only as long as needed for the purposes above. Chat
        conversations are not stored by us. Information on your device stays
        until you clear it. Hosting logs and any subscription records are kept
        for limited periods for security, legal and accounting reasons and then
        deleted.
      </P>
    ),
  },
  {
    heading: "Security",
    body: (
      <P>
        We use reasonable safeguards to protect information, including encrypted
        connections, keeping our AI service key out of public view, and
        collecting as little as possible. No system is completely secure, so we
        cannot guarantee absolute security.
      </P>
    ),
  },
  {
    heading: "Your choices and rights",
    body: (
      <>
        <UL
          items={[
            "You can use PlayChirp without giving a nickname.",
            "You can delete everything PlayChirp saved on your device at any time by clearing your browser's site data, and end a chat with Start over or the quick-exit button.",
            "Depending on where you live (for example California, other U.S. states, or the European Economic Area and UK), you may have rights to access, correct, delete or get a copy of your personal information, to opt out of its sale or sharing (we do neither), and not to be treated differently for using these rights.",
          ]}
        />
        <P>
          To make a request, email <Mail to={SUPPORT_EMAIL} />. Because we do
          not keep accounts or chat records, we may have little or no
          information that can be linked to you. We will respond within the time
          required by law and will not discriminate against you for making a
          request.
        </P>
      </>
    ),
  },
  {
    heading: "Teens 13 to 17",
    body: (
      <P>
        We never sell or share the personal information of anyone under 18, and
        we do not use it for advertising or profiling. If you are under 18, we
        encourage you to review this policy with a parent or guardian.
      </P>
    ),
  },
  {
    heading: "International users",
    body: (
      <P>
        PlayChirp is operated in the United States, and information may be
        processed in the United States and other countries where our service
        providers operate. By using the Service, you understand that your
        information may be transferred to and processed in these places.
      </P>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <P>
        We may update this Privacy Policy from time to time. We will change the
        effective date above and, for important changes, show a notice in the
        Service. If we ever want to use information in a way that is materially
        different from what this policy says, we will ask for consent where
        required.
      </P>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <P>
        Questions or requests about privacy? Email <Mail to={SUPPORT_EMAIL} />.{" "}
        {COMPANY}, Sacramento, California, USA.
      </P>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <p>
          Your privacy matters, especially when you are talking about feelings.
          In short: PlayChirp is for ages 13 and up, does not need an account,
          does not use ads or trackers, does not sell your information, and does
          not keep your chat conversations.
        </p>
      }
      sections={SECTIONS}
    />
  );
}

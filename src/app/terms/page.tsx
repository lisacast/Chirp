import Link from "next/link";
import LegalPage, {
  COMPANY,
  Mail,
  SUPPORT_EMAIL,
  type LegalSection,
} from "@/components/LegalPage";

export const metadata = { title: "Terms of Use · Chirp" };

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
    heading: "Agreement to these terms",
    body: (
      <>
        <P>
          These Terms of Use (the &quot;Terms&quot;) are a binding agreement
          between you and {COMPANY} (&quot;we,&quot; &quot;us&quot; or
          &quot;our&quot;), the company that operates Chirp, the website at
          playchirp.com and the Chirp guide (together, the &quot;Service&quot;).
          By using the Service, you agree to these Terms and to our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          . If you do not agree, do not use the Service.
        </P>
      </>
    ),
  },
  {
    heading: "Not a medical service",
    body: (
      <>
        <P>
          Chirp is an educational wellness and skills-practice app. It is{" "}
          <strong>not a medical app</strong>, not a medical device, and not a
          healthcare, counseling, therapy or emergency service. The skills in
          Chirp are inspired by Dialectical Behavior Therapy (DBT), but
          using Chirp is not DBT treatment and does not create a
          therapist-client, doctor-patient or any other professional
          relationship.
        </P>
        <UL
          items={[
            "Chirp does not diagnose, treat, cure or prevent any illness or condition.",
            "Nothing in the Service is medical, psychological, legal or other professional advice.",
            "Do not use Chirp instead of getting help from a doctor, counselor or other qualified professional, and do not delay getting that help because of something you read in Chirp.",
            "If you are working with a professional, talk with them before changing how you care for yourself.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "Emergencies and crisis support",
    body: (
      <>
        <P>
          Chirp is not monitored by people and cannot send help. If you are
          in danger, thinking about hurting yourself or someone else, or in any
          emergency, <strong>call 911</strong> (or your local emergency number)
          right away. In the United States you can also call or text{" "}
          <strong>988</strong> (Suicide &amp; Crisis Lifeline) or text{" "}
          <strong>HOME to 741741</strong> (Crisis Text Line), free and 24/7.
        </P>
        <P>
          The Service may show crisis resources when certain words appear in a
          message. This is a helpful feature, not a guarantee: it may not
          recognize every situation, and it never replaces contacting emergency
          services yourself.
        </P>
      </>
    ),
  },
  {
    heading: "Who can use Chirp",
    body: (
      <>
        <P>
          <strong>You must be at least 13 years old to use Chirp.</strong>{" "}
          The Service is not directed to children under 13, and we do not
          knowingly collect personal information from anyone under 13. If you
          are under 13, please do not use the Service.
        </P>
        <P>
          If you are 13 to 17 years old (or under the age of majority where you
          live), you may use Chirp only with the permission of a parent or
          legal guardian, who agrees to these Terms on your behalf and is
          responsible for your use. A parent or guardian must make any purchase.
        </P>
        <P>
          You must also be able to form a binding agreement under the law where
          you live, and not be barred from using the Service by law.
        </P>
      </>
    ),
  },
  {
    heading: "How Chirp works and its limits",
    body: (
      <>
        <P>
          Chirp is an automated guide that uses artificial intelligence (AI) to
          respond to what you type and suggest skills to practice. AI can make
          mistakes. Its replies can be inaccurate, incomplete, out of date or
          not right for your situation, and two people asking the same thing may
          get different answers.
        </P>
        <UL
          items={[
            "You are responsible for how you use anything Chirp says. Use your own judgment, and check important decisions with a trusted adult or a qualified professional.",
            "Chirp is not a person, does not remember you between visits, and cannot contact anyone for you.",
            "We may change, improve or limit Chirp's features at any time, including setting limits on how many messages can be sent.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "Your account and device",
    body: (
      <>
        <P>
          Chirp currently works without an account. Your nickname, mood
          check-ins and practice progress are saved in your own browser on your
          device, and your chat is kept only for your current browser session.
          Anyone who uses your device may be able to see this information, so
          keep your device secure. Clearing your browser data, or using the
          quick-exit button, removes it.
        </P>
        <P>
          If we offer accounts in the future, you agree to give accurate
          information, keep your login details private, and tell us right away
          at <Mail to={SUPPORT_EMAIL} /> if you think someone else has used your
          account.
        </P>
      </>
    ),
  },
  {
    heading: "Subscriptions, payments and cancellation",
    body: (
      <>
        <P>
          Some features of Chirp may require a paid subscription. If you buy
          one, the price, billing period and what is included will be shown to
          you before you pay. By subscribing you authorize us, or our payment
          provider, to charge the payment method you give us.
        </P>
        <UL
          items={[
            "Automatic renewal: subscriptions renew automatically at the end of each billing period at the then-current price until you cancel. We will tell you in advance about any price change, and you may cancel before it takes effect.",
            "Cancellation: you can cancel at any time. Cancellation takes effect at the end of the current billing period, and you keep access until then.",
            "Free trials and promotional codes: if we offer a free trial or a code, its terms will be shown when you redeem it. Unless you cancel before a trial ends, the paid subscription starts automatically.",
            "Refunds: except where required by law, payments are non-refundable and we do not give refunds or credits for partial billing periods. If you believe you were charged in error, contact us at " +
              SUPPORT_EMAIL +
              " within 30 days.",
            "Purchases through an app store are also governed by that store's terms, and refunds for them are handled by the store.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "Acceptable use",
    body: (
      <>
        <P>To keep Chirp safe and kind for everyone, you agree not to:</P>
        <UL
          items={[
            "use the Service if you are under 13, or help anyone under 13 use it;",
            "share other people's private information, or your own full name, address, phone number, school or other contact details, in the chat;",
            "use the Service to harass, threaten, bully or harm anyone, or to create content that is unlawful, hateful, sexual or violent;",
            "try to trick, misuse, overload, reverse engineer, scrape or interfere with the Service, its AI, or its security;",
            "use automated tools to access the Service, or use it to build a competing product;",
            "copy, sell or redistribute the Service or its content except as these Terms allow; or",
            "break any law, or encourage anyone else to do any of these things.",
          ]}
        />
        <P>
          We may suspend or stop your access if we reasonably believe you have
          broken these Terms.
        </P>
      </>
    ),
  },
  {
    heading: "Your content",
    body: (
      <P>
        You keep any rights you have in what you type into Chirp (&quot;your
        content&quot;). You give us permission to use your content only as
        needed to run the Service, for example to send your messages to our AI
        service provider so Chirp can reply, and as described in our Privacy
        Policy. You are responsible for your content and confirm that you have
        the right to share it.
      </P>
    ),
  },
  {
    heading: "Our content and intellectual property",
    body: (
      <P>
        The Service, including the Chirp name and character, logos, artwork,
        skill cards, text, software and design, is owned by {COMPANY} or its
        licensors and is protected by copyright, trademark and other laws. We
        give you a personal, limited, non-exclusive, non-transferable, revocable
        license to use the Service for your own non-commercial use under these
        Terms. All rights not expressly granted are reserved. If you send us
        feedback or ideas, we may use them without any obligation to you.
      </P>
    ),
  },
  {
    heading: "Third-party services and links",
    body: (
      <P>
        The Service relies on outside providers, such as hosting, AI and payment
        providers, and may link to other websites and resources, such as crisis
        lines. We do not control and are not responsible for third-party
        websites, services or content, and a link does not mean we endorse them.
        Your use of them is at your own risk and subject to their terms.
      </P>
    ),
  },
  {
    heading: "Disclaimer of warranties",
    body: (
      <P>
        TO THE FULLEST EXTENT ALLOWED BY LAW, THE SERVICE IS PROVIDED &quot;AS
        IS&quot; AND &quot;AS AVAILABLE,&quot; WITHOUT WARRANTIES OF ANY KIND,
        WHETHER EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, NON-INFRINGEMENT AND
        UNINTERRUPTED OR ERROR-FREE OPERATION. WE DO NOT PROMISE THAT THE
        SERVICE WILL MEET YOUR NEEDS OR PRODUCE ANY PARTICULAR RESULT, OR THAT
        AI RESPONSES WILL BE CORRECT OR SAFE FOR YOUR SITUATION.
      </P>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <>
        <P>
          TO THE FULLEST EXTENT ALLOWED BY LAW, {COMPANY.toUpperCase()} AND ITS
          OWNERS, EMPLOYEES, PARTNERS AND SUPPLIERS WILL NOT BE LIABLE FOR ANY
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE
          DAMAGES, OR FOR ANY LOSS OF DATA, PROFITS OR GOODWILL, ARISING FROM OR
          RELATED TO YOUR USE OF (OR INABILITY TO USE) THE SERVICE, EVEN IF WE
          WERE TOLD SUCH DAMAGES WERE POSSIBLE.
        </P>
        <P>
          OUR TOTAL LIABILITY FOR ANY CLAIM RELATED TO THE SERVICE WILL NOT BE
          MORE THAN THE GREATER OF (A) THE AMOUNT YOU PAID US FOR THE SERVICE IN
          THE 12 MONTHS BEFORE THE CLAIM, OR (B) US $50.
        </P>
        <P>
          Some places do not allow certain of these limits, so they may not all
          apply to you. Nothing in these Terms limits liability that cannot be
          limited by law.
        </P>
      </>
    ),
  },
  {
    heading: "Indemnity",
    body: (
      <P>
        To the extent allowed by law, you agree to defend and hold harmless{" "}
        {COMPANY} from claims, losses and expenses (including reasonable
        attorneys&apos; fees) arising from your misuse of the Service or your
        breaking these Terms. If you are a minor, this applies to your parent or
        guardian.
      </P>
    ),
  },
  {
    heading: "Disputes and governing law",
    body: (
      <>
        <P>
          These Terms are governed by the laws of the State of California, USA,
          without regard to its conflict-of-law rules. Before filing any claim,
          you agree to contact us at <Mail to={SUPPORT_EMAIL} /> and try to
          resolve the issue informally for at least 30 days.
        </P>
        <P>
          Any dispute that is not resolved informally will be brought only in
          the state or federal courts located in Sacramento County, California,
          and you and we consent to their jurisdiction, except that either of us
          may bring an individual claim in small claims court. Where the law
          where you live gives you the right to bring a claim in your local
          courts, or other rights that cannot be waived, those rights are not
          affected.
        </P>
      </>
    ),
  },
  {
    heading: "Changes to the Service or these Terms",
    body: (
      <P>
        We may update the Service and these Terms from time to time. When we
        make an important change to these Terms, we will update the effective
        date above and, where appropriate, show a notice in the Service. If you
        keep using Chirp after a change takes effect, you accept the updated
        Terms. We may suspend or discontinue all or part of the Service at any
        time.
      </P>
    ),
  },
  {
    heading: "General",
    body: (
      <P>
        These Terms and the Privacy Policy are the entire agreement between you
        and us about the Service. If any part is found unenforceable, the rest
        stays in effect. Our not enforcing a provision is not a waiver. You may
        not transfer these Terms without our consent; we may transfer them as
        part of a merger, sale or reorganization. Sections that by their nature
        should survive (such as intellectual property, disclaimers, limits of
        liability and disputes) survive the end of these Terms.
      </P>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <P>
        Questions about these Terms? Email <Mail to={SUPPORT_EMAIL} />.{" "}
        {COMPANY}, Sacramento, California, USA.
      </P>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro={
        <p>
          Welcome to Chirp. Please read these Terms carefully. In short:
          Chirp is for people 13 and older, it helps you practice coping
          skills, and it is <strong>not</strong> medical care or an emergency
          service. In an emergency, call 911, or call or text 988.
        </p>
      }
      sections={SECTIONS}
    />
  );
}

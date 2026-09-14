/**
 * WhatsApp deep links — the site's only enquiry channel.
 *
 * Every CTA on the page ends here. There is no API route, no mail service and no
 * API key, which is deliberate: an enquiry form that silently fails is worse than
 * no form, and WhatsApp is how this audience already talks to suppliers. The
 * message arrives on Dhruv's phone with the context already typed out.
 *
 * `wa.me` needs the number with no '+', spaces or dashes — see site.whatsappDigits.
 */
import { site } from '@/config/site';

/** Line separator inside a wa.me `text` param. Encoded by URLSearchParams. */
const NL = '\n';

/**
 * URLSearchParams encodes a space as "+", which is correct for form submissions and
 * wrong here: `wa.me` and mail clients vary in whether they decode "+" back to a
 * space, and the ones that do not show the visitor a message full of plus signs.
 * encodeURIComponent emits %20, which every client reads the same way.
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

/** Header, hero and footer. Deliberately open — it is the visitor's turn to talk. */
export const generalEnquiry = () =>
  whatsappUrl(`Hi Dhruv, I found your site and I'd like to talk about a project.`);

/** A specific package's CTA. */
export const packageEnquiry = (packageName: string, tierName?: string) =>
  whatsappUrl(
    tierName
      ? `Hi Dhruv, I'm interested in the ${tierName} tier of your ${packageName} package.`
      : `Hi Dhruv, I'd like to talk about ${packageName}.`,
  );

/**
 * The finder result. Carries the visitor's own answers so the first reply can be
 * useful instead of "tell me more" — which is the whole point of asking five
 * questions before showing a WhatsApp button.
 */
export const finderEnquiry = (packageName: string, answers: string[]) =>
  whatsappUrl(
    [
      `Hi Dhruv, your project finder suggested ${packageName} for me.`,
      '',
      ...answers.map((line) => `• ${line}`),
    ].join(NL),
  );

export interface ContactFields {
  name: string;
  business: string;
  email: string;
  phone: string;
  project: string;
  budget: string;
  message: string;
}

/**
 * Composes the contact form into a message.
 *
 * Optional fields that were left empty are dropped entirely rather than sent as
 * "Business:" with nothing after it — a message full of empty labels reads as a
 * form dump, not as someone getting in touch.
 */
export function contactMessage(fields: ContactFields): string {
  const detail: Array<[string, string]> = [
    ['Name', fields.name],
    ['Business', fields.business],
    ['Email', fields.email],
    ['Phone', fields.phone],
    ['Looking for', fields.project],
    ['Budget', fields.budget],
  ];

  return [
    `Hi Dhruv, I'd like to talk about a project.`,
    '',
    ...detail.filter(([, value]) => value.trim() !== '').map(([label, value]) => `${label}: ${value}`),
    '',
    fields.message.trim(),
  ].join(NL);
}

/**
 * Same content, delivered by email — offered beside the WhatsApp button.
 * encodeURIComponent for the same reason as above; a mailto body is never
 * form-encoded, so "+" would arrive literally in the message.
 */
export function mailtoUrl(fields: ContactFields): string {
  const subject = encodeURIComponent(`Project enquiry from ${fields.name}`);
  const body = encodeURIComponent(contactMessage(fields));
  return `${site.emailHref}?subject=${subject}&body=${body}`;
}

"use client";

import { useState } from "react";
import { Linkedin, Mail, Send } from "lucide-react";
import { identity } from "@/data/resume";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/**
 * Static-site friendly: the form composes a `mailto:` link and hands off to the
 * visitor's email client. No backend, no third-party script, no data collected.
 * Swap `handleSubmit` for a Formspree/Basin POST if you want inbox delivery.
 */
export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name || "someone"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`,
    );
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" aria-label="Contact" className="section-wrap py-20">
      <Reveal>
        <SectionHeading index="06">Contact</SectionHeading>
      </Reveal>

      <Reveal>
        <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted">
          I&apos;m looking for roles where data engineering and data science sit close
          together. The quickest way to reach me is email or LinkedIn.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${identity.email}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {identity.email}
          </a>
          <a
            href={identity.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            {identity.linkedinLabel}
          </a>
        </div>
      </Reveal>

      <Reveal>
        <form onSubmit={handleSubmit} className="mt-8 grid max-w-xl gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="contact-name" label="Name" value={name} onChange={setName} autoComplete="name" />
            <Field
              id="contact-email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mono-label mb-1.5 block">
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-muted/60"
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
          >
            <Send className="h-4 w-4" aria-hidden />
            Open in email client
          </button>
        </form>
      </Reveal>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mono-label mb-1.5 block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-muted/60"
      />
    </div>
  );
}

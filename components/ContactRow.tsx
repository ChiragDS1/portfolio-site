"use client";

import { Linkedin, Mail } from "lucide-react";
import { identity } from "@/data/resume";
import { usePressed } from "@/lib/usePressed";
import { ResumeButton } from "./ResumeButton";

/**
 * Email · LinkedIn · Résumé. Appears on Home and again at the end of Projects,
 * so nobody has to scroll back to the top to get in touch.
 *
 * No GitHub link: `identity.githubUrl` is intentionally left unread.
 */
export function ContactRow({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      <li>
        <Chip href={`mailto:${identity.email}`}>
          <Mail className="h-4 w-4" aria-hidden />
          {identity.email}
        </Chip>
      </li>
      <li>
        <Chip href={identity.linkedinUrl} external>
          <Linkedin className="h-4 w-4" aria-hidden />
          LinkedIn
        </Chip>
      </li>
      <li>
        <ResumeButton className="glass border-0 shadow-sm" />
      </li>
    </ul>
  );
}

function Chip({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const { pressed, handlers } = usePressed();
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`glass inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm shadow-sm ${
        pressed ? "scale-[0.97] transition-none" : "transition-transform duration-150"
      }`}
      style={{ touchAction: "manipulation", color: "rgb(var(--text))" }}
      {...handlers}
    >
      {children}
    </a>
  );
}

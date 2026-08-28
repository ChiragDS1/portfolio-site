import { certifications, education } from "@/data/resume";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <section id="education" aria-label="Education and certifications" className="section-wrap py-20">
      <Reveal>
        <SectionHeading index="05">Education &amp; Certifications</SectionHeading>
      </Reveal>

      <div className="grid gap-4">
        {education.map((item) => (
          <Reveal key={item.school}>
            <div className="rounded-xl border border-line bg-surface/60 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="font-display text-base font-semibold text-text">{item.school}</h3>
                <p className="mono-label whitespace-nowrap">{item.period}</p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {item.degree} — {item.location}
              </p>
            </div>
          </Reveal>
        ))}

        {certifications.map((cert) => (
          <Reveal key={cert.name}>
            <div className="rounded-xl border border-line bg-surface/60 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="font-display text-base font-semibold text-text">{cert.name}</h3>
                <p className="mono-label whitespace-nowrap">{cert.date}</p>
              </div>
              <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

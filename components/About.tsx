import { about } from "@/data/resume";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" aria-label="About" className="section-wrap py-16">
      <Reveal>
        <SectionHeading index="01">About</SectionHeading>
      </Reveal>
      <div className="space-y-4">
        {about.map((para) => (
          <Reveal key={para}>
            <p className="text-[0.95rem] leading-relaxed text-text/90">{para}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

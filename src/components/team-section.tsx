import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

type TeamMember = (typeof site.team)[number];

function TeamMemberCard({ member }: { member: TeamMember }) {
  const image = (
    <Image
      src={member.image}
      alt={member.name}
      width={900}
      height={900}
      className="mx-auto aspect-square w-full max-w-sm object-cover transition duration-300 group-hover:scale-[1.02]"
    />
  );

  const body = (
    <>
      {"profilePath" in member && member.profilePath ? (
        <span className="block overflow-hidden">{image}</span>
      ) : (
        image
      )}
      <h3 className="mt-6 font-display text-xl text-white">
        {member.name}
        <span className="mt-1 block text-sm font-normal tracking-wide text-accent">{member.role}</span>
      </h3>
      <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-white/75">{member.bio}</p>
    </>
  );

  if ("profilePath" in member && member.profilePath) {
    return (
      <Link
        href={member.profilePath}
        className="group block text-center transition duration-200 hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {body}
      </Link>
    );
  }

  return <div className="text-center">{body}</div>;
}

export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-20 px-5 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <hr className="mx-auto mb-16 w-full max-w-md border-0 border-t border-white/30" />
        <h2 className="text-center font-display text-4xl text-accent sm:text-5xl md:text-6xl">Our Team</h2>
        <ul className="mt-16 grid gap-16 md:grid-cols-3 md:gap-10">
          {site.team.map((member) => (
            <li key={member.name}>
              <TeamMemberCard member={member} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

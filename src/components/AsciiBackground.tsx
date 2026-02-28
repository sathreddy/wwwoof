import Image from "next/image";

export default function AsciiBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <Image
        src="/hero-dog.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-[0.35]"
      />
    </div>
  );
}

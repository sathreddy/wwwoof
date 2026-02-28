import { Phone, Mail, Building2 } from "lucide-react";

interface ContactCardProps {
  contactName: string;
  contactOrg: string;
  contactPhone: string;
  contactEmail: string;
}

export default function ContactCard({
  contactName,
  contactOrg,
  contactPhone,
  contactEmail,
}: ContactCardProps) {
  return (
    <div className="rounded-2xl border border-[#eee] bg-white p-6 space-y-4">
      <div>
        <h3 className="text-lg font-normal text-[#222] font-[family-name:var(--font-display)]">Interested in adopting?</h3>
        <p className="text-sm text-[#666] mt-1">
          Reach out directly to the shelter or clinic — they&apos;ll guide you through the next steps.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f9fafb]">
          <Building2 className="h-4 w-4 text-[#025f4c]" />
        </div>
        <div>
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">Organisation</p>
          <p className="font-bold text-[#222]">{contactOrg}</p>
          <p className="text-sm text-[#666]">{contactName}</p>
        </div>
      </div>

      <a
        href={`tel:${contactPhone}`}
        className="flex items-center gap-3 rounded-xl border border-[#eee] bg-white px-4 py-3 hover:bg-[#f9fafb] transition-colors group"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f9fafb] group-hover:bg-[#eee] transition-colors">
          <Phone className="h-4 w-4 text-[#666]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">Call</p>
          <p className="font-semibold text-[#222] truncate">{contactPhone}</p>
        </div>
      </a>

      <a
        href={`mailto:${contactEmail}`}
        className="flex items-center gap-3 rounded-xl border border-[#eee] bg-white px-4 py-3 hover:bg-[#f9fafb] transition-colors group"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f9fafb] group-hover:bg-[#eee] transition-colors">
          <Mail className="h-4 w-4 text-[#666]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">Email</p>
          <p className="font-semibold text-[#222] truncate">{contactEmail}</p>
        </div>
      </a>

      <p className="text-xs text-stone-400 text-center">
        Please mention you found them on wwwoof
      </p>
    </div>
  );
}

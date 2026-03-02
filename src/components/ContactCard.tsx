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
    <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 space-y-4">
      <div>
        <h3 className="text-lg font-normal text-[#33495f] font-[family-name:var(--font-display)]">Interested in adopting?</h3>
        <p className="text-sm text-[#55677a] mt-1">
          Reach out directly to the shelter or clinic — they&apos;ll guide you through the next steps.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f7f1de]">
          <Building2 className="h-4 w-4 text-[#5281a2]" />
        </div>
        <div>
          <p className="text-xs text-[#55677a] font-medium uppercase tracking-wide">Organisation</p>
          <p className="font-bold text-[#33495f]">{contactOrg}</p>
          <p className="text-sm text-[#55677a]">{contactName}</p>
        </div>
      </div>

      <a
        href={`tel:${contactPhone}`}
        className="flex items-center gap-3 rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 hover:bg-[#f7f1de] transition-colors group"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f7f1de] group-hover:bg-[#ede8d8] transition-colors">
          <Phone className="h-4 w-4 text-[#55677a]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#55677a] font-medium uppercase tracking-wide">Call</p>
          <p className="font-semibold text-[#33495f] truncate">{contactPhone}</p>
        </div>
      </a>

      <a
        href={`mailto:${contactEmail}`}
        className="flex items-center gap-3 rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 hover:bg-[#f7f1de] transition-colors group"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f7f1de] group-hover:bg-[#ede8d8] transition-colors">
          <Mail className="h-4 w-4 text-[#55677a]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#55677a] font-medium uppercase tracking-wide">Email</p>
          <p className="font-semibold text-[#33495f] truncate">{contactEmail}</p>
        </div>
      </a>

      <p className="text-xs text-[#55677a] text-center">
        Please mention you found them on wwwoof
      </p>
    </div>
  );
}

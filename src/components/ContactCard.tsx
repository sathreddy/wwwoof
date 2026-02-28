import { Phone, Mail, Building2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-6 space-y-4">
      <div>
        <h3 className="text-lg font-extrabold text-brown-900">Interested in adopting?</h3>
        <p className="text-sm text-brown-800/70 mt-1">
          Reach out directly to the shelter or clinic — they&apos;ll guide you through the next steps.
        </p>
      </div>

      {/* Org */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200">
          <Building2 className="h-4 w-4 text-amber-700" />
        </div>
        <div>
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">Organisation</p>
          <p className="font-bold text-brown-900">{contactOrg}</p>
          <p className="text-sm text-brown-800/70">{contactName}</p>
        </div>
      </div>

      {/* Phone */}
      <a
        href={`tel:${contactPhone}`}
        className="flex items-center gap-3 rounded-xl border border-amber-200 bg-white px-4 py-3 hover:bg-amber-50 transition-colors group"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors">
          <Phone className="h-4 w-4 text-amber-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">Call</p>
          <p className="font-semibold text-brown-900 truncate">{contactPhone}</p>
        </div>
      </a>

      {/* Email */}
      <a
        href={`mailto:${contactEmail}`}
        className="flex items-center gap-3 rounded-xl border border-amber-200 bg-white px-4 py-3 hover:bg-amber-50 transition-colors group"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors">
          <Mail className="h-4 w-4 text-amber-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">Email</p>
          <p className="font-semibold text-brown-900 truncate">{contactEmail}</p>
        </div>
      </a>

      <p className="text-xs text-stone-400 text-center">
        Please mention you found them on wwwoof 🐾
      </p>
    </div>
  );
}

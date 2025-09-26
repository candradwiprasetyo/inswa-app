import Link from "next/link";

export default function AdminNavigation() {
  return (
    <div className="bg-white relative text-title-primary">
      <div className="container mx-auto py-5 flex gap-16 text-sm max-w-7xl px-6">
        <div className="flex-none">
          <Link href={"/admin/program"} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-300">
              energy_program_saving
            </span>
            Program & Kegiatan
          </Link>
        </div>
        <div className="flex-none flex items-center gap-3">
          <Link href={"/admin/publikasi"} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-300">
              docs
            </span>
            Publikasi
          </Link>
        </div>
        <div className="flex-none flex items-center gap-3">
          <Link href={"/admin/profile"} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-300">
              group
            </span>
            Board of Director
          </Link>
        </div>
        <div className="flex-none flex items-center gap-3">
          <Link href={"/admin/media"} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-300">
              auto_stories
            </span>
            Media
          </Link>
        </div>
        <div className="flex-none flex items-center gap-3">
          <Link href={"/admin/member"} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-300">
              groups
            </span>
            Membership
          </Link>
        </div>
        <div className="flex-none flex items-center gap-3">
          <Link href={"/admin/partner"} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-300">
              groups
            </span>
            Mitra & Setifikat
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function AdminNavigation() {
  return (
    <div className="bg-white relative text-title-primary border-b">
      <div className="container mx-auto py-5 flex gap-16 text-sm max-w-7xl px-6">
        {/* <div className="flex-none flex items-center gap-3">
          <Link href={"/admin"} className="flex items-center gap-3">
            <i className="material-icons text-blue-300 w-6">space_dashboard</i>
            Dashboard
          </Link>
        </div> */}
        <div className="flex-none">
          <Link href={"/admin/program"} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-300">
              energy_program_saving
            </span>
            Program
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
          <Link href={"/admin/membership"} className="flex items-center gap-3">
            <i className="material-icons text-blue-300">account_box</i>
            Membership
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
      </div>
    </div>
  );
}

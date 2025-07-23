export default function Tab() {
  return (
    <div className="w-full bg-tertiary-light">
      <div className="container mx-auto px-4 md:px-44 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex items-center text-xs gap-6 min-w-max">
          <div className="font-bold text-action border-b-[3px] border-green flex h-11 items-center pt-[3px]">
            Sejarah InSWA
          </div>
          <div>Visi & Misi</div>
          <div>Struktur Organisasi</div>
          <div>Dewan Pengurus</div>
          <div>Kontak</div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

type ActivityHeaderProps = {
  onAdd: () => void;
};

export default function ActivityHeader({ onAdd }: ActivityHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">Kegiatan</h1>
      <div className="flex-none flex gap-4">
        <Link href="/admin/program">
          <button className="bg-red-400 text-white px-4 py-2 rounded-full text-sm">
            Kembali
          </button>
        </Link>
        <button
          onClick={onAdd}
          className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm"
        >
          Tambah Kegiatan
        </button>
      </div>
    </div>
  );
}

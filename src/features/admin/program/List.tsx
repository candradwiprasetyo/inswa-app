import { ProgramType } from "@/types/program";
import Image from "next/image";
import Link from "next/link";
import { cdnLoader } from "@/lib/cdnLoader";

type ProgramListProps = {
  programs: ProgramType[];
  onEdit: (program: ProgramType) => void;
  onDelete: (id: number) => void;
};

export default function ProgramList({
  programs,
  onEdit,
  onDelete,
}: ProgramListProps) {
  return (
    <div className="rounded-xl bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="p-4 w-[50px]">No</th>
            <th className="p-4 w-[100px]">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">List Kegiatan</th>
            <th className="p-4 w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((p, index) => (
            <tr key={p.id}>
              <td className="border-t p-3">{index + 1}</td>
              <td className="border-t p-3">
                {p.image && (
                  <Image
                    loader={cdnLoader}
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-12 object-cover"
                    width={80}
                    height={80}
                  />
                )}
              </td>
              <td className="border-t p-3">
                <Link href={`/admin/activity?program_id=${p.id}`}>
                  {p.name}
                </Link>
              </td>
              <td className="border-t p-3 text-center">
                <Link href={`/admin/activity?program_id=${p.id}`}>
                  <button className="bg-green-400 text-white px-4 py-2 rounded-full text-sm mx-auto">
                    Kegiatan
                  </button>
                </Link>
              </td>
              <td className="border-t p-3 space-x-2 text-center">
                <button onClick={() => onEdit(p)} className="text-blue-500">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  onClick={() => onDelete(p.id!)}
                  className="text-red-500"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

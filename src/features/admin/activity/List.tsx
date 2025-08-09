import { ActivityType } from "@/types/activity";

type ActivityListProps = {
  activities: ActivityType[];
  onEdit: (activity: ActivityType) => void;
  onDelete: (id: number) => void;
};

export default function ActivityList({
  activities,
  onEdit,
  onDelete,
}: ActivityListProps) {
  return (
    <div className="rounded-xl bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="p-4 w-[50px]">No</th>
            <th className="p-4">Nama</th>
            <th className="p-4">Tahun</th>
            <th className="p-4">Lokasi</th>
            <th className="p-4 w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a, index) => (
            <tr key={a.id}>
              <td className="border-t p-3">{index + 1}</td>
              <td className="border-t p-3">{a.name}</td>
              <td className="border-t p-3">{a.year}</td>
              <td className="border-t p-3">{a.location}</td>
              <td className="border-t p-3 space-x-2 text-center">
                <button onClick={() => onEdit(a)} className="text-blue-500">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  onClick={() => onDelete(a.id!)}
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

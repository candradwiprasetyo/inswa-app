type ProgramHeaderProps = {
  onAdd: () => void;
};

export default function ProgramHeader({ onAdd }: ProgramHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">Program</h1>
      <button
        onClick={onAdd}
        className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm"
      >
        Tambah Program
      </button>
    </div>
  );
}

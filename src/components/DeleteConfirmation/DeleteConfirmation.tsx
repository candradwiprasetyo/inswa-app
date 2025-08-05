type DeleteConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmation({
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
        <p className="text-sm text-gray-700 mb-4">
          Apakah kamu yakin ingin menghapus data ini?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-full text-sm"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

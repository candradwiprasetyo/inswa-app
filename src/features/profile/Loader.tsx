export default function Loader() {
  return (
    <div className="w-full relative">
      <div className="container mx-auto px-6 md:px-44 flex items-center pt-20 relative">
        <div className="md:flex justify-between items-center py-10 px-16 md:px-28 bg-profile rounded-tl-[96px] rounded-bl-lg rounded-br-[96px] rounded-tr-lg relative w-full gap-8 mt-32 animate-pulse">
          {/* Gambar */}
          <div className="flex-none w-60">
            <div className="w-[240px] h-[320px] bg-gray-300 rounded-tl-[80px] rounded-tr-lg rounded-br-[80px] rounded-bl-lg -mt-40 absolute"></div>
          </div>

          {/* Teks dan ikon */}
          <div className="flex-grow space-y-4">
            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
            <div className="flex gap-2 mt-2">
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-44 relative py-10 md:py-16 flex gap-10 mt-10 animate-pulse">
        {/* Konten deskripsi */}
        <div className="w-2/3 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Sidebar list */}
        <div className="w-1/3 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="w-20 h-20 bg-gray-300 rounded-tl-[24px] rounded-tr rounded-br-[24px] rounded-bl"></div>
              <div className="flex-grow space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

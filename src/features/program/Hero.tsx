export default function Hero() {
  return (
    <>
      <div className="w-full relative bg-program" id="hero">
        <div className="absolute inset-0 bg-overlay"></div>
        <div className="container mx-auto px-6 md:px-44 py-3 flex items-center pt-20 relative h-80">
          <div className="absolute text-4xl md:text-[56px] font-medium font-pathway-extreme text-white bottom-10 md:bottom-14 leading-snug md:leading-normal">
            Program & Kegiatan
          </div>
        </div>
      </div>
    </>
  );
}

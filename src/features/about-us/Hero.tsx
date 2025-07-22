export default function Hero() {
  return (
    <div className="w-full relative bg-about-us" id="hero">
      <div className="absolute inset-0 bg-overlay"></div>
      <div className="container mx-auto px-3 md:px-44 py-3 flex items-center pt-20 relative h-80">
        <div className="absolute text-[56px] font-medium font-pathway-extreme text-white bottom-14">
          Tentang Kami
        </div>
      </div>
    </div>
  );
}

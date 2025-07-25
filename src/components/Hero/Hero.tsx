import { HeroProps } from "@/types/hero";

export default function Hero({ title, background }: HeroProps) {
  return (
    <>
      <div
        className={`w-full relative bg-cover bg-center`}
        style={{ backgroundImage: `url(assets/images/${background})` }}
        id="hero"
      >
        <div className="absolute inset-0 bg-overlay"></div>
        <div className="container mx-auto px-6 md:px-44 flex items-center pt-20 relative h-80">
          <div className="absolute text-4xl md:text-[56px] font-medium font-pathway-extreme text-white bottom-10 leading-snug md:leading-normal">
            {title}
          </div>
        </div>
      </div>
    </>
  );
}

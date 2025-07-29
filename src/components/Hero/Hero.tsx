import { HeroProps } from "@/types/hero";
import clsx from "clsx";

export default function Hero({
  variant = "default",
  title,
  background,
}: HeroProps) {
  return (
    <>
      <div
        className={clsx(`w-full relative bg-cover bg-center bg-hero-green`)}
        style={{
          backgroundImage:
            variant === "default" ? `url(assets/images/${background})` : "",
        }}
        id="hero"
      >
        {variant === "default" ? (
          <div className="absolute inset-0 bg-overlay"></div>
        ) : (
          <div className="bg-line-membership absolute inset-0 md:bg-cover md:bg-bottom"></div>
        )}

        <div className="container mx-auto px-6 md:px-44 flex items-center pt-20 relative h-80">
          <div className="absolute text-4xl md:text-[56px] font-medium font-pathway-extreme text-white bottom-10 leading-snug md:leading-normal">
            {title}
          </div>
        </div>
      </div>
    </>
  );
}

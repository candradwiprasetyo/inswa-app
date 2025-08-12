import { HeroProps } from "@/types/hero";
import clsx from "clsx";

export default function Hero({
  variant = "default",
  title,
  background,
  detailPage = false,
}: HeroProps) {
  return (
    <>
      <div
        className={clsx(`w-full relative bg-cover bg-center bg-hero-green`)}
        style={{
          backgroundImage:
            variant === "default" ? `url(/assets/images/${background})` : "",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        id="hero"
      >
        {variant === "default" ? (
          <div className="absolute inset-0 bg-overlay"></div>
        ) : (
          <div className="bg-line-membership absolute inset-0 md:bg-cover md:bg-bottom"></div>
        )}

        <div className="mx-auto px-10 max-w-6xl flex items-center pt-20 relative h-80">
          <div
            className={clsx(
              "absolute text-4xl font-medium font-pathway-extreme text-primary-dark bottom-10 leading-snug md:leading-normal",
              detailPage ? "md:text-[48px]" : "md:text-[56px]"
            )}
          >
            {title}
          </div>
        </div>
      </div>
    </>
  );
}

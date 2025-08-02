import Image from "next/image";

import { ButtonType } from "@/types/button";
import clsx from "clsx";

export default function Button({
  variant = "default",
  title,
  icon,
  customClass,
}: ButtonType) {
  return (
    <button
      className={clsx(
        `h-10 px-8 text-base font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr flex gap-2`,
        variant === "default" && "bg-green-gradient",
        customClass
      )}
    >
      {title && title}
      {icon && (
        <Image
          src={`/assets/icons/${icon}.svg`}
          alt="Logo"
          width={24}
          height={24}
        />
      )}
    </button>
  );
}

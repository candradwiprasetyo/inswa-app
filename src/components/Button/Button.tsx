import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

type ButtonProps = {
  variant?: "default" | "transparent";
  title?: string;
  icon?: string;
  customClass?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function Button({
  variant = "default",
  title,
  icon,
  customClass,
  href,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = clsx(
    "h-10 px-8 text-base font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr gap-2",
    variant === "default" && "bg-green-gradient",
    disabled && "opacity-50 cursor-not-allowed",
    customClass
  );

  const content = (
    <>
      {title && title}
      {icon && (
        <Image
          src={`/assets/icons/${icon}.svg`}
          alt="icon"
          width={24}
          height={24}
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

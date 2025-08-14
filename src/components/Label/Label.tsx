"use client";

import clsx from "clsx";

export type LabelProps = {
  active?: boolean;
  title: string;
  customClass?: string;
  onClick?: () => void;
};

export default function Label({
  active = false,
  title,
  customClass,
  onClick,
}: LabelProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-full py-1 px-6 text-sm font-semibold text-action-hover cursor-pointer text-center",
        active ? "bg-surface-success" : "bg-tertiary-light",
        customClass
      )}
    >
      {title}
    </div>
  );
}

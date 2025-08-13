"use client";

import clsx from "clsx";

export type LabelProps = {
  active?: boolean;
  title: string;
  customClass?: string;
};

export default function Label({
  active = false,
  title,
  customClass,
}: LabelProps) {
  return (
    <div
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

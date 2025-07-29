"use client";

import clsx from "clsx";

export type LabelProps = {
  active?: boolean;
  title: string;
};

export default function Label({ active = false, title }: LabelProps) {
  return (
    <div
      className={clsx(
        "rounded-full py-1 px-6 text-sm font-semibold text-action-hover cursor-pointer",
        active ? "bg-surface-success" : "bg-tertiary-light"
      )}
    >
      {title}
    </div>
  );
}

"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Editor({ value, onChange }: Props) {
  return (
    <div className="prose max-w-none">
      <SimpleMDE value={value} onChange={onChange} />
    </div>
  );
}

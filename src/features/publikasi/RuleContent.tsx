"use client";

import { publicationRuleMap } from "@/lib/publicationRuleMap";
import RuleContentDetail from "./RuleContentDetail";

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export default function RuleContent({ user }: { user: User | null }) {
  return (
    <>
      {Object.entries(publicationRuleMap).map(([id, name]) => (
        <div key={id}>
          <div
            key={id}
            className={`w-full py-4 px-6 font-medium text-xl border-r border-b`}
          >
            {name}
          </div>
          <div className="border-r">
            <RuleContentDetail ruleType={id} user={user} />
          </div>
        </div>
      ))}
    </>
  );
}

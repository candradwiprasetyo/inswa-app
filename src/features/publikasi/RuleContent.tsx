"use client";

import { publicationRuleMap } from "@/lib/publicationRuleMap";
import RuleContentDetail from "./RuleContentDetail";

export default function RuleContent() {
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
            <RuleContentDetail ruleType={id} />
          </div>
        </div>
      ))}
    </>
  );
}

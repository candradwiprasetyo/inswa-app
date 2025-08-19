"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        components={{
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        }}
      >
        {content.replace(/\u2028|\u2029|\u00A0/g, " ")}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

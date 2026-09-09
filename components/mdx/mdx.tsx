import React from "react";

import { MDXRemote } from "next-mdx-remote/rsc";

import PostLink from "./link";
import PostImage from "./image";

import rehypePrettyCode from "rehype-pretty-code";

/* =========================================================
   GET PLAIN TEXT FROM REACT NODE
========================================================= */

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (
    React.isValidElement<{
      children?: React.ReactNode;
    }>(node)
  ) {
    return getTextContent(node.props.children);
  }

  return "";
}

/* =========================================================
   HEADING → SLUG
========================================================= */

const transformToSlug = (input: string) => {
  return (
    input
      .toLowerCase()
      .trim()

      // Convert "&" into readable text
      .replace(/&/g, " and ")

      // Remove accent marks
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")

      // Remove unsupported characters
      .replace(/[^\w\s-]/g, "")

      // Convert spaces into hyphens
      .replace(/\s+/g, "-")

      // Remove duplicate hyphens
      .replace(/-+/g, "-")

      // Remove leading/trailing hyphens
      .replace(/^-|-$/g, "")
  );
};

/* =========================================================
   GENERATE HEADING COMPONENT
========================================================= */

const generateHeading = (headingLevel: number) => {
  return ({ children }: { children: React.ReactNode }) => {
    const textContent = getTextContent(children);

    const slug = transformToSlug(textContent);

    return React.createElement(
      `h${headingLevel}`,
      {
        id: slug,
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor-link",
          "aria-label": `Link to ${textContent}`,
        }),

        children,
      ],
    );
  };
};

/* =========================================================
   MDX COMPONENTS
========================================================= */

const mdxComponents = {
  h1: generateHeading(1),
  h2: generateHeading(2),
  h3: generateHeading(3),
  h4: generateHeading(4),

  Link: PostLink,
  Image: PostImage,
};

/* =========================================================
   CUSTOM MDX
========================================================= */

export function CustomMDX(props: any) {
  const rehypePrettyCodeOptions = {
    theme: "one-dark-pro",

    keepBackground: false,

    /* =====================================================
       KEEP EMPTY CODE LINES
    ===================================================== */

    onVisitLine(node: any) {
      if (node.children.length === 0) {
        node.children = [
          {
            type: "text",
            value: " ",
          },
        ];
      }
    },

    /* =====================================================
       HIGHLIGHTED CODE LINE
    ===================================================== */

    onVisitHighlightedLine(node: any) {
      if (!node.properties) {
        node.properties = {};
      }

      if (!Array.isArray(node.properties.className)) {
        node.properties.className = [];
      }

      node.properties.className.push("line--highlighted");
    },

    /* =====================================================
       HIGHLIGHTED CODE WORD
    ===================================================== */

    onVisitHighlightedWord(node: any) {
      if (!node.properties) {
        node.properties = {};
      }

      node.properties.className = ["word--highlighted"];
    },
  };

  return (
    <MDXRemote
      {...props}
      components={{
        ...mdxComponents,
        ...(props.components || {}),
      }}
      options={{
        ...props.options,

        mdxOptions: {
          ...props.options?.mdxOptions,

          rehypePlugins: [
            ...(props.options?.mdxOptions?.rehypePlugins || []),

            [rehypePrettyCode, rehypePrettyCodeOptions],
          ],
        },
      }}
    />
  );
}

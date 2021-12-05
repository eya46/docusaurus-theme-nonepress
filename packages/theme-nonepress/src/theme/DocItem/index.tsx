import clsx from "clsx";
import React from "react";

import Seo from "@theme/Seo";
import TOC from "@theme/TOC";
import type { Props } from "@theme/DocItem";
import { MainHeading } from "@theme/Heading";
import DocPaginator from "@theme/DocPaginator";
import DocItemFooter from "@theme/DocItemFooter";
import TOCCollapsible from "@theme/TOCCollapsible";
import DocVersionBanner from "@theme/DocVersionBanner";
import useWindowSize from "@theme/hooks/useWindowSize";
import { ThemeClassNames } from "@docusaurus/theme-common";

import styles from "./styles.module.css";

function DocItem(props: Props): JSX.Element {
  const { content: DocContent, versionMetadata } = props;
  const { metadata, frontMatter } = DocContent;
  const {
    image,
    keywords,
    hide_title: hideTitle,
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  const { description, title } = metadata;

  // We only add a title if:
  // - user asks to hide it with frontmatter
  // - the markdown content does not already contain a top-level h1 heading
  const shouldAddTitle =
    !hideTitle && typeof DocContent.contentTitle === "undefined";

  const windowSize = useWindowSize();

  const canRenderTOC =
    !hideTableOfContents && DocContent.toc && DocContent.toc.length > 0;

  const renderTocDesktop =
    canRenderTOC && (windowSize === "desktop" || windowSize === "ssr");

  return (
    <>
      <Seo {...{ title, description, keywords, image }} />

      <div className="relative flex flex-row w-full">
        <div className="flex-grow prose dark:prose-dark p-4 lg:px-16">
          <DocVersionBanner versionMetadata={versionMetadata} />
          <div className="doc-content">
            <article>
              {versionMetadata.badge && (
                <span
                  className={clsx(
                    ThemeClassNames.docs.docVersionBadge,
                    "px-2 py-1 rounded-md",
                    "font-mono font-bold text-black text-xs",
                    "bg-gray-300 opacity-70"
                  )}
                >
                  Version: {versionMetadata.label}
                </span>
              )}

              {canRenderTOC && (
                <TOCCollapsible
                  toc={DocContent.toc}
                  minHeadingLevel={tocMinHeadingLevel}
                  maxHeadingLevel={tocMaxHeadingLevel}
                  className={clsx(
                    ThemeClassNames.docs.docTocMobile,
                    "lg:hidden"
                  )}
                />
              )}

              <div className={clsx(ThemeClassNames.docs.docMarkdown, "pt-2")}>
                {shouldAddTitle && <MainHeading>{title}</MainHeading>}

                <DocContent />
              </div>

              <DocItemFooter {...props} />
            </article>
            <DocPaginator metadata={metadata} />
          </div>
        </div>
        {renderTocDesktop && (
          <div className={clsx("p-4", styles.toc)}>
            <TOC
              toc={DocContent.toc}
              minHeadingLevel={tocMinHeadingLevel}
              maxHeadingLevel={tocMaxHeadingLevel}
              className={ThemeClassNames.docs.docTocDesktop}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DocItem;

import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { NavbarLink as NavLink } from "../../useThemeConfig";

export default function NavbarLink(
  props: PropsWithChildren<NavLink & { linkClassName?: string }>
): JSX.Element {
  const {
    to,
    href,
    label,
    icon,
    prependBaseUrlToHref,
    className,
    linkClassName,
  } = props;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  return (
    <li className={className}>
      <Link
        {...(href
          ? {
              href: prependBaseUrlToHref ? normalizedHref : href,
            }
          : {
              to: toUrl,
            })}
        className={
          linkClassName ||
          clsx(
            "self-center transition duration-300 opacity-60 hover:opacity-100",
            !label ? "text-3xl" : "text-sm font-medium uppercase"
          )
        }
      >
        {icon && <i className={clsx(icon, "mr-2 align-middle")}></i>}
        <span className="truncate">{label}</span>
      </Link>
    </li>
  );
}

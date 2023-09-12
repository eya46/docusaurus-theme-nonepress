// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  main: [
    {
      type: "category",
      label: "Guide",
      link: {
        type: "generated-index",
        title: "Guide",
        description: "Start using NonePress",
        slug: "/guide/",
      },
      items: [{ type: "autogenerated", dirName: "guide" }],
    },
  ],
  examples: [
    {
      type: "category",
      label: "Components",
      link: {
        type: "generated-index",
        title: "Components",
        description: "Examples of components",
        slug: "/components/",
      },
      items: [{ type: "autogenerated", dirName: "components" }],
    },
    {
      type: "category",
      label: "Page",
      items: [{ type: "link", label: "Page", href: "/page-example" }],
    },
    {
      type: "link",
      label: "NoneBot",
      href: "https://nonebot.dev",
    },
  ],
};

module.exports = sidebars;
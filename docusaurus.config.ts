import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'iDempiere REST',
  tagline: 'Powerful. Flexible. Connected. The REST API of iDempiere.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://bxservice.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/idempiere-rest-docs/',
  
  // GitHub Pages adds trailing slashes by default, let's be explicit
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bxservice', // Usually your GitHub org/user name.
  projectName: 'idempiere-rest-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/bxservice/idempiere-rest-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs-only mode:
        docsRouteBasePath: '/docs',
        // When applying `docs-only` mode, you still need to provide the `docsDir` option.
        docsDir: 'docs',
        // Whether to search the title of the page.
        indexPages: true,
        // Whether to search the content of the page.
        indexBlog: false, // We don't have a blog
        // Whether to search the docs sidebar.
        indexDocs: true,
        // language of your documentation, see next section for supported languages.
        language: ['en'],
        // Whether to display the search bar in the navigation bar.
        searchBarShortcut: true,
        // Whether to display the search bar shortcut hint.
        searchBarShortcutHint: true,
        // Whether to highlight the search results.
        highlightSearchTermsOnTargetPage: true,
        // Whether to display search suggestions.
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'iDempiere REST',
      logo: {
        alt: 'iDempiere REST',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/bxservice/idempiere-rest',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Quick Start',
              to: '/docs/quickstart',
            },
            {
              label: 'API Guides',
              to: '/docs/category/api-guides',
            },
            {
              label: 'Contribute',
              to: '/docs/contribute',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'iDempiere Forum',
              href: 'https://groups.google.com/g/idempiere',
            },
            {
              label: 'Mattermost',
              href: 'https://mattermost.idempiere.org/idempiere/channels/rest',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/bxservice/idempiere-rest',
            },
            {
              label: 'iDempiere Official',
              href: 'https://www.idempiere.org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BX Service GmbH. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Uncomment and configure when your site is live for better search
    // algolia: {
    //   // The application ID provided by Algolia
    //   appId: 'YOUR_APP_ID',
    //   // Public API key: it is safe to commit it
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'idempiere-rest-docs',
    //   // Optional: see doc section below
    //   contextualSearch: true,
    //   // Optional: path for search page that enabled by default (`false` to disable it)
    //   searchPagePath: 'search',
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;

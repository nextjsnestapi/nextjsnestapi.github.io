import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'nextjs-nestapi',
  tagline: 'NestJS-style controllers for the Next.js App Router',
  favicon: 'img/logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://nextjsnestapi.github.io',
  // User/org root page (nextjsnestapi.github.io), so the site is served at "/",
  // not under a "/<repo>/" subpath.
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'nextjsnestapi', // Usually your GitHub org/user name.
  projectName: 'nextjsnestapi.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
          routeBasePath: '/',
          editUrl: 'https://github.com/DeveloperRejaul/nextjs-nestapi/edit/main/README.md',
        },
        blog: {
          blogTitle: 'Blog',
          blogDescription: 'Release notes, deep dives, and how-tos for nextjs-nestapi.',
          showReadingTime: true,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 10,
          postsPerPage: 10,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/DeveloperRejaul/nextjs-nestapi-doc/edit/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/',
        language: ['en'],
      },
    ],
  ],

  // Static <head> tags injected on every page — structured data for rich
  // search results (Google's Sitelinks Search Box / software-app rich card).
  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'nextjs-nestapi',
        description:
          'Write Next.js App Router API routes in NestJS style — decorator-based controllers, DTO validation, middleware, and auto-generated OpenAPI/Swagger docs.',
        codeRepository: 'https://github.com/DeveloperRejaul/nextjs-nestapi',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Node.js',
        author: {
          '@type': 'Person',
          name: 'Rejaul Karim',
        },
        license: 'https://github.com/DeveloperRejaul/nextjs-nestapi/blob/main/LICENSE',
      }),
    },
  ],

  themeConfig: {
    // Default social-share image (og:image / twitter:image) for every page
    // that doesn't set its own.
    image: 'img/social-card.png',
    metadata: [
      {
        name: 'keywords',
        content:
          'nextjs, nestjs, next.js, nest.js, app router, route handlers, decorators, controller, dto validation, class-validator, middleware, openapi, swagger, rest api, typescript, cli, scaffolding',
      },
      {name: 'author', content: 'Rejaul Karim'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'nextjs-nestapi',
      logo: {
        alt: 'nextjs-nestapi logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://www.npmjs.com/package/nextjs-nestapi',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/DeveloperRejaul/nextjs-nestapi',
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
            {label: 'Introduction', to: '/intro'},
            {label: 'Quick start', to: '/quick-start'},
            {label: 'CLI', to: '/cli'},
            {label: 'API reference', to: '/api-reference'},
            {label: 'Blog', to: '/blog'},
          ],
        },
        {
          title: 'Package',
          items: [
            {label: 'npm', href: 'https://www.npmjs.com/package/nextjs-nestapi'},
            {
              label: 'Example project',
              href: 'https://github.com/DeveloperRejaul/nextjs-nestapi/tree/main/example',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'GitHub', href: 'https://github.com/DeveloperRejaul/nextjs-nestapi'},
            {
              label: 'Issues',
              href: 'https://github.com/DeveloperRejaul/nextjs-nestapi/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Rejaul Karim. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

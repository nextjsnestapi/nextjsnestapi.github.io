import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'installation',
    'quick-start',
    'cli',
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'core-concepts/controllers-and-routing',
        'core-concepts/route-parameters',
        'core-concepts/dto-validation',
        'core-concepts/auth-guard',
        'core-concepts/middleware',
        'core-concepts/application-configuration',
        'core-concepts/handler-return-values',
      ],
    },
    'openapi-swagger',
    'api-reference',
    'project-structure',
    'requirements',
    'limitations',
    'example-project',
    'contributing',
  ],
};

export default sidebars;

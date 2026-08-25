import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import {
  ArchiveIcon,
  BoltIcon,
  BookOpenIcon,
  CheckBadgeIcon,
  CompassIcon,
  FeatherIcon,
} from './icons';

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<{className?: string}>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Decorator-based routing',
    Icon: CompassIcon,
    description: (
      <>
        <code>@Controller</code>, <code>@Get</code>/<code>@Post</code>/<code>@Put</code>/
        <code>@Patch</code>/<code>@Delete</code> and Express-style <code>:param</code>{' '}
        segments — organize your API the way NestJS does, on top of Next.js's own
        request/response objects.
      </>
    ),
  },
  {
    title: 'DTO validation built in',
    Icon: CheckBadgeIcon,
    description: (
      <>
        <code>@Body(DtoClass)</code> parses and validates the request body with{' '}
        <code>class-validator</code>, and returns a structured error response
        automatically when validation fails — in API routes and in Next.js{' '}
        Server Actions alike.
      </>
    ),
  },
  {
    title: 'One catch-all route',
    Icon: ArchiveIcon,
    description: (
      <>
        A single <code>app/api/[[...route]]/route.ts</code> dispatches to every
        controller. No per-endpoint route files to create or keep in sync.
      </>
    ),
  },
  {
    title: 'OpenAPI / Swagger docs',
    Icon: BookOpenIcon,
    description: (
      <>
        <code>generateOpenApiDocument()</code> builds a spec straight from your
        decorators and DTOs; <code>createSwaggerUiHandler()</code> serves the UI from
        your own <code>node_modules</code> — no CDN, nothing vendored.
      </>
    ),
  },
  {
    title: 'CLI scaffolding',
    Icon: BoltIcon,
    description: (
      <>
        <code>nextjs-nestapi new</code>, <code>init</code>, and{' '}
        <code>generate controller</code> bootstrap a project or add a feature without
        hand-writing boilerplate.
      </>
    ),
  },
  {
    title: 'No DI container',
    Icon: FeatherIcon,
    description: (
      <>
        Controllers are plain classes you construct however you like — no modules, no
        second framework running alongside Next.js.
      </>
    ),
  },
];

function Feature({title, Icon, description}: FeatureItem) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <Icon className={styles.featureIconSvg} />
      </div>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.intro}>
          <Heading as="h2">Everything you need</Heading>
        </div>
        <div className={styles.grid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

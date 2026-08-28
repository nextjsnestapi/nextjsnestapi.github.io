import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageComparison from '@site/src/components/HomepageComparison';
import {validationComparison} from '@site/src/components/HomepageComparison/data';
import HomepageCompareTable from '@site/src/components/HomepageCompareTable';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const QUICK_START = `@Controller("/hello")
export class HelloController {
  @Get("/:id")
  getOne(context: RouteContext) {
    return { id: context.params.id };
  }

  @Post("")
  create(@Body(CreateHelloDto) dto: CreateHelloDto) {
    return { created: dto };
  }
}`;

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--lg', styles.buttonPrimary)}
            to="/intro">
            Get Started
          </Link>
          <Link
            className={clsx('button button--lg', styles.buttonSecondary)}
            to="https://github.com/DeveloperRejaul/nextjs-nestapi">
            View on GitHub
          </Link>
        </div>
        <div className={styles.codePreview}>
          <CodeBlock language="ts" title="src/features/hello/controller.ts">
            {QUICK_START}
          </CodeBlock>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Write Next.js App Router API routes in NestJS style — controllers, decorators, DTO validation, and auto-generated OpenAPI/Swagger docs.">
      <HomepageHeader />
      <main>
        <HomepageComparison data={validationComparison} />
        <HomepageCompareTable />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

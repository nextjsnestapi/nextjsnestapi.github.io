import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const COLUMNS = ['Feature', 'nextjs-nestapi', 'Route Handlers', 'NestJS', 'Express'];

interface Row {
  feature: string;
  values: [string, string, string, string];
}

const ROWS: Row[] = [
  {
    feature: 'Setup',
    values: ['npx nextjs-nestapi new', 'Manual', 'nest new (separate app)', 'Manual'],
  },
  {
    feature: 'Learning curve',
    values: ['⭐ Easy', '⭐ Easy', '⭐⭐⭐⭐ Steep', '⭐⭐ Easy'],
  },
  {
    feature: 'Boilerplate',
    values: ['Minimal', 'Grows per route', 'Moderate (modules)', 'Minimal'],
  },
  {
    feature: 'Request validation',
    values: ['Built-in — @Body(Dto)', 'Manual', 'Built-in — pipes', 'Manual'],
  },
  {
    feature: 'DI container',
    values: ['None, by design', 'N/A', 'Full', 'None'],
  },
  {
    feature: 'OpenAPI docs',
    values: ['Auto-generated', 'Manual', 'Auto-generated', 'Manual'],
  },
  {
    feature: 'Runs inside Next.js',
    values: ['Yes', 'Yes', 'No — separate server', 'Yes, via custom server'],
  },
];

export default function HomepageCompareTable(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.title}>
          How nextjs-nestapi compares
        </Heading>

        <div className={styles.tableWrapper}>
          <div className={styles.grid}>
            <div className={styles.headerRow}>
              {COLUMNS.map((col, i) => (
                <div key={col} className={i === 1 ? styles.bestCell : undefined}>
                  {col}
                </div>
              ))}
            </div>

            {ROWS.map((row) => (
              <div className={styles.row} key={row.feature}>
                <div className={styles.featureCell}>{row.feature}</div>
                {row.values.map((value, i) => (
                  <div key={i} className={i === 0 ? styles.bestCell : undefined}>
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

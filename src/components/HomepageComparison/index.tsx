import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import type {ComparisonData, ReasonIcon} from './data';
import {
  DocSyncIcon,
  LayersIcon,
  ListSearchIcon,
  ShapesIcon,
  ShieldCheckIcon,
  TerminalIcon,
} from './icons';

export type {ComparisonData};

const ICONS: Record<ReasonIcon, React.ComponentType<{className?: string}>> = {
  shield: ShieldCheckIcon,
  shapes: ShapesIcon,
  list: ListSearchIcon,
  layers: LayersIcon,
  docSync: DocSyncIcon,
  terminal: TerminalIcon,
};

interface Props {
  data: ComparisonData;
}

export default function HomepageComparison({data}: Props): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.intro}>
          <Heading as="h2">{data.title}</Heading>
          <p>{data.description}</p>
        </div>

        <div className={styles.grid}>
          {data.reasons.map((reason) => {
            const Icon = ICONS[reason.icon];
            return (
              <div key={reason.title} className={styles.card}>
                <div className={styles.cardIcon}>
                  <Icon className={styles.cardIconSvg} />
                </div>
                <Heading as="h3">{reason.title}</Heading>
                <p>{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { FaPlug, FaShieldAlt, FaCloud } from 'react-icons/fa';
import type { IconType } from 'react-icons';

type FeatureItem = {
  title: string;
  Icon: IconType;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Effortless Integration',
    Icon: FaPlug,
    description: (
      <>
        Connect iDempiere with modern apps and services —CRM, eCommerce, mobile platforms, and more— using a clean, standardized RESTful interface.
      </>
    ),
  },
  {
    title: 'Secure and Scalable',
    Icon: FaShieldAlt,
    description: (
      <>
        Built for enterprise needs, the REST API delivers reliable performance and robust security for automating critical business workflows.
      </>
    ),
  },
  {
    title: 'Your Data, Anywhere',
    Icon: FaCloud,
    description: (
      <>
        Query, manage, and interact with your iDempiere data from any device or system, wherever you are—fast and hassle-free.
      </>
    ),
  },
];

function Feature({ title, Icon, description }: FeatureItem) {
  const { colorMode } = useColorMode();
  const iconColor = colorMode === 'dark' ? '#4fa8de' : '#1074b4';

  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Icon size={40} color={iconColor} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

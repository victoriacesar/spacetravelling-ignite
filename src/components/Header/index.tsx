import Link from 'next/link';
import Image from 'next/image';

import styles from './header.module.scss';
// import logo from '../../../public/images/logo.svg';

export default function Header(): JSX.Element {
  return (
    <div className={styles.header}>
      <Link href="/">
        <a>
          <Image
            src="/src/public/images/logo.svg"
            alt="logo"
            width="auto"
            height="auto"
          />
        </a>
      </Link>
    </div>
  );
}

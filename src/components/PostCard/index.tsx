import { FiCalendar, FiUser } from 'react-icons/fi';

import styles from './postcard.module.scss';

interface PostCardProps {
  title: string;
  subtitle: string;
  datePublication: string;
  author: string;
}

export default function PostCard({
  title,
  subtitle,
  datePublication,
  author,
}: PostCardProps): JSX.Element {
  return (
    <div className={styles.postCard}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className={styles.postCard_footer}>
        <div>
          <FiCalendar color="#D7D7D7" size="20px" />
          <time>{datePublication}</time>
        </div>
        <div>
          <FiUser color="#D7D7D7" size="20px" />
          <p>{author}</p>
        </div>
      </div>
    </div>
  );
}

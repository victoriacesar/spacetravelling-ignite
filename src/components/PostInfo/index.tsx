import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from './postinfo.module.scss';

interface PostInfoProps {
  date: string;
  author: string;
  timeOfReading?: string;
}

export default function PostInfo({
  date,
  author,
  timeOfReading,
}: PostInfoProps): JSX.Element {
  const dateFormated = format(new Date(date), 'dd MMM yyyy', {
    locale: ptBR,
  });

  return (
    <div className={styles.postInfo}>
      <div>
        <FiCalendar color="#D7D7D7" size="20px" />
        <p>{dateFormated}</p>
      </div>
      <div>
        <FiUser color="#D7D7D7" size="20px" />
        <p>{author}</p>
      </div>
      <div>
        <FiClock color="#D7D7D7" size="20px" />
        <p>4 min</p>
      </div>
    </div>
  );
}

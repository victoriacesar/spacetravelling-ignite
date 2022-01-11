/* eslint-disable react/no-danger */
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';

import PostInfo from '../../components/PostInfo/index';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  uid: string;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <Head>
        <title>{post.data.title} | SpaceTravelling</title>
      </Head>

      <div className={styles.imageBox}>
        <img src={post.data.banner.url} alt="post" />
      </div>
      <div className={commonStyles.container}>
        <main className={styles.postBox}>
          <h1>{post.data.title}</h1>
          <PostInfo
            date={post.first_publication_date}
            author={post.data.author}
          />
          <div className={styles.postContent}>
            {post.data.content.map(postContent => (
              <div key={post.uid}>
                <h2>{postContent.heading}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(postContent.body),
                  }}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 3,
    }
  );

  const paths = posts.results.map(post => ({
    params: { slug: post.uid },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('posts', String(slug), {});

  console.log(response);

  const content = response.data.content.map(contentData => {
    return {
      heading: contentData.heading,
      body: [...contentData.body],
    };
  });

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: { url: response.data.image.url },
      author: response.data.author,
      content,
    },
  };

  return {
    props: { post },
  };
};

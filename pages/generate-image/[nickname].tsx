import { GetStaticPaths, GetStaticProps } from 'next';

interface StaticProps {
  nickname: string;
}

export default function Home({ nickname }: StaticProps) {
  return <div className="w-[1200px] h-[630px] bg-gray-200 p-8">{nickname}</div>;
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<StaticProps> = ({ params }) => {
  if (params) {
    const nickname = params.nickname;

    if (nickname && typeof nickname === 'string')
      return {
        props: {
          nickname,
        },
      };
  }
  return { notFound: true };
};

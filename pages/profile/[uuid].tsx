import { createUser, People } from '../index';
import { NextPageContext } from 'next';
import axios from 'axios';
import { FeedItemProps } from '../../components/Feed';
import { Layout } from '../../components/Layout';

type ProfileProps = {
  user: FeedItemProps;
};

export default function Profile({ user }: ProfileProps) {
  return (
    <Layout>
      <div>{JSON.stringify(user, null, 2)}</div>
    </Layout>
  );
}

Profile.getInitialProps = async (ctx: NextPageContext) => {
  let { uuid } = ctx.query;
  let userReq = await axios.get<People>(
    `https://randomuser.me/api/?uuid=${uuid}`
  );

  let user = createUser(userReq.data.results[0]);

  return { user };
};

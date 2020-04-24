import React from 'react';

import Header from './common/Header';
import Footer from './common/Footer';

import BaseRouter from './BaseRouter';

interface HomeProps {
  user: object | null;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => (
  <>
    <Header user={props.user} />
    <BaseRouter user={props.user} />
    <Footer user={props.user} />
  </>
);

export default Home;

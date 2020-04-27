import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStyles from '../../styles/useStyles';

const Home: React.FC = (props) => {
  const classes = useStyles();
  return (
    <Container component="main" className={classes.main} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Under construction!
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        {'Hamro Auth is under construction and will be available soon'}
      </Typography>
    </Container>
  );
};

export default Home;

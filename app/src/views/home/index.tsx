import React from 'react';

import clsx from 'clsx';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

const Home: React.FC = (props: any) => {
  const { className, ...rest } = props;
  const useStyles = makeStyles((theme: any) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      paddingTop: 200,
      minHeight: '100vh',
      paddingBottom: 200,
      [theme.breakpoints.down('md')]: {
        paddingTop: 60,
        paddingBottom: 60,
      },
    },
    image: {
      perspectiveOrigin: 'left center',
      transformStyle: 'preserve-3d',
      perspective: 1500,
      '& > img': {
        maxWidth: '90%',
        height: 'auto',
        transform: 'rotateY(-35deg) rotateX(15deg)',
        backfaceVisibility: 'hidden',
        boxShadow: theme.shadows[16],
      },
    },
    shape: {
      position: 'absolute',
      top: 0,
      left: 0,
      '& > img': {
        maxWidth: '90%',
        height: 'auto',
      },
    },
  }));
  const classes: any = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="overline" color="secondary">
                generics presents
              </Typography>
              <Typography variant="h1" color="textPrimary">
                Hamro Auth - A generic authentication module
              </Typography>
              <Box mt={3}>
                <Typography variant="body1" color="textSecondary">
                  A professional kit that comes with ready-to-use Material-UI©
                  components developed with one common goal in mind, help you
                  build faster &amp; beautiful applications. Each component is
                  fully customizable, responsive and easy to integrate.
                </Typography>
              </Box>
              <Box mt={3}>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      100+
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Apps Using
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      JWT
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Authentication
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      10k+
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Users
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box position="relative">
              <div className={classes.shape}>
                <img alt="Shapes" src="/static/home/shapes.svg" />
              </div>
              <div className={classes.image}>
                <img alt="Presentation" src="/static/home/dark-light.png" />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;

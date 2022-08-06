import React,{useState, useEffect} from 'react'
import {useDispatch } from 'react-redux';
import {Container, Grow, Grid, Paper} from '@material-ui/core';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Pagination';
import useStyles from '../../styles'

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  },[currentId ,dispatch]);

  return (
    <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify='space-between' alignItems='strech' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6} >
                <Paginate />
              </Paper>
            </Grid>
          </Grid>
        </Container>
    </Grow>
  )
}

export default Home
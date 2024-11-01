import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { Grid ,Container,} from 'semantic-ui-react';

import Post from './Post'
import MyMenu from '../components/MyMenu';
import MyPosts from './MyPosts';
import MyCollections from './MyCollections';
import MySettings from './MySettings';

function MyNavigate({ user }) {
    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}><MyMenu /></Grid.Column>
                    <Grid.Column width={10}>
                        <Routes>
                            <Route path="posts" element={<MyPosts />} exact/>
                            <Route path="collections" element={<MyCollections />} exact/>
                            <Route path="/posts/:postId" element={<Post/>} exact/>
                            <Route path="/collections/:postId" element={<Post/>} exact/>
                            <Route path="settings" element={<MySettings user={user}/>} exact/>
                        </Routes>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
            </Grid>
        </Container> 
    );
}

export default MyNavigate;
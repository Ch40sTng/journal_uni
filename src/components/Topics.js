import React from 'react';
import { List } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

import 'firebase/compat/firestore';
import firebase from "../utils/firebase";

function Topics() {
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopic = urlSearchParams.get('topic');
    
    const [topics, setTopics] = React.useState([]);

    React.useEffect(() => {
        firebase
            .firestore()
            .collection("topics")
            .get()
            .then((collectionSnapShot) => {
                const data = collectionSnapShot.docs.map(doc => {
                    return doc.data();
                });
                setTopics(data);
            });
    }, []);

    return (
        <List animated selection>
            {topics.map(topic => {
                return ( 
                    <List.Item 
                        key={topic.name}
                        as={Link}
                        to={`/posts?topic=${topic.name}`}
                        active={currentTopic === topic.name}
                    >
                        {topic.name}
                    </List.Item>
                );
            })}
        </List>
    );
}

export default Topics;
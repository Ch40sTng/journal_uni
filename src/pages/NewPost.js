﻿import React from "react";
import { Container, Header, Form, Image, Button, Label} from "semantic-ui-react";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import firebase from "../utils/firebase";
import { useNavigate } from 'react-router-dom';

function NewPost() {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [topics, setTopics] = React.useState([]);
    const [topicName, setTopicName] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

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

    const options = topics.map(topic => {
        return {
            text: topic.name,
            value: topic.name,
        };
    });

    const previewURL = file ? URL.createObjectURL(file) : "https://react.semantic-ui.com/images/wireframe/image.png";

    function OnSubmit() {
        setIsLoading(true);
        const documentRef = firebase.firestore().collection("posts").doc();
        const fileRef = firebase.storage().ref('post-image/' + documentRef.id);
        const metadata = {
            contentType: file.type
        };
        fileRef.put(file, metadata).then(() => {
            fileRef.getDownloadURL().then((imageURL) => {
                documentRef.set({
                    title,
                    content,
                    topic: topicName,
                    createdAt: firebase.firestore.Timestamp.now(),
                    author: {
                        displayName: firebase.auth().currentUser.displayName || "",
                        photoURL: firebase.auth().currentUser.photoURL || '',
                        uid: firebase.auth().currentUser.uid,
                        email: firebase.auth().currentUser.email,
                    },
                    imageURL,
                }).then(() => {
                    setIsLoading(false);
                    navigate('/');
                })
            })
        });
    }

    return (
        <Container>
            <Header>發表文章</Header>
            <Form onSubmit={OnSubmit}>
                <Image 
                    src={previewURL}
                    size="small"
                    floated="left"
                />
                <Button basic as="label" htmlFor="post-image">
                    上傳文章圖片
                </Button>
                <Form.Input 
                    type="file"
                    id="post-image"
                    style = {{ display : 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Form.Input 
                    placeholder = "輸入文章標題"
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Form.TextArea
                    placeholder = "輸入文章內容"
                    value = {content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Form.Dropdown
                    placeholder = "選擇文章主題"
                    options={options}
                    selection
                    value={topicName}
                    onChange={(e, { value }) => setTopicName(value)}
                />
                <Form.Button loading={isLoading}>送出</Form.Button>
            </Form>
        </Container>
    );
}

export default NewPost;
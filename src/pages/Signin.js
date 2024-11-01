import React from "react";
import { Menu, Form, Container, Message } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import 'firebase/auth';
import firebase from "../utils/firebase";

function Signin() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = React.useState('register');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    function onSubmit() {
        setIsLoading(true);

        if (activeItem === 'register') {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    navigate('/posts');
                    setIsLoading(false);
                })
                .catch((error) => {
                    switch(error.code) {
                        case "auth/email-already-in-use":
                            setErrorMessage('信箱已存在');
                            break;

                        case "auth/invalid-email":
                            setErrorMessage('信箱格式不正確');
                            break;

                        case "auth/weak-password":
                            setErrorMessage('密碼強度不足');
                            break;

                        default:
                    }
                    setIsLoading(false);
                });
        }
        else if (activeItem === 'signin') {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    navigate('/posts');
                })
                .catch((error) => {
                    switch(error.code) {
                        case "auth/invalid-email":
                            setErrorMessage('信箱格式不正確');
                            break;
                        
                        case "auth/invalid-credential":
                            setErrorMessage('信箱密碼錯誤');
                            break;
                        
                        default:
                    }
                });
        }
    }

    return (
        <Container>
            <Menu widths="2">
                <Menu.Item 
                    active={activeItem === 'register'}
                    onClick={() => {
                        setErrorMessage('');
                        setActiveItem('register');
                    }}
                >
                    Register
                </Menu.Item>
                <Menu.Item
                    active={activeItem === 'signin'}
                    onClick={() => {
                        setErrorMessage('');
                        setActiveItem("signin");
                    }}
                >
                    Sign In
                </Menu.Item>
            </Menu>
            <Form onSubmit={onSubmit}>
                <Form.Input
                    label="Account"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email account"
                />
                <Form.Input
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please enter your password"
                    type="password"
                />
                {errorMessage && <Message negative>{errorMessage}</Message> }
                <Form.Button loading={isLoading}>
                    {activeItem === 'register' && 'Register'}
                    {activeItem === 'signin' && 'Sign In'}
                </Form.Button>
            </Form>
        </Container>
    );
}

export default Signin;
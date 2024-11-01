import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";

import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

function Header({ user }) {
    return( 
        <Menu>
            <Menu.Item as={Link} to="/posts">Journal Universe</Menu.Item>
            <Menu.Item>
                <Search />
            </Menu.Item>
            <Menu.Menu position="right">
                {user ? (
                <>
                    <Menu.Item as={Link} to="/new-post">
                        發表文章
                    </Menu.Item>
                    <Menu.Item as={Link} to="/my">
                        會員
                    </Menu.Item>
                    <Menu.Item onClick={() => firebase.auth().signOut()}>
                        Sign Out
                    </Menu.Item>
                </>
                ) : (
                    <Menu.Item as={Link} to="/signin">
                        Register/Sign In
                    </Menu.Item>
                )}
            </Menu.Menu>
        </Menu>
    );
}

export default Header;
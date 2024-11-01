import React from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import firebase from "./utils/firebase";

import Header from "./Header";
import Signin from "./pages/Signin";
import PostNavigate from "./pages/PostNevigate";
import NewPost from "./pages/NewPost";
import MyNavigate from "./pages/MyNevigate";

function App() {
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUser(currentUser)
        })
    }, [])
    return(
        <BrowserRouter>
            <Header user={user}/>
            <Routes>
                <Route path="/posts/*" element={<PostNavigate user={user}/>}/>
                <Route path="/my/*" element={user ? (<MyNavigate user={user}/>) : (<Navigate to="/posts"/>)} />
                <Route path='/signin' element={user ? (<Navigate to="/posts"/>) : (<Signin />)} ></Route>
                <Route path='/new-post' element={user ? (<NewPost />) : (<Navigate to="/posts"/>)} ></Route>
            </Routes>
        </BrowserRouter> 
    );
}

export default App;
import React from 'react'
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Header from "./Navbar/Header";
import TaskList from "./Tasks/TaskList";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
export default function Index(props) {
    const { isLoggedIn, setLoggedIn } = props
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <BrowserRouter>
                {isLoggedIn ?
                    <Routes>
                        <Route path="/" element={<TaskList setLoggedIn={setLoggedIn} />}>
                        </Route>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<SignIn setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />}>
                        </Route>
                        <Route path="/signup" element={<SignUp setIsLoggedIn={setLoggedIn} />}>
                        </Route>
                    </Routes>
                }
            </BrowserRouter>
        </div>

    )
}
// import { createBrowserRouter } from "react-router-dom";
// import Layout from "./components/AppLayot";
// import Signup from "./components/signup";

// export const Router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Layout></Layout>,
//         children:[
//             { path: 'signup', element: <Signup /> }

//         ]
//     }])

import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout"; // תיקון שם הקובץ
import Signup from "./components/signup";
import Login from "./components/login";
import UserAlbums from "./components/UserAlbums";
import { UserContext, UserProvider, useUser } from "./context/userContext";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <UserProvider><Layout /></UserProvider>,
        children: [
            { path: 'signup', element: <Signup /> },
            { path: 'login', element: <Login /> },
            { path: 'userAlbums', element: <UserAlbums></UserAlbums> }
        ]

    }
]);
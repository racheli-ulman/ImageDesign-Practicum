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
// import Signup from "./components/signup"
import UserAlbums from "./components/UserAlbums";
// import { UserContext, UserProvider, useUser } from "./context/userContext";
import PhotoUploader from "./components/FileUploader";
// import { Home, Login } from "@mui/icons-material";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Gggg from "./components/HomePage/Home";
import DeleteAlbum from "./components/DeleteAlbum";
import FileUploader from "./components/FileUploader";
import Register from "./components/Register";
import GetPhotos from "./components/GetPhotos";
import UserPhotos from "./components/Collage/UserPhotos";
import UserPhotosDialog from "./components/Collage/UserPhotos";
import PhotoGallery from "./components/PhotosGallery";
// import CreateCollage from "./components/Collage/CreateCollage";
// import AddPhoto1 from "./components/AddPhoto";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: 'home', element: <Gggg></Gggg> },
            { index: true, element: <Gggg></Gggg> },
            // { path: 'signup', element: <Signup /> },
            { path: 'login', element: <Login /> },
            { path: 'userAlbums', element: <UserAlbums /> },
            { path: 'upload', element: <PhotoUploader /> },
            { path: "delete-album/:albumId", element: <DeleteAlbum /> },
            { path: "add-photo", element: <FileUploader/> },
            {path:"register",element:<Register/>},
            {path:"get-photos/:albumId",element:<PhotoGallery/>},
            {path:"all-photoes-of-user",element:<UserPhotosDialog open={true} onClose={() => {}} />},
            // {path:"create-collage",element:<CreateCollage/>}
            // {path:'about',element:<AboutUs/>}
        ]

    }
]);
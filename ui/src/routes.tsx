import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='sign-up' Component={SignUp} />
                <Route path='sign-in' Component={SignIn} />
            </Routes>
        </BrowserRouter>
    )
}
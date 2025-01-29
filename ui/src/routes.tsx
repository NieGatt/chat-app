import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='sign-up' Component={SignUp} />
            </Routes>
        </BrowserRouter>
    )
}
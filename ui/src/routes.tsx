import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { EmailSending } from './pages/EmailSending';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='sign-up' Component={SignUp} />
                <Route path='sign-in' Component={SignIn} />
                <Route path='verification/:template' Component={EmailSending} />
            </Routes>
        </BrowserRouter>
    )
}
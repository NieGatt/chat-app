import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { EmailSending } from './pages/EmailSending';
import { Validate } from './pages/Validate';
import { ResetPassword } from './pages/ResetPassword';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='sign-up' Component={SignUp} />
                <Route path='sign-in' Component={SignIn} />
                <Route path='verification/:template' Component={EmailSending} />
                <Route path='validate/:token' Component={Validate} />
                <Route path='reset-password/:token' Component={ResetPassword} />
            </Routes>
        </BrowserRouter>
    )
}
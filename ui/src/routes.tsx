import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { EmailSending } from './pages/EmailSending';
import { Validate } from './pages/Validate';
import { ResetPassword } from './pages/ResetPassword';
import { AuthorizationComponent } from './components/AuthorizationComponent';
import { Home } from './pages/Home';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='sign-up' element={<SignUp />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='verification/:template' element={<EmailSending />} />
                <Route path='validate/:token' element={<Validate />} />
                <Route path='reset-password/:token' element={<ResetPassword />} />
                <Route path='/' element={<AuthorizationComponent element={<Home />} />} />
            </Routes>
        </BrowserRouter>
    )
}
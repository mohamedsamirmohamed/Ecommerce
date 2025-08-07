import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Login() {

 const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    function getUserData(event) {
        let myUser = { ...user };
        myUser[event.target.name] = event.target.value;
        setUser(myUser);
    }

    async function sendLoginDataToApi() {
        try {
            const loginData  = {
                email: user.email,
                password: user.password
            };

            let { data } = await axios.post('https://e-commerce-api-kmhw.vercel.app/api/login', loginData );

           

if (data.user?.token) {
  localStorage.setItem('userToken', data.user.token);
  window.location.reload(); // يعيد تحميل الصفحة عشان App.jsx يقرأ التوكن
} else {
  setIsLoading(false);
  setError(data.msg || 'Login failed');
}
        } catch (error) { 
            setIsLoading(false);
            console.error('Login error:', error);
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError('Login failed. Please try again.');
            }
        }
    }

    function submitLoginForm(e) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!user.email || !user.password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        sendLoginDataToApi();
    }


  return<>
  
  


<section
    className="min-vh-100 d-flex align-items-center justify-content-center"
    style={{ backgroundColor: '#eee', padding: '80px 0 20px 0' }}
>
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
                <div className="card text-black shadow-lg" style={{ borderRadius: '25px' }}>
                    <div className="card-body p-3 p-md-5">
                        <div className="row justify-content-center align-items-center">
                            
                            {/* نموذج تسجيل الدخول */}
                            <div className="col-12 col-md-6 col-lg-5 order-2 order-md-1">
                                <p className="text-center h2 fw-bold mb-4 mx-1 mx-md-4">Login</p>

                                <form className="mx-1 mx-md-4" onSubmit={submitLoginForm}>
                                    
                                    {/* رسالة الخطأ */}
                                    {error.length > 0 && (
                                        <div className="alert alert-danger mb-3">{error}</div>
                                    )}

                                    <div className="d-flex flex-row align-items-center mb-3">
                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                onChange={getUserData}
                                                value={user.email}
                                                placeholder="Your Email"
                                                required
                                            />
                                            <label className="form-label" htmlFor="email">Your Email</label>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                className="form-control"
                                                onChange={getUserData}
                                                value={user.password}
                                                placeholder="Password"
                                                required
                                            />
                                            <label className="form-label" htmlFor="password">Password</label>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center mx-4 mb-3">
                                        <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isLoading}>
                                            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <p className="mb-0">Don't have an account? <a href="/" className="text-primary">Sign up</a></p>
                                    </div>

                                </form>
                            </div>

                            {/* الصورة */}
                            <div className="col-12 col-md-6 col-lg-7 d-flex align-items-center justify-content-center order-1 order-md-2 mb-4 mb-md-0">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                    className="img-fluid"
                                    alt="Sample"
                                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


  </>
}

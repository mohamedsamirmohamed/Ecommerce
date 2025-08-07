import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Regaster() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    role: '',
  });

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
  }

  async function sendRegisterDataToApi() {
    try {
      setIsLoading(true);
      setError(''); // مسح الأخطاء السابقة

      let { data } = await axios.post(`https://e-commerce-api-kmhw.vercel.app/api/register`, user);

      // التحقق من وجود الـ token في الـ response
      if (data.token) {
        // حفظ الـ token في localStorage
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('user', JSON.stringify(data));

        // إعادة توجيه المستخدم للصفحة الرئيسية
        navigate('/login'); // أو أي صفحة تريد الذهاب إليها

        console.log('Registration successful:', data);
      } else {
        // في حالة عدم وجود token (مثل User already exists)
        setError(data.message || 'Registration failed');
      }

    } catch (error) {
      // التعامل مع الأخطاء
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError('Network error. Please try again.');
      }
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function submitRegisterForm(e) {
    e.preventDefault();
    // التحقق من أن جميع الحقول مُعبأة
    if (!user.username || !user.email || !user.password || !user.name || !user.role) {
      setError('Please fill all fields');
      return;
    }

    sendRegisterDataToApi();
  }
  return <>

    <section
  className="min-vh-100 d-flex align-items-center justify-content-center"
  style={{
    backgroundColor: '#eee',
    padding: '80px 0 20px 0',
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
  }}
>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10 col-xl-8">
        <div className="card text-black shadow-lg" style={{ borderRadius: '25px' }}>
          <div className="card-body p-3 p-md-5">
            <div className="row justify-content-center align-items-center">

              {/* نموذج التسجيل */}
              <div className="col-12 col-md-6 col-lg-5 order-2 order-md-1">
                <p className="text-center h2 fw-bold mb-4 mx-1 mx-md-4">Sign up</p>
                {error.length > 0 ? (
                  <div className="alert alert-danger my-2">{error}</div>
                ) : ''}

                <form className="mx-1 mx-md-4" onSubmit={submitRegisterForm}>
                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        onChange={getUserData}
                        placeholder="Username"
                      />
                      <label className="form-label" htmlFor="username">Username</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        onChange={getUserData}
                        placeholder="Your Email"
                      />
                      <label className="form-label" htmlFor="email">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        onChange={getUserData}
                        placeholder="Password"
                      />
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="fas fa-id-badge fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={getUserData}
                        placeholder="Name"
                      />
                      <label className="form-label" htmlFor="name">Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="fas fa-user-tag fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <select
                        id="role"
                        name="role"
                        className="form-control form-select"
                        onChange={getUserData}
                      >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <label className="form-label" htmlFor="role">Role</label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      disabled={isLoading}
                    >
                      {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Register'}
                    </button>
                  </div>
                </form>
              </div>

              {/* الصورة */}
              <div className="col-12 col-md-6 col-lg-7 d-flex align-items-center justify-content-center order-1 order-md-2 mb-4 mb-md-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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

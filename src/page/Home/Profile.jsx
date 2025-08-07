import React from 'react'

export default function Profile({ userDate }) {

   

  

  if (!userDate) {
    return <p className="text-center">Loading profile...</p>;
  }

  return (
 <div
      className="container"
      style={{
        minHeight: '100vh',
        paddingTop: '200px', // 👈 نزلنا البوكس 120 بكسل
        paddingBottom: '50px',
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">My Profile</h2>

            <form>
           

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={userDate.email}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={userDate.role}
                  disabled
                />
              </div>

       
            </form>

          </div>
        </div>
      </div>
    </div>
  );

  

  
  
}

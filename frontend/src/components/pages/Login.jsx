// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Contextapi } from "../../contextapi/ContextApi";
// import API from "../../services/api";

// function Login() {
//     const [form, setForm] = useState({ email: "", password: "" });
//     const { loginName, setLoginName, setRole } = useContext(Contextapi)
//     const navigate = useNavigate()

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const res = await API.post("/auth/login", form);
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("userId", res.data.user.id);
//         alert("Login successful");
//         navigate('/feed')
//     };
//     return (
//         <section id="login">
//             <div className="container">
//                 <div className="row" id="loginrow">
//                     <div className="col-md-4"></div>
//                     <div className="col-md-4">
//                         <h2>Login Here....</h2>
//                         <form onSubmit={handleSubmit}>
//                             <label>Email/Username</label>
//                             <input className="form-control" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
//                             <label>Password</label>
//                             <input className="form-control" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
//                             <button type="submit" className="form-control btn btn-success mt-2">Login</button>
//                         </form>
//                         <hr />
//                         <p><Link to="/signup"><button className="form-control btn btn-dark mt-2">Create Account</button></Link></p>
//                     </div>
//                     <div className="col-md-4"></div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Login;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "../../contextapi/ContextApi";
import API from "../../services/api";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const { loginName, setLoginName, setRole } = useContext(Contextapi);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.post("/auth/login", form);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        alert("Login successful");
        navigate("/feed");
    };

    return (
        <section className="login-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                        <div className="card login-card">
                            <div className="card-body">
                                <h4 className="text-center mb-3">Login</h4>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter email"
                                            onChange={(e) =>
                                                setForm({ ...form, email: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter password"
                                            onChange={(e) =>
                                                setForm({ ...form, password: e.target.value })
                                            }
                                        />
                                    </div>

                                    <button className="btn btn-primary w-100">
                                        Login
                                    </button>
                                </form>

                                <hr />

                                <Link to="/signup" className="btn btn-outline-dark w-100">
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
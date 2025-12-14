import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../../services/api";



function Signup() {

    const [form, setForm] = useState({

        firstName: "",

        lastName: "",

        email: "",

        password: "",

    });



    const navigate = useNavigate();



    const handleSubmit = async (e) => {

        e.preventDefault();

        await API.post("/auth/signup", form);

        alert("Signup successful");

        navigate("/login");

    };



    return (

        <section className="login-section">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-sm-10 col-md-6 col-lg-4">

                        <div className="card login-card">

                            <div className="card-body">

                                <h4 className="text-center mb-3">Create Account</h4>



                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label">First Name</label>

                                        <input

                                            className="form-control"

                                            placeholder="First Name"

                                            value={form.firstName}

                                            onChange={(e) =>

                                                setForm({ ...form, firstName: e.target.value })

                                            }

                                        />

                                    </div>



                                    <div className="mb-3">

                                        <label className="form-label">Last Name</label>

                                        <input

                                            className="form-control"

                                            placeholder="Last Name"

                                            value={form.lastName}

                                            onChange={(e) =>

                                                setForm({ ...form, lastName: e.target.value })

                                            }

                                        />

                                    </div>



                                    <div className="mb-3">

                                        <label className="form-label">Email</label>

                                        <input

                                            className="form-control"

                                            placeholder="Email"

                                            value={form.email}

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

                                            placeholder="Password"

                                            value={form.password}

                                            onChange={(e) =>

                                                setForm({ ...form, password: e.target.value })

                                            }

                                        />

                                    </div>



                                    <button className="btn btn-primary w-100">

                                        Sign Up

                                    </button>

                                </form>



                                <hr />



                                <Link to="/login" className="btn btn-outline-dark w-100">

                                    Already have an account

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}



export default Signup;
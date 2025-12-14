import { Link } from "react-router-dom";


function Dashboard() {
    return ( 
        <>
        
        <section id="mid">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">Dashboard</div>
                    
                    <Link to="/create"><button className="form-control btn btn-dark mt-2">Create Post</button></Link>
                </div>
            </div>
        </section>
        </>
     );
}

export default Dashboard;
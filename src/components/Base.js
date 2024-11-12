import NavBar from "./NavBar";

const Base =({ title="Welcome to our website", children})=>{
    return (
        <div className="container-fluid">
            <NavBar />
            {children}
        </div>
    );
}

export default Base;
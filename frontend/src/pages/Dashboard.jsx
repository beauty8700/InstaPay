function Dashboard(){
    return(
    <div style={{backgroundColor:"#E195AB",height:"100vh",width:"100vw",display:"flex",justifyContent:"center"}} >
        <div style={{backgroundColor:"rgba(245, 245, 245, 0.8)",height:"600px",width:"400px",marginTop:"50px",padding:"50px"}}>
            <center><div className="font-serif text-4xl font-extrabold">SING IN</div></center>
<center><div className="mx-9 text-lg font-light">   Enter your information to create account </div></center>
<div className="mt-5">
    <div>First name</div>
    <input type="text" className="border-2 border-gray-300 rounded-md p-1 "/>
     <div>last name</div>
    <input type="text" className="border-2 border-gray-300 rounded-md p-1 "/>
     <div>Username</div>
    <input type="text" className="border-2 border-gray-300 rounded-md p-1 "/>
     <div>password</div>
    <input type="password" className="border-2 border-gray-300 rounded-md p-1 "/>
    <button type="submit">submit</button>
    <div className="mt-5">Already have an account? <a href="/login" className="text-blue-500">Log in</a></div>

</div>





        </div>


    </div>
)}
export default Dashboard;
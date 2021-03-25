import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';
import './login.css';



const NewMessage = () => {

    const history = useHistory()

    const [User,setuser]=useState("")
    const [Pass,setpass]=useState("")
    const[show,setShow]=useState(true)
    const [buttonHidden, setButtonHidden] = useState(true);

    useEffect(() => {
        if(User.length > 0 && Pass.length > 0 ){
          setButtonHidden(false)
        }else{
          setButtonHidden(true)
        }
      }, [User,Pass])
    

    const handleSubmit =  () => {
        fetch('https://students-portal-react.herokuapp.com/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: User,
            pass: Pass,
          })
        })
        .then((res) =>  res.json())
        .then((res) =>  {if(res.messags==="worng user/password or invalid user"){
          setShow(false)
        }else{
          history.push(
             '/delete',
            {user:User}
          )

        }
        
      });
    }
      
    return (
        <div className="App">
    
     <div className="bg1">
       <h1 className="">
         Students Assignments portal
       </h1>
       <div className="div1">
       
         <br></br>
          <div className="form-group">
            <label>user-id: </label>
            <input type="" className="bg1" placeholder="User-id" onChange={(e) => setuser(e.target.value)}></input>
          </div>
          <br></br>
          <div className="form-group">
            <label >Password:</label>
            <input type="password" className="" placeholder="Password" onChange={(e) => setpass(e.target.value)}></input>
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary" disabled={buttonHidden} onClick={handleSubmit}>login</button> 
          {show===true ?(<h2> Please Provide correct user-id/password</h2>):(<h2> In correct pasword/user</h2>)}
       </div>

     </div>
     
     
    </div>
  );

}
export default  NewMessage;
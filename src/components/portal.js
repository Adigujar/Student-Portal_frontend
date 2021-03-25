import React, {  useEffect,useState } from 'react';
import {useHistory,useLocation} from 'react-router-dom'
import './protal.css';

const DeleteMessage = () => {

    const history = useHistory();

    const [Data, setData] = useState([]);
    const [Assign, setAssign] = useState('');
    const [Link, setLink] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);
    const location = useLocation();
    const myparam = location.state.user;

    useEffect(() => {
        if(Assign.length > 0 && Link.length > 0){
            setBtnDisable(false);
        }else{
            setBtnDisable(true)
        }
    }, [Assign, Link])

    function getAssign() {
        fetch(` https://students-portal-react.herokuapp.com/user`,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  user:myparam
              }),
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data);
          });
        }
    useEffect(() => {
        getAssign();
      }, []);
    const submitAssign = () => {
        console.log(Data.length)
        let ID =Data.length  + 1
        fetch(`https://students-portal-react.herokuapp.com/send`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              user:myparam,
              id:ID,
              Assignment_name: Assign,
              gitlink: Link
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            
          });
          history.go(0)
      };


    

    return(
        <div className="">
          <div className="</div>">
            <div className="bg2">
                <h1 className="mb-5 d-inline-block ">Students Assignments Submisson</h1>
                <button className="btn btn-primary aline mb-5 " onClick={() => {
                    history.push('/')
                }}>logout</button>
            </div>
            <div className="bg3">
                <h2> Welcome User:-{myparam}</h2>
            </div>
            
            <div className=" row pad2">
                <div className="col-lg-1 col-xl-5 col-sm-6 col-md-6 col-xs-12">
                <p>Assignments Name :-</p>
                <input type="text" className="text-box" placeholder="Enter Assignment name" value={Assign} onChange={(event) => setAssign(event.target.value)} />
                </div>
                
                <div className="col-lg-4 col-xl-5 col-sm-6 col-md-6 col-xs-12">
                <p>Assignments Link :-</p>
                <input type="text" className="text-box" placeholder="Enter Git link" value={Link} onChange={(event) => setLink(event.target.value)} />
                </div>
                 <br />
                
            </div>
            <br></br>
            <div className="col-lg-2 col-xl-2 col-sm-6 col-md-6 col-xs-12 pad2 ">
                <button type="button" className="ml-auto btn btn-danger" disabled={btnDisable} onClick={submitAssign}>Submit</button>
            </div>
            <br></br>
            <div><h1 className='text-center bg5'> Submited Assignments List</h1></div>
            <table className="table table-responsive ">
            <thead>
            <tr className="bg-light  text-black">
                <th >ID</th>
                <th >Assignment Name</th>
                <th >Git Link</th>
            </tr>
            </thead>
            {Data.map((ele, index) => {
            return (
              <tr key={index} className="bg4">
                <td>{ele.id}</td>
                <td>
                  {ele.Assignment_name}
                </td>
                <td>
                  {ele.gitlink}
                </td>
                </tr>)})}
            </table>
      
            </div>
        </div>
    )
}

export default DeleteMessage;
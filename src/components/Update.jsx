import React, {useState,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import stateCity from './stateCity.json';

const Update = () => {  
    const[city,setCity]=useState([]);
    const handleState=(name)=>{
        const n=stateCity.States.filter(x=>x.sname===name);
        const dt=stateCity.Cities.filter(x=>x.sid===n[0].id);
        setCity(dt);
    }
    const history = useNavigate();
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        gender:"",
        age:"",
        weight:"",
        bloodgroup:"",
        phno:"",
        state:"",
        city:""
    })
    
    const setData= (name,value)=>{
        //const {name,value}=e.target;
        setUser((preval)=>{
            return{
                ...preval,[name]:value
            }
        })
    }

    const {id} = useParams("");
    console.log(id);

    const getData = async()=>{
        const res = await fetch(`https://be-positive123.herokuapp.com/getuser/${id}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if(res.status===422 || !data){
            console.log("error ");
        }
        else{
            setUser(data)
            console.log("get data");
        }
    }
    
    useEffect(()=>{
        getData();
    },[]);

    function handleValidation(){
        var formIsValid=true;
        var age=parseInt(user.age);
        var weight=parseInt(user.weight);
        var phno=user.phno;
        var email=user.email;
        if(age<=18 || age>=60){
            formIsValid=false;
            user.error="Age must be between 18 to 60.Please check the eligibility to donate blood.";

        }
        else if(weight<60){
            formIsValid=false;
            user.error="Weight must be above 60.Please check the eligibility to donate blood."
        }
        else if(phno.length<10 || phno.length>10){
            formIsValid=false;
            user.error="Phone number must have length 10."
        }
        else if(!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){           //   \w for alphabets,\d for numbers
            formIsValid=false;
            user.error="Email is not valid."
        }
        return formIsValid;
    }

    const updateUser= async(e)=>{
        e.preventDefault();
        if(!handleValidation()){
            console.log(user.error);
            alert(user.error);
        }
        else{
            const {name,email,password,gender,age,weight,bloodgroup,phno,state,city} = user;
            const res2 = await fetch(`https://be-positive123.herokuapp.com/updateuser/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    name,email,password,gender,age,weight,bloodgroup,phno,state,city
                })
            });

            const data2 = await res2.json();
            console.log(data2);
            
            if(res2.status===422 || !data2){
                alert("Fill the data")
            }else{
                alert("Data updated successfully");
                history('/list')
            }
        }
    }

    return (
        <div class="example container">
        <div class="content">
            <form>
                <div class="user-details">
                    <h4 class="heading">Personal Details</h4>
                    <div class="input-box2">
                        <span class="details">Name</span>
                        <input type="text" value={user.name} name="name" id="name" onChange={(e)=>{setData('name',e.target.value)}} placeholder="Enter your name"/>
                    </div>
                    <div class="input-box">
                        <span class="details">Email</span>
                        <input type="text" value={user.email} name="email" id="email" onChange={(e)=>{setData('email',e.target.value)}} placeholder="Enter your email"/>
                    </div>
                    <div class="input-box">
                        <span class="details">Password</span>
                        <input type="password" value={user.password} name="password" id="password" onChange={(e)=>{setData('password',e.target.value)}} placeholder="Enter your password"/>
                    </div>
                    
                    <div class="input-box2">
                        <input type="radio" name="gender" id="dot-1" value="Male" checked={user.gender==="Male"} onChange={(e)=>{setData('gender',e.target.value)}}/>
                        <input type="radio" name="gender" id="dot-2" value="Female" checked={user.gender==="Female"} onChange={(e)=>{setData('gender',e.target.value)}}/>
                        <input type="radio" name="gender" id="dot-3" value="Other" checked={user.gender==="Other"} onChange={(e)=>{setData('gender',e.target.value)}}/>
                        <span class="gender-title">Gender</span>
                        <div class="category">
                            <label for="dot-1">
                                <span class="dot one"></span>
                                <span class="gender"> Male</span>
                            </label>
                            <label for="dot-2">
                                <span class="dot two"></span>
                                <span class="gender"> Female</span>
                            </label>
                            <label for="dot-3">
                                <span class="dot three"></span>
                                <span class="gender"> Other</span>
                            </label>
                        </div>
                    </div>
                    <div class="input-box">
                        <span class="details">Age</span>
                        <input type="number" value={user.age} name="age" id="age" onChange={(e)=>{setData('age',e.target.value)}} placeholder="Enter your age"/>
                    </div>
                    <div class="input-box">
                        <span class="details">Weight</span>
                        <input type="number" value={user.weight} name="weight" id="weight" onChange={(e)=>{setData('weight',e.target.value)}} placeholder="Enter your weight"/>
                    </div>
                    <div class="input-box2">
                        <span class="details">Blood Group</span>
                        <select class="bgrps" value={user.bloodgroup} onChange={(e)=>{
                                setData('bloodgroup' , e.target.value)
                            }}>
                             <option value="">---</option>
                             <option value="A+ve">A+ve</option>
                             <option value="B+ve">B+Ve</option>
                             <option value="O+ve">O+ve</option>
                             <option value="AB+ve">AB+ve</option>
                             <option value="A-ve">A-ve</option>
                             <option value="B-ve">B-ve</option>
                             <option value="O-ve">O-ve</option>
                             <option value="AB-ve">AB-ve</option>
                        </select>
                    </div>
                <h4 class="heading">Contact Details</h4>
                <div class="input-box2">
                    <span class="details">Phone Number</span>
                    <input type="number" value={user.phno} name="phno" id="phno" onChange={(e)=>{setData('phno',e.target.value)}} placeholder="Enter your phone number"/>
                </div>
                <div class="input-box">
                    <span class="details">State</span>
                    <select value={user.state} onChange={(e)=>{handleState(e.target.value);setData('state',e.target.value)}}>
                        <option value="">---</option>
                        {
                            stateCity.States.map((result)=>(<option text={result.sname} id={result.id} value={result.sname}>{result.sname}</option>))
                        }
                    </select>
                </div>
                <div class="input-box">
                    <span class="details">City</span>
                    <select value={user.city} onChange={(e)=>{setData('city',e.target.value)}}>
                        <option value="">---</option>
                        {
                        city.map((ctr,index) =>{
                            return(<option key={index} value={ctr.cname}>{ctr.cname}</option>)
                        })                                             
                        }
                    </select>
                </div>
                </div>
                <div class="button">
                    <button type="submit" onClick={updateUser}>Update</button>
                </div>
        </form>
    </div>
    </div>
  );
}

export default Update;
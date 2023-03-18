
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAXyZl-MyTxRzlGjrVYOQCVsst5PbfF_bw",
    authDomain: "rdpd-dbaa4.firebaseapp.com",
    projectId: "rdpd-dbaa4",
    storageBucket: "rdpd-dbaa4.appspot.com",
    messagingSenderId: "300679241652",
    appId: "1:300679241652:web:0f1e8bca99955c4b401ce1"
  };

function Login(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');    
  
    return (
      <Card
        bgcolor="secondary"
        header="Login"
        status={status}
        body={show ? 
          <LoginForm setShow={setShow} setStatus={setStatus}/> :
          <LoginMsg setShow={setShow} setStatus={setStatus}/>}
      />
    ) 
  }
  
  function LoginMsg(props){
    return(<>
      <h5>Success login</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Login
      </button>
    </>);
  }
  
  function LoginForm(props){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const {ctx, setCtx}        = React.useContext(UserContext);
    
    function handle(){
      console.log(email, password);
      const url = `/account/login/${email}/${password}`;
      (async () => {
        var res = await fetch(url)
          .then(response => response.json())
          .then(data => {
            let message = data.message;
            props.setMessage(message);
            console.log('data = ' + data);
            console.log(message);
            if (data.user.name !== "Null")
              setCtx(data.user);
              console.table(ctx);
          })
          .catch((err)=>{props.setMessage("Please enter username and password.")});
      })();
  
      props.setStatus('');
      props.setShow(false);
    };
  
  
    return (<>
  
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
     
    </>);
  }
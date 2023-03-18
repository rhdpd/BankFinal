function Deposit(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');  
  
    return (
      <Card
        bgcolor="secondary"
        header="Deposit"
        status={status}
        body={show ? 
          <DepositForm setShow={setShow} setStatus={setStatus}/> :
          <DepositMsg setShow={setShow}/>}
      />
    )
  }
  
  function DepositMsg(props){
    return (<>
      <h5>Deposit confirmation</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
          Deposit again!
      </button>
    </>);
  } 

  function DepositForm(props){
    const [email, setEmail]   = React.useState('');
    const [amount, setAmount] = React.useState('');
    const ctx = React.useContext(UserContext);  
  
  function handle(){
    console.log(email,amount);
    const url = `/account/update/${email}/${balance};`
    const user = ctx.users.find((user) => user.email == email);

    fetch(url)
    .then(response => response.json())
    .then(data => {
      let message = data.message;
      props.setMessage(message);
      console.log("data = " + data);
      console.log(message);
      console.log(data.isSuccess);
      console.table(data.user);

      // successful result, set current usercontext to the user
      if (data.isSuccess){
        setCtx(data.user);
      }
  });

  props.setStatus('');
  props.setShow(false);
}



  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}

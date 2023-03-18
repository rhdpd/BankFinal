function Balance(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');  
  
    return (
      <Card
        bgcolor="secondary"
        header="Balance"
        status={status}
        body={show ?
          <BalanceForm setShow={setShow} setStatus={setStatus}/> :
          <BalanceMsg setShow={setShow}/>}
      />
    )
  
  }
  
  function BalanceMsg(props){
    return(<>
      <h5>Total Balance</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => { 
          props.setShow(true);
          props.setStatus('')
        }}>
          Check balance
      </button>
    </>);
  }
  
  function BalanceForm(props){
    const [email, setEmail]   = React.useState('');
    const [balance, setBalance] = React.useState('');  
    const ctx = React.useContext(UserContext);  
  
    function handle(){
      fetch(`/account/update/${email}`)
        .then(response => response.text())
        .then (text => {
          try {
            const data = JSON.parse(text);
            props.setStatus(text);
            props.setShow(false);
            setBalance(user.balance);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }
  
    return (<>
  
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Check Balance
      </button>
  
    </>);
  }
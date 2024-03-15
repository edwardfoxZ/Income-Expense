import { parse, v4 as uuidv4 } from 'uuid';
import './responsive.css'
import { useEffect, useState } from 'react';
import './mainP.css';

const Mainp = () => {

  const [total , setTotal] = useState(0)
  const [statements , setStatements] = useState([])

  const [input, setInput] = useState({
    statement: "",
    amount: "",
    statementType: "income"
  });

  const [showError, setShowError] = useState({
    statement: false,
    amount: false,
  });

  useEffect(() => {
    const addTotalValue = statements.reduce((sum, { type, amount }) => {
      if (type === 'income') {
        return sum + parseFloat(amount);
      } else{
        return sum - parseFloat(amount);
      }
      
    }, 0);
    setTotal(addTotalValue);
  }, [statements]);

  const renderTotal = () => {
    if(total > 0){
      return <h1 className='total-text text-success'>+{Math.abs(total)}</h1>
    }else if(total < 0){
      return <h1 className='total-text text-danger'>-{Math.abs(total)}</h1>
    }else {
      return <h1 className='total-text'>{Math.abs(total)}</h1>
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });
  };

  const handleAddNewStatement = () => {
    const { statement, amount , statementType } = input;

    if (!statement) {
      setShowError({
        statement: true,
        amount: false
      });
      console.log('statement is empty')
    } else if (!amount) {
      setShowError({
        statement: false,
        amount: true
      });
      console.log('amount is empty')
    } else {
      setShowError({
        statement: false,
        amount: false
      });
       setStatements([...statements, 
        {
          id: uuidv4(),
          name: statement,
          amount: parseFloat(amount).toFixed(2),
          type: statementType,
          date: new Date().toDateString()
        }])

    }
    setInput({
      statement: '',
      amount: '',
      statementType: 'income'
    })
  };

  return (
    <main className='main d-flex mx-auto'>
      <div className='container w-100 d-flex flex-column'>
        <div className='d-flex fs-1 justify-content-'>
          <p className={`fw-bolder`} style={{ fontSize: '100px' }}>{renderTotal()}</p>
        </div>

        <div className=' fs-2 d-flex flex-row gap-5 justify-content-center'>

          <div className='d-flex'>
            <input
              type="text"
              className={showError.statement ? 'borderRed' : 'borderWhiteSmoke'}
              placeholder='Income or expense...'
              onChange={handleInput}
              value={input.statement}
              name='statement'
            />
          </div>

          <div className='d-flex'>
            <input
              type="number"
              className={showError.amount ? 'borderRed' : 'borderWhiteSmoke'}
              placeholder='eg: 2000$'
              onChange={handleInput}
              value={input.amount}
              name='amount'
            />
          </div>

          <div className='d-flex'>
            <select
              className='incomeandexpense form-select p-3 bg-dark text-white'
              aria-label="Default select example"
              onChange={handleInput}
              value={input.statementType}
              name='statementType'
            >
              <option value="1">Income</option>
              <option value="2">Expense</option>
            </select>
          </div>

          <div className='d-flex'>
            <button className='addBu btn btn-success fs-3' onClick={handleAddNewStatement}>+</button>
          </div>

        </div>

        <div className='Lists d-flex flex-column w-100 h-100 box'>
          {statements.map(({name, amount, type, date, id})=> (
            <div key={id} className='d-flex flex-row justify-content-center align-items-center w-100 box_list shadow-lg p-3 mb-5 bg-body-tertiary rounded' style={{ height: '100px' }}>
              <div className='d-flex flex-column w-100'>
                <p className='fs-3 fw-bolder'>{name}</p>
                <p className='fw-normal --bs-secondary-color'>{date}</p>
              </div>
              <div className={`d-flex`}>
                <p className={`fs-2 fw-bolder ${type === 'income' ? 'text-success' : 'text-danger'}`}>{type === 'income' ? '+' : '-'}${amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Mainp;

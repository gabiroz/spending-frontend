export const Form = ({
                       description,
                       amount,
                       handleAmountChange,
                       currency,
                       toggleCurrency,
                       handleSave,
                       invalidAmount,
                       handleDescriptionChange,
                       invalidDescription,
                     }) => {
  return (
    <div className="Form">
      <input key='description' className={invalidDescription ? 'InvalidInput' : ''} type="text" placeholder="description" value={description}
             onChange={handleDescriptionChange}/>
      <input key='amount' className={invalidAmount ? 'InvalidInput' : ''} type="number" placeholder="0" value={amount}
             onChange={handleAmountChange}/>
      <button onClick={toggleCurrency}> {currency} </button>
      <button className='SaveButton' onClick={handleSave}> Save</button>
    </div>
  )
}
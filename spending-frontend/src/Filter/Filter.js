export const Filter = ({sorting, handleOptionChange, currencyFilter, filterCurrency}) => {
  const options = [
    {value: '-spent_at',
      description: 'Sort by date descending (default)',
    },
    {value: 'spent_at',
      description: 'Sort by date ascending',
    },
    {value: 'amount',
      description: 'Sort by amount ascending',
    },
    {value: '-amount',
      description: 'Sort by amount descending',
    }
  ]

  return(
    <div className='Form'>
      <select id="my-dropdown" value={sorting} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.description}</option>
        ))}
      </select>
      <div>
        <button className={!currencyFilter ? 'ActiveButton' : ''}  onClick={() =>filterCurrency('')}> ALL </button>
        <button className={currencyFilter==='HUF' ? 'ActiveButton' : ''} onClick={() =>filterCurrency('HUF')}> HUF </button>
        <button className={currencyFilter==='USD' ? 'ActiveButton' : ''}  onClick={() =>filterCurrency('USD')}> USD </button>
      </div>
    </div>
)
}

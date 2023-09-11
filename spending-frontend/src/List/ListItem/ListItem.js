import {ReactComponent as EditSvg} from '../../icons/edit.svg';
import {ReactComponent as DeleteSvg} from '../../icons/delete.svg';
import {ReactComponent as DollarSvg} from "../../icons/usd.svg";
import {ReactComponent as HufSvg} from "../../icons/huf.svg";
import './ListItem.css';

export function ListItem({item, onEdit, onDelete}) {
  const getCurrencySymbol = () => {
    switch (item.item.currency) {
      case 'USD':
        return '$'
      case 'HUF':
        return 'Ft'
      default:
        return ''
    }
  }

  return (
    <div className='Card'>
      <div className='Column'>
        {item.item.currency === "USD" ?
          <DollarSvg/> :
          <HufSvg/>}
      </div>
      <div className='WideColumn'>
        <div>{item.item.description}</div>
        <div>{new Date(item.item.spent_at).toLocaleString()}</div>
      </div>
      <div className='Column'>{getCurrencySymbol() + item.item.amount}</div>
      <div className='Column'>
        <EditSvg  onClick={() => onEdit(item.item)}/>
        <DeleteSvg onClick={() => onDelete(item.item)}/>
      </div>
    </div>
  )
}
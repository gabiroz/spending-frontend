import {ListItem} from "./ListItem/ListItem";

export const List = ({items, handleEdit, handleDelete}) => {
  return (
    <div>
    {items ? (
        items.map(item => (
          <ListItem key={item.id} item={{item}} onEdit={handleEdit} onDelete={handleDelete}/>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
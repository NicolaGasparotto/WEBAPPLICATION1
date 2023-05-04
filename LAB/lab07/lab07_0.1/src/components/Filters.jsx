import {ListGroup} from 'react-bootstrap/';
import { useNavigate } from "react-router-dom";
/**
 * This components requires:
 * - the list of filters labels to show, 
 * - the filter that is currenctly selected 
 * - the handler to notify a new selection
 */ 
const Filters = (props) => {
  const items = props.items;
  const selected = props.selected;
  
  // Converting the object into an array to use map method
  const filterArray = Object.entries(items);
  const navigate = useNavigate() ;

  return (
    <ListGroup as="ul" variant="flush">
        {
          filterArray.map(([_, { label }]) => {
            return (
                <ListGroup.Item as="li" key={label} onClick={() => navigate(`/filter/${label}`)}
                action active={selected === label ? true : false} >
                    {label}
                </ListGroup.Item>
            );
          })
        }
    </ListGroup>
  )
}

export { Filters };

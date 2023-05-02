import {ListGroup} from 'react-bootstrap/';
import {Link} from 'react-router-dom';

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

  return (
    <ListGroup as="ul" variant="flush">
        {
          filterArray.map(([filterName, { label }]) => {
            return (
                <ListGroup.Item as="li" key={filterName} onClick={() => props.setFilter(filterName)}
                action active={selected === filterName ? true : false} ><Link to={`/${filterName}`}></Link>
                    {label}
                </ListGroup.Item>
            );
          })
        }
    </ListGroup>
  )
}

export { Filters };

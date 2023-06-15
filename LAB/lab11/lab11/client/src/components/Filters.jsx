import {ListGroup} from 'react-bootstrap/';
import { NavLink } from 'react-router-dom';

/**
 * This components requires:
 * - the list of filters labels to show, 
 * - the filter that is currenctly selected 
 * - the handler to notify a new selection
 */ 
const Filters = (props) => {
  const items = props.filters;
  const selected = props.selected;

  return (
    <ListGroup as="ul" variant="flush">
        {
          items.map(filterName => {
            return (
              <NavLink key={filterName} to={`/filter/${filterName}`} style={{ textDecoration: 'none' }}>
              <ListGroup.Item as="li" key={filterName} 
                action active={selected === filterName ? true : false} 
                style={{border: '0.1', borderRadius: '4px'}}>
                {filterName}
              </ListGroup.Item>
            </NavLink>
            );
          })
        }
    </ListGroup>
  )
}

export { Filters };

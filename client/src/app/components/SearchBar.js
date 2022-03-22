import { InputGroup, FormControl, Button, Form} from 'react-bootstrap';

const SearchBar = props => (

    <form action="/" method="get">
        
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Search for GIFs"
                aria-label="Search for GIFs"
                aria-describedby="basic-addon2"
                onChange={e => props.saveSearchInput(e.target.value)}
            />

            <Form.Group controlId="formGridState">
                <Form.Select defaultValue="None" onChange={e => props.saveSearchMethod(e.target.value)}>
                    <option>None</option>
                    <option>Concepts</option>
                    <option>Keywords</option>
                    <option>Entities</option>
                </Form.Select>
            </Form.Group>

            <Button variant="outline-secondary" id="button-addon2" type="submit" value="Submit" onClick={(e) => props.handleSearch(e)}>
                Search
            </Button>
        </InputGroup>

    </form>

);

export default SearchBar;
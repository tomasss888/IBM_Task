import { InputGroup, FormControl, Button, DropdownButton, Dropdown, Form} from 'react-bootstrap';

const SearchBar = props => (


    <form action="/" method="get">
        {/* <input
            type="text"
            id="header-search"
            placeholder="Search for GIFs"
            name="search"
            onChange={e => props.saveSearchInput(e.target.value)}
        />
        <button type="button" onClick={() => props.handleSearch()}>
            Search
        </button> */}



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

            <Button variant="outline-secondary" id="button-addon2" type="button" value="Submit" onClick={() => props.handleSearch()}>
                Search
            </Button>
        </InputGroup>


    </form>


);

export default SearchBar;
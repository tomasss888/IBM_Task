import { Row, ButtonGroup, Button } from 'react-bootstrap';
import "./SelectableButtons.css"

const SelectableButtons = props => (

    <Row className="my-2" >
        <ButtonGroup onClick={e => props.handleSelectedButton(e)}>
            {(props.watsonObject.length === undefined || !props.watsonObject.length > 1 || props.error === undefined) ? <></> : (props.watsonObject.map((data) => (
                <Button
                    key={data.text}
                    value={data.text}
                    variant={(props.selectedButton === data.text) ? 'secondary' : 'outline-secondary'}
                >
                    {data.text}
                </Button>
            )))}
        </ButtonGroup>
    </Row>

);

export default SelectableButtons;
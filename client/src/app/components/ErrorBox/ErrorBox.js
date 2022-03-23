import { Alert } from 'react-bootstrap';
import "./ErrorBox.css"

const ErrorBox = props => (

    (Object.keys(props.error).length != 0) ? (
        <Alert variant="danger">
          <p>{(props.error?.meta?.status ?? undefined) ? props.error.meta.status : null}</p>
          <p>{(props.error?.meta?.msg ?? undefined) ? props.error.meta.msg : null}</p>
          <p>{(props.error?.code ?? undefined) ? props.error.code : null}</p>
        </Alert>
      ) : <></>

);

export default ErrorBox;
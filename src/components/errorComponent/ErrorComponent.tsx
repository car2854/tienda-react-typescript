import './ErrorComponent.css';

interface ErrorProp{
  message: string
}

export const ErrorComponent = ({message}:ErrorProp) => {
  return (
    <div className="error">
      <i className="fa-regular fa-face-frown"></i>
      <p>{message}</p>
    </div>
  )
}
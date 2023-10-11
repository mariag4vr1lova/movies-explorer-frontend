import './Wrapper.css'

function Wrapper({ children }) {
    return (
        <div className="page__wrapper">
        {children}
        </div>
    )
}
export default Wrapper
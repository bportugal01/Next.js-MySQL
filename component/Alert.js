
function Alert({ text, style, setAlertMassage }) {
    const handlerAlert = (e) => {
        e.preventDefault();
        setAlertMassage("");
    }

    return (
        <>
            <div className="alert w-50 align-self-center alert-success alert-dismissible fade show" style={{ display: style }} role="alert">
                {text}
                <button type="button" className="close" onClick={(e) => handlerAlert(e)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </>

    )
}

export default Alert;
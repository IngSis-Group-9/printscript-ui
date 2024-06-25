

const Divider = ({text} : {text: string}) => {

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
        }}>
            <hr style={{
                flexGrow: 1,
                height: '1px',
                backgroundColor: 'rgba(255,255,255,0.8)',
                margin: '0 10px',
                border: 'none',
            }}/>
            <span style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '17px',
                marginTop: '-5px',
            }}>
                {text}
            </span>
            <hr style={{
                flexGrow: 1,
                height: '1px',
                backgroundColor: 'rgba(255,255,255,0.8)',
                margin: '0 10px',
                border: 'none',
            }}/>
        </div>
    )
}

export default Divider;
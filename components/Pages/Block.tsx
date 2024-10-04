

export const Block = props => {


    if(!props.state.faves)
    {
        props.state.faves = []
    }

    return <f-x style={{
        width: 150, height: 200, flex: 1, minWidth: 150,
        position: "relative"
    }}>

        <img
            className={global.styles.hover}
            src={props.book.imageLink}
            style={{ width: 150, height: 200, objectFit: "fill", flex: 1, minWidth: 150 }}
            onClick={() => {
                props.state.form = "bookspecs"
                props.state.book = props.book
                props.refresh()
               
            }} />

        {props.state.faves.includes(props.book.title) ?
            <img src="https://irmapserver.ir/research/0/heart.png"
                style={{
                    height: 30, width: 30, objectFit: "contain",
                    position: "absolute", bottom: 10, right: 10
                }} /> : null}

    </f-x>
}


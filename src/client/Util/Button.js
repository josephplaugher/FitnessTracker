import React from 'react';

const Button = (props) => {
    const { name, id, value, onClick } = props
    return (
        <div className="button-div">
            <button className="submit"
                type="submit"
                name={name}
                id={id}
                onClick={onClick}
            >{value}</button>
        </div>
    )
}

export default Button;
import React from 'react';

const Button = (props) => {
    const { name, id, value, className, buttonContainerclassName, onClick } = props
    return (
        <div className={buttonContainerclassName}>
            <button className={className}
                type="submit"
                name={name}
                id={id}
                onClick={onClick}
            >{value}</button>
        </div>
    )
}

export default Button;
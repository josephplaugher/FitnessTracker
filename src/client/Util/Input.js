import React from 'react'

const Input = (props) => {

    const { name, label, value, className, containerCls, onChange } = props
    const type = name == 'password' ? 'password' : 'text'
    return (
        <div className={containerCls ? containerCls : "input-container"}>
            <label className="label" htmlFor={name}>{label}</label>
            <input className={className} name={name} value={value} onChange={(e) => onChange(e.target.value)} type={type} />
        </div>
    )
}

export default Input
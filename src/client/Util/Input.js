import React from 'react'

const Input = (props) => {

    const { name, label, value, className, containerCls, onChange, type } = props

    return (
        <div className={containerCls ? containerCls : "input-container"}>
            <label className="label" htmlFor={name}>{label}</label>
            <input className={className} name={name} value={value} onChange={(e) => onChange(e.target.value)} type={type || 'text'} />
        </div>
    )
}

export default Input
import React from 'react'

const Input = (props) => {

    const { name, label, value, onChange } = props
    const type = name == 'password' ? 'password' : 'text'
    return (
        <div className="input-container">
            <label className="label" htmlFor={name}>{label}</label>
            <input className="input" name={name} value={value} onChange={(e) => onChange(e.target.value)} type={type} />
        </div>
    )
}

export default Input
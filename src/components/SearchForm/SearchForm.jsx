import { useState } from "react";
import PropTypes from 'prop-types'
import { Form, FormBtn, FormInput } from "./SearchForm..styled";
import { BiSearch } from 'react-icons/bi'

export default function SearchForm({onSubmit}) {
    const [inputValue, setInputValue] = useState('')

    const handleChange = (e) => {
        setInputValue(e.currentTarget.value.toLowerCase())
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue === '') {
            return alert('Введіть щось для пошуку!')
        }

        onSubmit(inputValue)

        setInputValue('')
    }

    return (
    <Form onSubmit={handleSubmit}>
        <FormBtn type="submit"><BiSearch size="20"/></FormBtn>
            <FormInput
                type="text"
                value={inputValue}
                onChange={handleChange}
                autocomplete="off"
                placeholder="Search images and photos"
            />
    </Form>
    )
}

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
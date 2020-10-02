import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';

const FormFieldWrapper = styled.div`
  position:relative;
  textarea{
    min-height:150px;
  }

  input[type="color"]{
    padding-left:56px;
  }
`;

const Label = styled.label``;
Label.Text = styled.span`
  color:#E5E5E5;
  height: 57px;
  position:absolute;
  top:0;
  left:16px;

  display:flex;
  align-items:center;

  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight:300;

  transition: .1s ease-in-out;
`;

const Input = styled.input`
  background:#53585d;
  color:#f5f5f5;
  display:block;
  width:100%;
  height:57px;
  font-size:18px;

  outline:0;
  border:0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585d;

  padding: 16px 16px;
  margin-bottom:45px;
  resize:none;
  border-radius: 4px;
  transition: border-color .3s;

  &:focus{
    border-bottom--color:var(--primary);
  }

/*focuns quando o tipo do type for diferente de color*/
&:focus:not([type="color"]) + span {
    transform: scale(0.6) translateY(-10px);
  }
  ${({ hasValue }) => hasValue && css`
      &:not([type="color"]) + span {
      transform: scale(0.6) translateY(-10px);
      }
  `}
`;

function FormField({
  label, name, type, value, onChange, suggestions,
}) {
  const fieldId = `id_${name}`;
  const isTextarea = type === 'textarea';
  const tag = isTextarea ? 'textarea' : 'input';

  const hasValue = Boolean(value.length);
  // aparece sugestão se tiver sugestão
  const hasSuggestions = Boolean(suggestions.length);

  // console.log(type);

  return (
    <FormFieldWrapper>
      <Label
        htmlFor={fieldId}
      >

        <Input
          as={tag}
          id={fieldId}
          type={type}
          name={name}
          value={value}
          hasValue={hasValue}
          onChange={onChange}
          list={hasSuggestions ?`SuggestionFor_${fieldId}`:undefined}
          autoComplete={hasSuggestions ? 'off' : 'on'} //undefined porque o JSX reclama se por falso
        />
        <Label.Text>
          {label}
          :
        </Label.Text>
        <datalist id={`SuggestionFor_${fieldId}`}>
          hasSuggestions && (
          {
            /* nossos valors do datalist vem de suggestions */
            suggestions.map((suggestion) => (
              <option value={suggestion} key={`suggestionFO_${fieldId}_options${suggestion}`}>
                {suggestion}
              </option>
            ))
          })
          

        </datalist>
      </Label>
    </FormFieldWrapper>
  );
}

FormField.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => { },
  suggestions: [],
};

FormField.propTypes = {
  label: propTypes.string.isRequired,
  type: propTypes.string,
  name: propTypes.string.isRequired,
  value: propTypes.string,
  onChange: propTypes.func,
  suggestions: propTypes.arrayOf(propTypes.string),
};

export default FormField;

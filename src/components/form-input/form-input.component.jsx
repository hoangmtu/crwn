import { FormInputLabel, Input, Group } from "./form-input.styles";

const FormInput = ({label, changeHandler, ...otherProps }) => {
    return (
        
        <Group>
            <Input className="form-Input" {...otherProps}></Input>
            {
                label && (
                    <FormInputLabel shrink={otherProps.value.length} >{label}</FormInputLabel>
                )
            }           
        </Group>  
    )
};

export default FormInput;
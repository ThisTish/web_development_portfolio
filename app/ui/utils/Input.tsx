interface InputProps {
	placeholder: string
	type: string
	name: string
	id: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ placeholder, type, name, id, onChange }: InputProps) => {
	return (
		<input 
		type={type} 
		name={name}
		id={id}
		placeholder={placeholder}		
		className="rounded-2xl bg-primary border-secondary border-2 p-2 text-secondary placeholder:text-shadow valid:border-success error:border-danger"
		onChange={onChange}
		/>
	)
}

export default Input
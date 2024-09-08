interface ButtonProps {
	text: string
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	type?: 'Submit' | 'Button'
}

const Button = ({text, onClick}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className="text-secondary tracking-wider w-fit p-3 text-xs bg-warning rounded-full border-2 border-secondary hover:bg-danger hover:text-warning focus:bg-danger focus:text-warning"
			>
				{text}
			</button>
	)
}

export default Button
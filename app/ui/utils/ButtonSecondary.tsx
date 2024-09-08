interface ButtonSecondaryProps {
	text: string
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}


const ButtonSecondary = ({text, onClick}: ButtonSecondaryProps) => {
	return (
		<button
			onClick={onClick}
			className="text-highlight tracking-wider p-3 w-fit text-xs bg-success rounded-full border-2 border-highlight hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary"
			>
				{/* */}
				{text}
			</button>
	)
}

export default ButtonSecondary;
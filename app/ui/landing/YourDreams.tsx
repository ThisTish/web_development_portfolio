import Heading from "@/app/ui/utils/Heading"
import DreamDrop from "./DreamDrop"
import DreamGallery from "./DreamGallery"

const YourDreams = () => {
	return (
		
		<div className="flex flex-col items-center justify-center w-screen rounded-2xl pb-96 bg-gradient-to-b from-primary to-warning">
			<Heading text='Your Dreams' />
			<DreamDrop />
			<DreamGallery />
		</div>
		
	)
}

export default YourDreams
const DreamGallery = ({}) => {
	return (
		<div>
			
		</div>
	)
}

const getStaticProps = async () => {
	const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`,{
		headers:{
			Authorization: `Basic ${Buffer.from(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`).toString('base64')}`
		}
	}).then(res => res.json())
	console.log(` results: `, results)

	const { resources, width, height } = results

	const images = resources.map((resource: any) => {
		console.log(` resource: `, resource)
		return{
			id: resource.asset_id,
			title: resource.public_id,
			image: resource.secure_url,
			width,
			height
		}
	})

	return {
		props: {
			images
		}
	}
}

export default {DreamGallery, getStaticProps}
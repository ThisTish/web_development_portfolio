'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import cloudinary from "@/utils/cloudinary"
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder"
import type { ImageProps } from "@/utils/types"

const DreamGallery = () => {
	const [images, setImages] = useState<ImageProps[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image`, {
					headers: {
						Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`).toString('base64')}`
					}
				})
				const data = await response.json()
				const { resources } = data

				const reducedResults: ImageProps[] = []
				const blurImagePromises: Promise<string>[] = []

				let i = 0
				for (const resource of resources) {
					reducedResults.push({
						id: i,
						height: resource.height,
						width: resource.width,
						public_id: resource.public_id,
						format: resource.format,
						display_name: resource.display_name
					})
					blurImagePromises.push(getBase64ImageUrl(resource))
					i++
				}

				const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

				for (let i = 0; i < reducedResults.length; i++) {
					reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
				}

				setImages(reducedResults)
			} catch (error) {
				console.error("Error fetching images:", error)
			}
		}

		fetchData()
	}, [])

	const [activeImageId, setActiveImageId] = useState<number | null>(null)

	const imageClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const clickedId = e.currentTarget.getAttribute('data-id')
		setActiveImageId(clickedId == activeImageId ? null : Number(clickedId))
	}

	return (
		<>
			<main className="mx-auto max-w-screen-xl p-10">
				<h1 className="text-2xl text-white">this is</h1>
				<div className="columns-2 gap-5 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7">
					{images.map(({ id, public_id, format, blurDataUrl, display_name }) => (
						<div
							className={`after:content group relative mb-5 border-2 border-green-500 rounded-2xl block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight cursor-pointer active:p-4 ${activeImageId == id ? 'p-4' : 'p-0'}`}
							onClick={imageClick}
							key={id}
							data-id={id}
						>
							<Image
								alt="Next.js Conf photo"
								className="transform rounded-2xl brightness-90 p-1 transition will-change-transform group-hover:brightness-110"
								style={{ transform: "translate3d(0, 0, 0)" }}
								placeholder="blur"
								blurDataURL={blurDataUrl}
								src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
								width={720}
								height={480}
								sizes="(max-width: 640px) 100vw,
								(max-width: 1280px) 50vw,
								(max-width: 1536px) 33vw,
								25vw"
							/>
							<span
								id={`${id}`}
								className={`absolute inset-0 flex items-center justify-center p-2 text-white bg-black bg-opacity-50 rounded-br-2xl transition-opacity ${activeImageId == id ? 'opacity-100' : 'opacity-0'} `}
							>
								{display_name}
							</span>
						</div>
					))}
				</div>
			</main>
		</>
	)
}

export default DreamGallery;

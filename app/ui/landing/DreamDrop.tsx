'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Input from "@/app/ui/utils/Input"
import { MdOutlineSettingsSystemDaydream, MdCloudDone } from "react-icons/md"
import Button from '../utils/Button'
import ButtonSecondary from '../utils/ButtonSecondary'


const DreamDrop = () => {
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
	const [picStatus, setPicStatus] = useState<'ready' | 'preview' | 'saved'>('ready')
	const [title, setTitle] = useState<string>('')
	const [message, setMessage] = useState<string>('')

	const onDrop = useCallback((acceptedFiles: Array<File>) => {
		const file = new FileReader

		file.onload = () => {
			setPreview(file.result)
		}

		setPicStatus('preview')
		file.readAsDataURL(acceptedFiles[0])

	}, [])

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop })

	const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		setTitle(event.target.value)
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!acceptedFiles[0] === undefined) return

		const newDream = acceptedFiles[0]
		const formData = new FormData()

		formData.append('file', newDream)
		formData.append('upload_preset', 'dreams')
		formData.append('title', title)

		try {
			const results = await fetch('https://api.cloudinary.com/v1_1/dnvibzwty/image/upload', {
				method: 'POST',
				body: formData
			}).then(res => res.json())

			console.log(results)

			setMessage('Dream saved')
			setPicStatus('saved')

		} catch (error) {
			console.error(error)
			setMessage(`${error}`)
		}
	}

	const handleClear = () => {
		setPicStatus('ready')
	}

	return (
		<div >
			<form onSubmit={handleSubmit} className="dropzone gap-5 flex flex-col justify-center my-10">
				{/* to start */}
				{picStatus === `ready` && (
					<div {...getRootProps()} className="size-48 bg-success border-4 border-highlight rounded-2xl shadow-lg shadow-shadow">
						<input {...getInputProps()} />
						<div className="flex flex-col items-center p-5 gap-4 font-semibold text-highlight tracking-widest leading-loose text-center">
							<span>Drag & Drop Your Dream</span>
							<MdOutlineSettingsSystemDaydream size={48} />
						</div>
					</div>
				)}
				{/* to preview */}
				{picStatus === `preview` && (
					<>
						<div className=" w-48 h-auto mx-auto border-4 border-primary rounded-2xl shadow-lg shadow-success">
							<img src={preview as string} className="rounded-2xl shadow-lg p-0.5" />
						{message && (
							<div className='flex flex-col text-center'>
								<p className="text-danger font-semibold text-md"> Error!!!</p>
								<span className='text-secondary'>{message}</span>
								<p className="text-danger font-semibold text-md"> Don't give up on your dreams, try again!!!</p>
							</div>

						)}
						</div>
						<Input
							onChange={handleTitle}
							placeholder='Your dream in a word'
							type='text'
							name='title'
							id='title'
						/>
						<div className="flex gap-3 justify-end">
							<ButtonSecondary text='Clear' onClick={handleClear} />
							<Button text='Save' type='Submit' />
						</div>
					</>
				)}
			</form>

				{/* saved! */}
			{picStatus === `saved` && (
				
				<div className=" w-48 h-auto border-4 border-success rounded-2xl shadow-lg shadow-success">
					{/* change image to updated image with title - play with presets/transformations(save title as?)*/}
					{/* or tooltip! with popper! */}
					<img src={preview as string} className="rounded-2xl p-0.5" />
					<div className="flex flex-col items-center justify-center gap-4 font-semibold text-success tracking-widest text-center">
						<span>{message}</span>
						<MdCloudDone size={48} />
					</div>
				</div>

			)}
		</div>
	)
}

export default DreamDrop
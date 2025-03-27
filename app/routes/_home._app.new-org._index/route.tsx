import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Form, useNavigate } from '@remix-run/react';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

import styles from '@shared/styles/app-layout.module.css';

interface FormData {
	name: string;
	description: string;
}

const CreateOrganizationForm: FC = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<FormData>({
		name: '',
		description: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const showCancelButton = true;

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			console.log('Organization Created:', formData);

			navigate('/organization');
		} catch (error) {
			console.error('Error', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className={styles['app-container']}>
			<div className='bg-white p-6 rounded-lg shadow-lg w-96 items-center justify-center flex flex-col'>
				<Form className='space-y-4 w-full' onSubmit={handleSubmit}>
					<h1 className='text-xl font-bold text-center'>
						Create Organization
					</h1>

					<Input
						label='Name'
						size='sm'
						isRequired={true}
						name='name'
						value={formData.name}
						onChange={handleChange}
					/>

					<Textarea
						label='Short Description'
						isRequired={true}
						name='description'
						value={formData.description}
						onChange={handleChange}
					/>

					<div className='flex gap-4 justify-center'>
						{showCancelButton && (
							<Button color='secondary' type='button'>
								Cancel
							</Button>
						)}

						<Button
							color='primary'
							type='submit'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Creating...' : 'Create'}
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default CreateOrganizationForm;

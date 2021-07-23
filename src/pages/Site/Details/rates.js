import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Item from './item';
import StarRatingComponent from 'react-star-rating-component';
import { useTranslation } from 'react-i18next';

export default function Rates({ id, overallRate, changeComponent }) {
	const [rates, setRates] = useState([]);
	const [stars, setStars] = useState(0);
	const [comment, setComment] = useState('');
	const { t } = useTranslation();

	const [modalIsOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getComments();
	}, []);

	const getComments = () => {
		axios
			.get(`https://restaurant-dashboard.se01.tech/api/comments/${id}`, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((result) => {
				setRates([...result.data.data]);
			});
	};

	const onStarClick = (nextValue, prevValue, name) => {
		setStars(nextValue);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let values = {
			restaurant_id: id,
			comment: comment,
			rate: stars,
		};

		console.log(values);

		axios
			.post('https://restaurant-dashboard.se01.tech/api/add_comment', values, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then(function (response) {
				if (response.data.status == 'true') {
					setIsOpen(false);
					getComments();
					cogoToast.success('request submitted');
				} else {
					cogoToast.warn('someting went wrong');
				}
			});
	};

	return (
		<div
			className="categories"
			style={{
				height: '80vh',
			}}
		>
			<div className="ratesCountaner">
				<div className="ratesHeader">
					<p className="">
						{t('Overall')}:{' '}
						<StarRatingComponent
							name="rate1"
							starCount={5}
							value={overallRate}
						/>
					</p>
					<a
						className="sticky"
						onClick={() => {
							localStorage.getItem('token') &&
							localStorage.getItem('token').length > 9
								? setIsOpen(true)
								: changeComponent('login');
						}}
					>
						{t('Add Rate')}
					</a>
				</div>

				<div style={{ overflowY: 'scroll', height: '50vh', width: '75vw' }}>
					{rates.length > 0
						? rates.map((rate) => (
								<div
									className="itemContainer"
									style={{
										width: '90%',
										marginBottom: 0,
									}}
								>
									<div className="headerContainer">
										<div className="headerData">
											<h5>{rate.user}</h5>
											<p className="number">
												<StarRatingComponent
													name="rate1"
													starCount={5}
													value={rate.rate}
												/>
											</p>
										</div>
										<div className="headerDate"></div>
									</div>
									<div className="body">
										<p>{rate.comment}</p>
										<hr />
									</div>
								</div>
						  ))
						: 'no rates for this resturant'}
				</div>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => {
					setIsOpen(false);
				}}
				style={customStyles}
			>
				<div className="reqformContent">
					<h5>{t('Add your Rate')}</h5>
					<form onSubmit={handleSubmit}>
						<p
							style={{
								width: '95%',
							}}
						>
							{t('your rate')}
							<br />{' '}
							<StarRatingComponent
								onStarClick={onStarClick}
								name="rate1"
								starCount={5}
								value={stars}
							/>
						</p>
						<input
							type="text"
							name="comment"
							placeholder={t('Comment')}
							onChange={(e) => {
								setComment(e.target.value);
							}}
							className="note"
						/>

						<input
							className="joinwaitingbtn "
							style={{
								width: 300,
								margin: 0,
								marginTop: 20,
							}}
							value={t('Submit Comment')}
							type="submit"
						/>
					</form>
				</div>
			</Modal>
		</div>
	);
}

const customStyles = {
	content: {
		alignSelf: 'center',
		justifySelf: 'center',
		right: 'auto',
		bottom: 'auto',
		padding: 20,
		boxBorder: 'gray',
		inset: '20% auto auto 30%',
	},
};

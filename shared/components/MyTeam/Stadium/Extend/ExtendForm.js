import React from 'react';
import { number, element, bool, func, string } from 'prop-types';
import abbreviateNumber from '../../../../utils/logic/abbreviateNumber';
import { TextInput, SubmitButton, BasicLayout } from '../../../FormElements';
import styles from './styles.scss';

const Extend = ({
	valid,
	handleSubmit,
	submitting,
	fetching,
	subTotal,
	workForce,
	onSubmit,
	requestError,
	total,
	children
}) => (
	<BasicLayout className={styles.extend} onSubmit={handleSubmit(onSubmit)}>
		<div className={styles.flex}>
			<div>
				<TextInput
					name="terraces"
					inputConfig={{
						floatingLabelText: 'Gradas',
						fullWidth: true,
						type: 'number',
						min: 0,
					}}
				/>
			</div>
			<div>
				<TextInput
					name="tribunes"
					inputConfig={{
						floatingLabelText: 'Tribunas',
						fullWidth: true,
						type: 'number',
						min: 0,
					}}
				/>
			</div>
			<div>
				<TextInput
					name="vip"
					inputConfig={{
						floatingLabelText: 'VIP',
						fullWidth: true,
						type: 'number',
					}}
				/>
			</div>
		</div>
		<hr className={styles.hr} />
		<div className={styles.flex}>
			<div>
				<TextInput
					name="shops"
					inputConfig={{
						floatingLabelText: 'Tiendas',
						fullWidth: true,
						type: 'number',
						min: 0,

					}}
				/>
			</div>
			<div>
				<TextInput
					name="fastfoods"
					inputConfig={{
						floatingLabelText: 'Comida Rapida',
						fullWidth: true,
						type: 'number',
						min: 0,
					}}
				/>
			</div>
		</div>
		<div className={styles.outlay}>
			<span className={styles.subtotal}>
                    Subtotal: {abbreviateNumber(subTotal, 4)} |
                    Mano de obra: {abbreviateNumber(workForce, 4)}
			</span>
			<span className={styles.total}>Total: {abbreviateNumber(total, 4)}</span>
		</div>
		{requestError && <strong className={styles.errorMessage}>{requestError}</strong>}
		<div className={styles.buttons}>
			<SubmitButton
				primary
				text="Ampliar estadio"
				loading={submitting || fetching}
				valid={valid && total > 0}
				style={{ marginLeft: 12 }}
			/>
		</div>
		{children}
	</BasicLayout>
);

Extend.propTypes = {
	subTotal: number,
	workForce: number,
	total: number,
	handleSubmit: func.isRequired,
	valid: bool.isRequired,
	submitting: bool.isRequired,
	fetching: bool.isRequired,
	requestError: string,
	onSubmit: func.isRequired,
	children: element,
};

Extend.defaultProps = {
	requestError: null,
	children: () => null,
};

Extend.defaultProps = {
	subTotal: 0,
	workForce: 0,
	total: 0,
	anyTouched: false,
};
export default Extend;

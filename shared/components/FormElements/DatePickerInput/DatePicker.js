import React, { PureComponent } from 'react';
import { object, string } from 'prop-types';
import { Field } from 'redux-form';
import DatePicker from 'material-ui/DatePicker';

import FieldSetLayout from '../FieldSetLayout';

class InnerComp extends PureComponent {
	handleChange = (event, date) => {
		this.props.input.onChange(date);
	};

	render() {
		const { input, placeholder, ...props } = this.props;
		return (
			<FieldSetLayout {...props}>
				<DatePicker
					{...input}
					placeholder={placeholder}
					value={input.value || {}}
					onChange={this.handleChange}
				/>
			</FieldSetLayout>
		);
	}
}
InnerComp.propTypes = {
	placeholder: string.isRequired,
	input: object.isRequired,
};

const DatePickerInput = props => <Field {...props} component={InnerComp} />;

export default DatePickerInput;

import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import FieldSetLayout from '../FieldSetLayout';
import Select from 'react-select';

const ValueComp = props => (
	<div className="Select-value">
		<span className="Select-value-label">{props.children}</span>
	</div>
);

class OptionsComp extends PureComponent {
	handleMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option.value, event);
	};

	handleMouseEnter = (event) => {
		this.props.onFocus(this.props.option, event);
	};

	render() {
		const { className, option, imageStyle } = this.props;
		const imgStyle = imageStyle || {
			width: '20px',
			height: '20px',
			marginRight: '5px',
			borderRadius: '100%',
		};
		return (
			<div
				className={className}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				title={option.label}
			>
				{option.image && <img style={imgStyle} src={option.image} alt={option.label} />}
				{this.props.children}
			</div>
		);
	}
}

const ArrowRenderer = () => <span>+</span>;

class InnerComp extends PureComponent {
	handleChange = opt => this.props.input.onChange(opt.value ? opt.value : opt);

	render = () => {
		const { placeholder, input, options, filterOptions, ...props } = this.props;
		const selectProps = {};
		if (filterOptions) selectProps.filterOptions = filterOptions;
		return (
			<FieldSetLayout {...props}>
				<Select
					{...selectProps}
					arrowRenderer={ArrowRenderer}
					optionComponent={OptionsComp}
					options={options}
					placeholder={placeholder}
					valueComponent={ValueComp}
					disabled={props.disabled}
					{...input}
					onChange={this.handleChange}
					onBlur={() => {}}
					menuStyle={{
						textTransform: 'capitalize',
					}}
				/>
			</FieldSetLayout>
		);
	};
}

const SelectInput = props => <Field {...props} component={InnerComp} />;

export default SelectInput;

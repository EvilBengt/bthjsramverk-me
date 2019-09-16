import React from "react";

const partialDatePattern = /^(\d(\d(\d(\d(-(\d(\d(-(\d(\d)?)?)?)?)?)?)?)?)?)?$/;
const completeDatePattern = /^\d{4}(-\d{2}){2}$/;

class DatePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            old: "",
        };
    }
    render() {
        return (
            <div>
                <input type="text" className={this.props.className}
                    onBlur={this.props.onBlur}
                    required={this.props.required}
                    name={this.props.name}
                    maxLength="10"
                    onChange={e => this.update(e.target.value, e.target)}
                    value={this.state.value}
                    placeholder="ÅÅÅÅMMDD"
                />
            </div>
        );
    }
    update(value, element) {
        let validityMessage = "Fyll i ett fullständigt datum";

        if (value.length > 4 && value[4] !== "-") {
            value = value.substring(0, 4) + "-" + value.substring(4);
        }

        if (value.length > 7 && value[7] !== "-") {
            value = value.substring(0, 7) + "-" + value.substring(7);
        }

        if (!partialDatePattern.test(value)) {
            value = this.state.old;
        } else {
            if (completeDatePattern.test(value)) {
                if (isValidDate(value)) {
                    validityMessage = "";
                } else {
                    validityMessage = "Fyll i ett giltigt datum.";
                }
            }
        }

        if (element) {
            element.setCustomValidity(validityMessage);
        }

        this.setState({
            value: value,
            old: value
        });
    }
}

function isValidDate(dateString) {
    const dateObject = new Date(dateString);
    const isValidObject = dateObject instanceof Date && !isNaN(dateObject);

    return isValidObject && dateObject.toISOString().substring(0, 10) === dateString;
}

export default DatePicker;

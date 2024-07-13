import React from 'react';

class NumberInput extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ value: e.target.value });
    }
  }

  render() {
    return (
      <div>
        <input
          className='form-input'
          value={this.state.value}
          onChange={this.onChange}
          placeholder
        />
      </div>
    );
  }
}

export default NumberInput;

import { Component } from 'react';
import Button from '../button/Buttons';
import Screen from '../screen/Screen';
import "./Calculator.css"

interface CalculatorState {
  currentValue: string;
  operator: string;
  previousValue: string;
}

class Calculator extends Component <{}, CalculatorState>{
  constructor(props: {}){
    super(props);
    this.state = {
      currentValue: '0',
      previousValue: '',
      operator: '',
    }
  };

  handleButtonClick = (value: string) => {
    if (value === 'delete') {
      this.setState((prevState) => ({
        currentValue: prevState.currentValue.slice(0, -1),
      }));
    } else if (!isNaN(Number(value)) || value === '.') {
      if (value === '.' && this.state.currentValue.includes('.')){
        return;
      }
      if (this.state.currentValue === '0' && value !== '.') {
        this.setState({ currentValue: value });
      } else {
        this.setState((prevState) => ({
          currentValue: prevState.currentValue + value,
        }));
      }
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (this.state.operator) {
        this.handleEqualClick();
      }
      this.setState({
        operator: value,
        previousValue: this.state.currentValue,
        currentValue: '0',
      });
    }
  };

  handleEqualClick = () => {
    const { previousValue, operator, currentValue } = this.state;
    if (operator && previousValue) {
      try{
        const result = eval(`${previousValue}${operator}${currentValue}`);
        this.setState({
          currentValue: String(result),
          previousValue: '',
          operator: ''
        });
      } catch (err) {
        this.setState({ currentValue: 'Error'})
      }
    }
  };

  handleClearClick = () => {
    this.setState({ currentValue: '0', previousValue: '', operator: '' });
  }

  render() {
    return (
      <div className="calculator">
        <Screen value={this.state.currentValue} />
        <div className="buttons">
          <div className="button-row">
              {[7, 8, 9, 'DEL'].map((number) => (
                <Button key={number} onClick={() => this.handleButtonClick(String(number))}>
                  {number}
                </Button>
              ))}
          </div>
          <div className="button-row">
            {[4, 5, 6, '+'].map((number) => (
              <Button key={number} onClick={() => this.handleButtonClick(String(number))}>
                {number}
              </Button>
            ))}
          </div>
          <div className="button-row">
            {[1, 2, 3, '-'].map((number) => (
              <Button key={number} onClick={() => this.handleButtonClick(String(number))}>
                {number}
              </Button>
            ))}
          </div>
          <div className="button-row">
            {['.', 0, '/', '*'].map((number) => (
              <Button key={number} onClick={() => this.handleButtonClick(String(number))}>
                {number}
              </Button>
            ))}
          </div>
          <div className="button-row">
            <Button onClick={this.handleClearClick}>RESET</Button>
            <Button onClick={this.handleEqualClick}>=</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;

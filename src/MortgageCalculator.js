import React, { useState } from 'react';
import TextInput from './components/TextInput';
import SelectInput from './components/SelectInput';
import Button from './components/Button';
import iconCalculator from './img/icon-calculator.svg';
import illustrationEmpty from './img/illustration-empty.svg';

const MortgageCalculator = () => {
    // State to store all form inputs and error states
    const [mortgageData, setMortgageData] = useState({
      mortgageAmount: '',
      mortgageTerm: '',
      interestRate: '',
      mortgageType: '',
    });
  
    const [errors, setErrors] = useState({});
    const [monthlyRepayment, setMonthlyRepayment] = useState(null);
    const [totalRepayment, setTotalRepayment] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [activeField, setActiveField] = useState('');
  
    // Handle input change
    const handleChange = (e) => {
      const { name, value } = e.target;
      // Remove commas from the value before storing it
      const numericValue = value.replace(/,/g, '');
      
      // Validate if the field should contain numbers only
      if ((name === 'mortgageAmount' || name === 'mortgageTerm' || name === 'interestRate') && isNaN(numericValue)) {
        setErrors((prev) => ({
          ...prev,
          [name]: 'This field must be a number.',
        }));
      } else {
        setMortgageData((prev) => ({
          ...prev,
          [name]: numericValue,
        }));
        // Clear the error for this field when input is valid
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }));
      }

      if(value === "mortgageType") {
        const queryElm = document.querySelectorAll('.mortgage-type');
        queryElm.forEach(elm => {
            elm.classList.remove('selected');
        });

        if(value === "Repayment"){
            document.querySelector('.mortgage-type input["Repayment"]').parentElement.classList.add('selected');
        } else if (value === "Interest Only") {
            document.querySelector('.mortgage-type input["Interest Only"]').parentElement.classList.add('selected');
        }
      }
    };
  
    // Validation function to check empty fields and numerical input
    const validate = () => {
      let valid = true;
      const newErrors = {};
  
      // Check if fields are empty or invalid
      if (!mortgageData.mortgageAmount || isNaN(mortgageData.mortgageAmount)) {
        newErrors.mortgageAmount = 'This field is required.';
        valid = false;
      }
      if (!mortgageData.mortgageTerm || isNaN(mortgageData.mortgageTerm)) {
        newErrors.mortgageTerm = 'This field is required';
        valid = false;
      }
      if (!mortgageData.interestRate || isNaN(mortgageData.interestRate)) {
        newErrors.interestRate = 'This field is required';
        valid = false;
      }

      if (!mortgageData.mortgageType) {
        newErrors.mortgageType = 'This field is required'
        valid = false
      }
  
      setErrors(newErrors);
      return valid;
    };
  
    // Function to handle form submission and calculations
    const calculateRepayment = (e) => {
      e.preventDefault();
  
      // Validate inputs before calculation
      if (!validate()) return;
  
      const principal = parseFloat(mortgageData.mortgageAmount);
      const termInMonths = parseInt(mortgageData.mortgageTerm) * 12;
      const monthlyInterestRate = parseFloat(mortgageData.interestRate) / 100 / 12;
  
      let monthlyPayment = 0;
      let totalPaid = 0;
  
      if (mortgageData.mortgageType === 'Repayment') {
        monthlyPayment =
          (principal * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -termInMonths));
        totalPaid = monthlyPayment * termInMonths;
      } else {
        monthlyPayment = principal * monthlyInterestRate;
        totalPaid = monthlyPayment * termInMonths + principal;
      }
  
      setMonthlyRepayment(monthlyPayment.toFixed(2));
      setTotalRepayment(totalPaid.toFixed(2));
      setShowResults(true)
    };
  
    // Function to clear all input fields and results
    const clearAll = () => {
      setMortgageData({
        mortgageAmount: '',
        mortgageTerm: '',
        interestRate: '',
        mortgageType: '',
      });
      setErrors({});
      setMonthlyRepayment(null);
      setTotalRepayment(null);
      setShowResults(false)
    };
  
    return (
        <section className='mortgage-calculator-container'>
          <div className="mortgage-calculator">
              <h2>Mortgage Calculator</h2>
              <span className='clear-all' onClick={clearAll}>
                Clear All
              </span>
              <form onSubmit={calculateRepayment}>
                <TextInput 
                  type="text"
                  label="Mortgage Amount"
                  name="mortgageAmount"
                  value={mortgageData.mortgageAmount}
                  onChange={handleChange}
                  error={errors.mortgageAmount}
                  activeField={activeField}
                  setActiveField={setActiveField}
                />
                <div className='form-row'>
                  <TextInput 
                    type="text"
                    label="Mortgage Term"
                    name="mortgageTerm"
                    value={mortgageData.mortgageTerm}
                    onChange={handleChange}
                    error={errors.mortgageTerm}
                    activeField={activeField}
                    setActiveField={setActiveField}
                  />
                  <TextInput 
                    type="text"
                    label="Interest Rate"
                    name="interestRate"
                    value={mortgageData.interestRate}
                    onChange={handleChange}
                    error={errors.interestRate}
                    activeField={activeField}
                    setActiveField={setActiveField}
                  />
                </div>
                <div className='mortgage-select'>
                  <label for="mortgageType">Mortgage Type</label>
                  <SelectInput 
                    id="repayment"
                    name="mortgage"
                    type="mortgageType"
                    stateValue={mortgageData.mortgageType}
                    selectedValue="Repayment"
                    handleChange={handleChange}
                  />
                  <SelectInput 
                    id="interestOnly"
                    name="mortgage"
                    type="mortgageType"
                    stateValue={mortgageData.mortgageType}
                    selectedValue="Interest Only"
                    handleChange={handleChange}
                  />
                  {errors.mortgageType && <p className="error-text">{errors.mortgageType}</p>}
                </div>
                <Button
                  type="submit"
                  hasImage={true}
                  image={iconCalculator}
                  buttonText="Calculate Repayments"
                />
              </form>
        
            </div>
            <div className="results-container">
                {showResults ? (
                    <div className="results">
                        <h3>Your results</h3>
                        <p>
                          Your results are shown below based on the information you provided. To adjust the results, edit the form and click “Calculate Repayments” again.
                        </p>
                        <div className='result-item-container'>
                          <div className="result-item">
                            <p className="result-label monthly-repayment-label">Your Monthly Repayments</p>
                            <h1 className="result-value">${Number(monthlyRepayment).toLocaleString()}</h1>
                          </div>
                          <div className="result-item">
                            <p className="result-label total-repayment-label">Total You'll Repay Over the Term</p>
                            <h3 className="result-total">${Number(totalRepayment).toLocaleString()}</h3>
                          </div>
                        </div>
                    </div>
                ) : (
                    <div className="empty-results">
                      <img src={illustrationEmpty} alt="Empty illustration" className="empty-image" />
                      <h3>Results Shown Here</h3>
                      <p>
                        Complete the form and click “Calculate Repayments” to see what your monthly repayments would be.
                      </p>
                    </div>
                )}
            </div>
        </section>
    );
  };

export default MortgageCalculator;

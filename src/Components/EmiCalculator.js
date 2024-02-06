import React, { useEffect, useRef, useState } from 'react'
import "../Components/EmiCalculator.css";
import { FaRupeeSign } from "react-icons/fa";
import Chart from 'chart.js/auto';
 
const EmiCalculator = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [selectedInterestRate, setSelectedInterestRate] = useState(0);
    const [selectedLoanTenure, setSelectedLoanTenure] = useState(0);
    const [selectedLoanAmount, setSelectedLoanAmount] = useState(0);

    const [loan, setLoan] = useState("home");
    const [loanAmount, setLoanAmount] = useState(500000);
    const [interestRate, setInterestRate] = useState(11);
    const [loanTenure, setLoanTenure] = useState(5);

    const [loanAmountPersonal, setLoanAmountPersonal] = useState(600000);
    const [interestRatePersonal, setInterestRatePersonal] = useState(11);
    const [loanTenurePersonal, setLoanTenurePersonal] = useState(1);

    const [loanAmountCar, setLoanAmountCar] = useState(400000);
    const [interestRateCar, setInterestRateCar] = useState(11);
    const [loanTenureCar, setLoanTenureCar] = useState(1);

    const [EMI, setEMI] = useState(0);
    const [TotalAmountOfInterest, setTotalAmountOfInterest] = useState(0);
    const [TotalAmount, setTotalAmount] = useState(0);
    const [formattedEMI, setFormattedEMI] = useState('0');
    const [formattedTotalAmount, setFormattedTotalAmount] = useState('0');
    const [formattedTotalAmountOfCredit, setFormattedTotalAmountOfCredit] = useState('0');
    const [formattedTotalAmountOfInterest, setFormattedTotalAmountOfInterest] = useState('0');

    useEffect(()=>{
        if(loan == "home"){
            setSelectedLoanAmount(loanAmount);
            setSelectedInterestRate(interestRate);
            setSelectedLoanTenure(loanTenure);
        }else if(loan == "personal"){
            setSelectedLoanAmount(loanAmountPersonal);
            setSelectedInterestRate(interestRatePersonal);
            setSelectedLoanTenure(loanTenurePersonal);
        }else if(loan == "car"){
            setSelectedLoanAmount(loanAmountCar);
            setSelectedInterestRate(interestRateCar);
            setSelectedLoanTenure(loanTenureCar);
        }else{
            setSelectedLoanAmount(loanAmount);
            setSelectedInterestRate(interestRate);
            setSelectedLoanTenure(loanTenure);
        }


        if(chartInstance.current){
            chartInstance.current.destroy()
        }
        const myChartRef = chartRef.current.getContext('2d');
        var per1 = ((selectedLoanAmount / TotalAmount ) * 100).toFixed(2);
        var per2 = ((TotalAmountOfInterest / TotalAmount) * 100).toFixed(2);

        chartInstance.current = new Chart(myChartRef, {
            type: 'pie',
            data: {
                labels: ['Principal Loan Amount', 'Total Interest'],
                datasets: [{
                    data: [per1, per2],
                    backgroundColor: [
                        'rgb(136,168,37,255)',
                        'rgb(54, 162, 235)',
                    ],
                    borderColor: 'white', 
                    borderWidth: 5, 
                }],
            },
        });
        return () => {
            if(chartInstance.current){
                chartInstance.current.destroy();
            }
        }
    },[loan,
        loanAmount,
        interestRate,
        loanTenure,
        loanAmountPersonal,
        interestRatePersonal,
        loanTenurePersonal,
        loanAmountCar,
        interestRateCar,
        loanTenureCar,
        TotalAmountOfInterest,])

        useEffect(() => {
            const RateOfInterestPerMonth = selectedInterestRate / 1200;
            const EMI =
              selectedLoanTenure * 12
                ? Math.round(
                    selectedLoanAmount *
                      RateOfInterestPerMonth /
                      (1 - Math.pow(1 / (1 + RateOfInterestPerMonth), selectedLoanTenure * 12))
                  )
                : 0;
            const TotalAmount = selectedLoanTenure * 12 * EMI;
            const TotalAmountOfCreadit = Math.round(
              (EMI / RateOfInterestPerMonth) * (1 - Math.pow(1 + RateOfInterestPerMonth, -selectedLoanTenure * 12))
            );
            const TotalAmountOfInterest = Math.round(TotalAmount - TotalAmountOfCreadit);
        
            setEMI(EMI);
            setTotalAmountOfInterest(TotalAmountOfInterest);
            setTotalAmount(TotalAmount);
            setFormattedEMI(EMI.toLocaleString());
            setFormattedTotalAmount(TotalAmount.toLocaleString());
            setFormattedTotalAmountOfCredit(TotalAmountOfCreadit.toLocaleString());
            setFormattedTotalAmountOfInterest(TotalAmountOfInterest.toLocaleString());
          }, [selectedLoanAmount, selectedInterestRate, selectedLoanTenure]);

    const getBtnDetails = (event) => {
        const selectedBtn = event.target;
        const allButtons = document.querySelectorAll('.loanBtn');
        
        // Remove border from all buttons
        allButtons.forEach(button => {
            button.style.backgroundColor = "#30638e";
            button.style.color = "white";
        });

        // Toggle border color of the clicked button
        selectedBtn.style.backgroundColor = "#003d5b";
        selectedBtn.style.color = "orange";

        // Set the corresponding loan type based on the clicked button
        if (selectedBtn.classList.contains('loanBtn1')) {
            setLoan("home");
        } else if (selectedBtn.classList.contains('loanBtn2')) {
            setLoan("personal");
        } else if (selectedBtn.classList.contains('loanBtn3')) {
            setLoan("car");
        }
    };

    const handleLoanAmountChange = (event) => {
        setLoanAmount(event.target.value);
    };

    const handleLoanAmountChange2 = (event) =>{
        setLoanAmountPersonal(event.target.value)
    }

    const handleLoanAmountChange3 = (event) =>{
        setLoanAmountCar(event.target.value)
    }

    const renderStoppers = () => {
        const stoppers = [];
        for (let i = 0; i <= 20000000; i += 2500000) {
        const formattedValue = (i / 100000).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        stoppers.push(
            <span key={i} className='stopper' onClick={() => setLoanAmount(i)}>
                {formattedValue + "L"}
            </span>
        );
        }
        return stoppers;
    };

    const handleInterestRateChange = (event) =>{
        setInterestRate(event.target.value)
    }

    const handleInterestRateChange2 = (event) =>{
        setInterestRatePersonal(event.target.value);
    }

    const handleInterestRateChange3 = (event) =>{
        setInterestRateCar(event.target.value);
    }

    const renderStoppers2 = () => {
        const stoppers2 = [5, 7.5, 10, 12.5, 15, 17.5, 20];
    
        return stoppers2.map(value => (
            <span key={value} className='stopper' onClick={() => setInterestRate(value)}>
                {value.toFixed(2)}%
            </span>
        ));
    };

    const renderTenureStoppers = () => {
        const tenureStoppers = [0, 5, 10, 15, 20, 25, 30];
    
        return tenureStoppers.map(value => (
            <span key={value} className='stopper' onClick={() => setLoanTenure(value)}>
                {value} Y
            </span>
        ));
    };

    const renderLoanAmountStoppers = () => {
        const stopperValues = [0, 5, 10, 15, 20, 25, 30];
        const stoppers = stopperValues.map(value => (
            <span key={value} className='stopper' onClick={() => setLoanAmountPersonal(value * 100000)}>
                ₹{value}L
            </span>
        ));
        
        return stoppers;
    };

    const renderStoppers3 = () => {
        const stoppers2 = [5, 7.5, 10, 12.5, 15, 17.5, 20, 25];
    
        return stoppers2.map(value => (
            <span key={value} className='stopper' onClick={() => setInterestRatePersonal(value)}>
                {value.toFixed(2)}%
            </span>
        ));
    };

    const renderStoppers4 = () => {
        const stoppers2 = [5, 7.5, 10, 12.5, 15, 17.5, 20];
    
        return stoppers2.map(value => (
            <span key={value} className='stopper' onClick={() => setInterestRateCar(value)}>
                {value.toFixed(2)}%
            </span>
        ));
    };

    const renderTenureStoppers2 = () => {
        const tenureStoppers = [0, 1, 2, 3, 4, 5];
    
        return tenureStoppers.map(value => (
            <span key={value} className='stopper' onClick={() => setLoanTenurePersonal(value)}>
                {value} Y
            </span>
        ));
    };

    const renderLoanAmountStoppers2 = () => {
        const stopperValues = [0, 5, 10, 15, 20];
        const stoppers = stopperValues.map(value => (
            <span key={value} className='stopper' onClick={() => setLoanAmountCar(value * 100000)}>
                ₹{value}L
            </span>
        ));
        
        return stoppers;
    };

    const renderTenureStoppers3 = () => {
        const tenureStoppers = [0, 1, 2, 3, 4, 5, 6, 7];
    
        return tenureStoppers.map(value => (
            <span key={value} className='stopper' onClick={() => setLoanTenureCar(value)}>
                {value} Y
            </span>
        ));
    };

  return (
    <>
    <nav>
        <div className='NavBarMainbox1'>
            <h1>EMI Calculator for Home Loan, Car Loan & Personal Loan in India</h1>
        </div>
    </nav>
    <div className='emiMainbox1'>
        <div className='emiM1Box1'>
            <button onClick={getBtnDetails} className='loanBtn  loanBtn1'>Home Loan</button>
            <button onClick={getBtnDetails} className='loanBtn  loanBtn2'>Personal Loan</button>
            <button onClick={getBtnDetails} className='loanBtn  loanBtn3'>Car Loan</button>
            {loan == "home" && (
                <>
                <div className='homeMainbox1'>
                    <div className='homeM1B1'>
                        <label>Home Loan Amount</label>&nbsp;&nbsp;
                        <input type='number' className='homeM1B1Input1' placeholder='Enter Loan Amount In Rupees' value={loanAmount}  onChange={(e) => setLoanAmount(e.target.value)}/>
                        <input 
                        type='range' 
                        className='homeM1B1Input2'
                        id='loanAmount'
                        min={0}
                        max={20000000}
                        step={100000}
                        value={loanAmount}
                        onChange={handleLoanAmountChange}
                        />
                        <div className='stoppersContainer'>
                            {renderStoppers()}
                        </div>
                    </div>
                    <div className='homeM1B1'>
                        <label>Interest Rate</label>&nbsp;&nbsp;
                        <input type='number' className='homeM1B1Input1' placeholder='Enter Interest Rate' value={interestRate} onChange={(e)=>setInterestRate(e.target.value)}/>
                        <input 
                        type='range' 
                        className='homeM1B1Input2'
                        id='InterestRate'
                        min={5}
                        max={20}
                        step={0.01}
                        value={interestRate}
                        onChange={handleInterestRateChange}
                        />
                        <div className='stoppersContainer'>
                            {renderStoppers2()}
                        </div>
                    </div>
                    <div className='homeM1B1'>
                        <label>Loan Tenure</label>&nbsp;&nbsp;
                        <input type='number' className='homeM1B1Input1' placeholder='Enter Interest Rate' value={loanTenure} onChange={(e)=>setLoanTenure(e.target.value)}/>
                        <input 
                        type='range' 
                        className='homeM1B1Input2'
                        id='LoanTenure'
                        min={0}
                        max={30}
                        step={1}
                        value={loanTenure}
                        onChange={handleInterestRateChange}
                        />
                        <div className='stoppersContainer'>
                            {renderTenureStoppers()}
                        </div>
                    </div>
                </div>
                </>
            )}
            {loan == "personal" && (
                <>
                <div className='homeMainbox1'>
                <div className='homeM1B1'>
                        <label>Personal Loan Amount</label>&nbsp;&nbsp;
                        <input type='number' className='homeM1B1Input1' placeholder='Enter Loan Amount In Rupees' value={loanAmountPersonal} onChange={(e)=>setLoanAmountPersonal(e.target.value)}/>
                        <input 
                        type='range' 
                        className='homeM1B1Input2'
                        id='loanAmountPersonal'
                        min={0}
                        max={3000000}
                        step={100000}
                        value={loanAmountPersonal}
                        onChange={handleLoanAmountChange2}
                        />
                        <div className='stoppersContainer'>
                            {renderLoanAmountStoppers ()}
                        </div>
                    </div>
                    <div className='homeM1B1'>
                        <label>Interest Rate</label>&nbsp;&nbsp;
                        <input type='number' className='homeM1B1Input1' placeholder='Enter Interest Rate' value={interestRatePersonal} onChange={(e)=>setInterestRatePersonal(e.target.value)}/>
                        <input 
                        type='range' 
                        className='homeM1B1Input2'
                        id='InterestRatePersonal'
                        min={5}
                        max={25}
                        step={0.01}
                        value={interestRatePersonal}
                        onChange={handleInterestRateChange2}
                        />
                        <div className='stoppersContainer'>
                            {renderStoppers3()}
                        </div>
                    </div>
                    <div className='homeM1B1'>
                        <label>Loan Tenure</label>&nbsp;&nbsp;
                        <input type='number' className='homeM1B1Input1' placeholder='Enter Interest Rate' value={loanTenurePersonal} onChange={(e)=>setLoanTenurePersonal(e.target.value)}/>
                        <input 
                        type='range' 
                        className='homeM1B1Input2'
                        id='LoanTenurePersonal'
                        min={0}
                        max={5}
                        step={1}
                        value={loanTenurePersonal}
                        onChange={handleInterestRateChange2}
                        />
                        <div className='stoppersContainer'>
                            {renderTenureStoppers2()}
                        </div>
                    </div>
                </div>
                </>
            )}
            {loan == "car" && (
                <>
                <div className='homeMainbox1'>
                <div className='homeM1B1'>
                        <label>Car Loan Amount</label>&nbsp;&nbsp;
                        <input type='number' className='homeM1B1Input1' placeholder='Enter Loan Amount In Rupees' value={loanAmountCar} onChange={(e)=>setLoanAmountCar(e.target.value)}/>
                        <input 
                        type='range' 
                        className='homeM1B1Input2'
                        id='loanAmountCar'
                        min={0}
                        max={2000000}
                        step={100000}
                        value={loanAmountCar}
                        onChange={handleLoanAmountChange3}
                        />
                        <div className='stoppersContainer'>
                            {renderLoanAmountStoppers2()}
                        </div>
                    </div>
                    <div className='homeM1B1'>
                        <label>Interest Rate</label>&nbsp;&nbsp;
                        <input type='number' className='homeM1B1Input1' placeholder='Enter Interest Rate' value={interestRateCar} onChange={(e)=>setInterestRateCar(e.target.value)}/>
                        <input 
                        type='range' 
                        className='homeM1B1Input2'
                        id='InterestRateCar'
                        min={5}
                        max={20}
                        step={0.01}
                        value={interestRateCar}
                        onChange={handleInterestRateChange3}
                        />
                        <div className='stoppersContainer'>
                            {renderStoppers4()}
                        </div>
                    </div>
                    <div className='homeM1B1'>
                        <label>Loan Tenure</label>&nbsp;&nbsp;
                        <input type='number' className='homeM1B1Input1' placeholder='Enter Interest Rate' value={loanTenureCar} onChange={(e)=>setLoanTenureCar(e.target.value)}/>
                        <input 
                        type='range' 
                        className='homeM1B1Input2'
                        id='LoanTenureCar'
                        min={0}
                        max={7}
                        step={1}
                        value={loanTenureCar}
                        onChange={handleInterestRateChange3}
                        />
                        <div className='stoppersContainer'>
                            {renderTenureStoppers3()}
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
        <div className='emiM1Box2'>
            <div className='emiM1Box21'>
                <div className='emiM1Box211'>
                    <p className='emiM1Box21Para1'>Loan EMI</p>
                    <h3 className='emiM1Box21Para2'><FaRupeeSign />{formattedEMI}</h3>
                </div>
                <div className='emiM1Box212'>
                    <p className='emiM1Box21Para1'>Total Interest Payable</p>
                    <h3 className='emiM1Box21Para2'><FaRupeeSign />{formattedTotalAmountOfInterest}</h3>
                </div>
                <div className='emiM1Box213'>
                    <p className='emiM1Box21Para1'>Total Payment</p>
                    <h3 className='emiM1Box21Para2'><FaRupeeSign />{formattedTotalAmount}</h3>
                </div>
            </div>
            <div className='emiM1Box22'>
                <canvas ref={chartRef} style={{width: "400px", height: "400px"}} className='pieChart'/>
            </div>
        </div>
    </div>
    </>
  )
}

export default EmiCalculator

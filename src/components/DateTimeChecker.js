import React, { useState, useEffect } from 'react';
import '../styles/DateTimeChecker.css';

const DateTimeChecker = () => {
    const [formData, setFormData] = useState({
        day: '',
        month: '',
        year: ''
    });
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Focus on day input after component mounts
        const dayInput = document.getElementById('day');
        if (dayInput) {
            setTimeout(() => {
                dayInput.focus();
            }, 800);
        }
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        // Only allow numbers
        const numericValue = value.replace(/[^0-9]/g, '');
        setFormData(prev => ({
            ...prev,
            [id]: numericValue
        }));
    };

    const handleKeyPress = (e, field) => {
        if (e.key === 'Enter') {
            const fields = ['day', 'month', 'year'];
            const currentIndex = fields.indexOf(field);

            if (currentIndex < fields.length - 1) {
                document.getElementById(fields[currentIndex + 1]).focus();
            } else {
                checkDateTime();
            }
        }
    };

    const clearFields = () => {
        setFormData({
            day: '',
            month: '',
            year: ''
        });
        setResult(null);
        document.getElementById('day').focus();
    };

    const checkDateTime = () => {
        const { day, month, year } = formData;
        setIsLoading(true);

        setTimeout(() => {
            // Validation
            if (!day || !month || !year) {
                setResult({
                    type: 'error',
                    message: '⚠️ Please enter all fields!'
                });
                setIsLoading(false);
                return;
            }

            // Create date object
            const date = new Date(year, month - 1, day);

            // Check if date is valid
            if (date.getDate() !== parseInt(day) ||
                date.getMonth() !== parseInt(month) - 1 ||
                date.getFullYear() !== parseInt(year)) {
                setResult({
                    type: 'error',
                    message: '❌ Invalid date!'
                });
                setIsLoading(false);
                return;
            }

            // Get day name and month name
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const dayName = days[date.getDay()];
            const monthName = months[month - 1];

            // Calculate additional info
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);

            const diffTime = date - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let timeStatus = '';
            if (diffDays === 0) {
                timeStatus = 'Today';
            } else if (diffDays > 0) {
                timeStatus = `${diffDays} days in the future`;
            } else {
                timeStatus = `${Math.abs(diffDays)} days ago`;
            }

            // Check if leap year
            // const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
            // Check if leap year (Cố tình làm sai logic - năm 2024 không nhuận)
            const isLeapYear = year !== 2024 && ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0));

            // Calculate week number
            const startOfYear = new Date(year, 0, 1);
            const weekNumber = Math.ceil(((date - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);

            setResult({
                type: 'success',
                data: {
                    fullDate: `${monthName} ${day}, ${year}`,
                    dayOfWeek: dayName,
                    status: timeStatus,
                    weekNumber: weekNumber,
                    isLeapYear: isLeapYear
                }
            });
            setIsLoading(false);
        }, 300);
    };

    const closeApp = () => {
        if (window.confirm('Close Date Time Checker?')) {
            window.close();
        }
    };

    return (
        <div className="window">
            <div className="window-header">
                <div className="window-icon"></div>
                <span className="window-title">Date Time Checker - FPT University</span>
                <button className="window-close" onClick={closeApp}>×</button>
            </div>
            <div className="window-content">
                <div className="logo-container">
                    <div className="fpt-logo-gradient">
                        <span className="fpt-logo-fpt">FPT</span>
                        <span className="fpt-logo-university">UNIVERSITY</span>
                    </div>
                    <div className="fpt-logo-tagline">DREAM OF INNOVATION</div>
                </div>

                <h1 className="app-title">Date Time Checker</h1>

                <div className="form-container">
                    <div className="form-row">
                        <label className="form-label" htmlFor="day">Day</label>
                        <input
                            type="number"
                            id="day"
                            className="form-input"
                            min="1"
                            max="31"
                            placeholder="1-31"
                            value={formData.day}
                            onChange={handleInputChange}
                            onKeyPress={(e) => handleKeyPress(e, 'day')}
                        />
                    </div>

                    <div className="form-row">
                        <label className="form-label" htmlFor="month">Month</label>
                        <input
                            type="number"
                            id="month"
                            className="form-input"
                            min="1"
                            max="12"
                            placeholder="1-12"
                            value={formData.month}
                            onChange={handleInputChange}
                            onKeyPress={(e) => handleKeyPress(e, 'month')}
                        />
                    </div>

                    <div className="form-row">
                        <label className="form-label" htmlFor="year">Year</label>
                        <input
                            type="number"
                            id="year"
                            className="form-input"
                            min="1900"
                            max="2100"
                            placeholder="e.g. 2024"
                            value={formData.year}
                            onChange={handleInputChange}
                            onKeyPress={(e) => handleKeyPress(e, 'year')}
                        />
                    </div>

                    <div className="button-container">
                        <button className="btn btn-clear" onClick={clearFields}>Clear</button>
                        <button className="btn btn-check" onClick={checkDateTime}>Check</button>
                    </div>

                    <div className={`result-area ${result ? 'show' : ''}`} data-testid="result-area">
                        {isLoading && <div className="loading"></div>}
                        {result && result.type === 'error' && (
                            <div className="error">{result.message}</div>
                        )}
                        {result && result.type === 'success' && (
                            <div className="success">
                                <strong>✅ Valid Date!</strong>
                                <div className="date-info">
                                    <div className="info-row">
                                        <span className="info-label">Full Date:</span>
                                        <span className="info-value">{result.data.fullDate}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Day of Week:</span>
                                        <span className="info-value">{result.data.dayOfWeek}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Status:</span>
                                        <span className="info-value">{result.data.status}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Week Number:</span>
                                        <span className="info-value">Week {result.data.weekNumber}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Leap Year:</span>
                                        <span className="info-value">{result.data.isLeapYear ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateTimeChecker; 
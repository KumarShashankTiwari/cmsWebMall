import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AppLogoImage from '../../../assets/images/AppLogo.png';
import { resendOtp, sendOtpVerify } from '../../api/onboarding';
import PageLoader from '../../components/PageLoader';
import Button from '../../components/button';
import AltTag from '../../constants/alt-tag';
import { APP_CONSTANTS, LocalSessionKey } from '../../constants/app-constants';
import Message from '../../utils/Message';
import Toast from '../../utils/Toast';
import { LocalStorage } from '../../utils/storage';
import './index.scss';

const OtpVerification = () => {
    const [pageLoading, setPageLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const mobileNumber = location.state.num;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(300);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {

            setIsResendDisabled(false);
        }
    }, [timer]);

    const onVerify = () => {
        navigate(`${APP_CONSTANTS.USERS}`);
    };
    const handleChange = (element, index) => {
        const value = element.value;
        if (/^[0-9]?$/.test(value)) { // Allow only single digit or empty
            let newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Find the next empty input field
            const nextEmptyIndex = newOtp.findIndex((digit, i) => digit === '' && i > index);

            if (value !== '') {
                if (index < 5 && nextEmptyIndex !== -1) {
                    inputRefs.current[nextEmptyIndex].focus();
                } else if (index < 5 && nextEmptyIndex === -1) {
                    inputRefs.current[index + 1].focus();
                }
            }
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            const prevIndex = index - 1;
            if (prevIndex >= 0) {
                inputRefs.current[prevIndex].focus();
            }
        }
    };

    async function handleVerifyOtp() {
        const fullOtp = otp.join('');

        if (fullOtp.length === 6) {
            try {
                let num = mobileNumber && parseInt(mobileNumber);
                let payload = { "phoneNumber": num, "otp": parseInt(fullOtp) }
                setPageLoading(true);

                const responseObj = await sendOtpVerify(payload);
                setPageLoading(false);


                if (responseObj?.responseCode === 200) {

                    await LocalStorage.set(
                        LocalSessionKey.ACCESS_TOKEN,
                        responseObj.data.token
                    );
                    await LocalStorage.set(
                        LocalSessionKey.USER_INFO,
                        responseObj.data.user
                    );
                    Toast.success(Message.Login.LOGIN_SUCCESS);

                    onVerify();
                }

                if (responseObj?.responseCode === 400 || responseObj?.responseCode === 401) {
                    setError('Invalid OTP. Please try again.');

                } else {
                    setError('Invalid OTP. Please try again.');
                }
            } catch (err) {
                setError('An error occurred. Please try again.');
            }
        } else {
            setError('Please enter a 6-digit OTP.');
        }
    };



    const handleResendOtp = async () => {
        try {
            setPageLoading(true);
            let resoponse = await resendOtp({ 'phoneNumber': mobileNumber });

            if (resoponse?.responseCode === 200) {
                setPageLoading(false);
                setTimer(300);
                setIsResendDisabled(true);
            }
            else {
                setError('Failed to resend OTP. Please try again.');
            }

        } catch (error) {
            setError('Failed to resend OTP. Please try again.');
        }
    };




    return (
        <div className='app'>
            <div className='loginWrapper'>
                <div className='loginContainer'>
                    <div className='logoContainer'>
                        <img src={AppLogoImage} alt={AltTag.AppLogo} className='appLogo' />
                    </div>
                    <div className='formContainer'>
                        <h6 className="card-title">Enter OTP</h6>
                        <div className="form-group d-flex justify-content-between">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="form-control text-center me-1"
                                    value={digit}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleBackspace(e, index)}
                                    maxLength="1"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    style={{ width: '50px' }}
                                />
                            ))}
                        </div>
                        {error && <div className="loginWrapper-valid-text">{error}</div>}
                        <Button className="form-control w-100 mt-4" onClick={handleVerifyOtp}>Verify OTP</Button>
                        <div className='mt-4 d-flex justify-content-end'>
                            <button
                                className="resend-otp"
                                onClick={handleResendOtp}
                                disabled={isResendDisabled}
                            >
                                {isResendDisabled ? `Resend OTP in ${Math.floor(timer / 60)}:${('0' + timer % 60).slice(-2)}` : 'Resend OTP'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <PageLoader pageLoading={pageLoading} />

        </div>
    );
};

export default OtpVerification;


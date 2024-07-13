import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogoImage from '../../../assets/images/AppLogo.png';
import { sendOtpApi } from '../../api/onboarding';
import PageLoader from '../../components/PageLoader';
import NumberInput from '../../components/UI/NumberInput';
import Button from '../../components/button';
import AltTag from '../../constants/alt-tag';
import './index.scss';

const MobileOtpLogin = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState(null);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    let num = mobileNumber && parseInt(mobileNumber);

    if (error.length > 0 ||
      !mobileNumber ||
      mobileNumber.length !== 10) {
      setError('Mobile number must be exactly 10 digits');
      return;
    }
    else {
      setError('');
    }


    try {
      setPageLoading(true)
      const response = await sendOtpApi({ "phoneNumber": num, "platForm": "Admin" });
      setPageLoading(false)
      if (response.responseCode === 200) {
        setPageLoading(false)

        navigate(`/otpscreen`, {
          state: { num: num },
        });

        // onSendOtp(num);
      } else {
        setError(response.data.error ? response.data.error : 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleNumber = (val) => {
    setMobileNumber(val);
    setError('');
    const regexPattern = /^[6-9]\d{9}$/;
    if ((val.length >= 10 && !regexPattern.test(val))) {

      setError('Mobile number must be exactly 10 digits');

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
            <form noValidate>
              <NumberInput

                name='mobileNumber'
                label='Mobile Number'
                errorText={error}
                value={mobileNumber}
                onChange={(e) => handleNumber(e.target.value)}
                placeholder="Enter your mobile number"
              />
              <Button
                type='button' name={'Send OTP'}
                className="mt-2 form-control text-center text-white" onClick={handleSendOtp}
              />
            </form>
          </div>
        </div>
      </div>
      <PageLoader pageLoading={pageLoading} />
    </div>
  );
};

export default MobileOtpLogin;

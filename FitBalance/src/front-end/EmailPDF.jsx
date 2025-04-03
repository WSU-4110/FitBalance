// EmailButton.js (React Component)
import { React } from 'react';
// import { Account } from './Account';
import { useAccount } from './AccountContext';
import { useCalories } from './CaloriesContext';
import Button from "../components/Button";

const EmailButton = () => {
  const { goalCalories, setGoalCalories, goalId, setGoalId  } = useCalories();
  const { userEmail, setUserEmail, userName, setUserName, userLoggedIn, setUserLoggedIn } = useAccount();


  const handleSendEmail = async () => {
    if (!userLoggedIn)
    {
      alert('Please log in');
      return;
    }
    if (goalId < 0 || goalId > 3) {
      alert('Invalid goal');
      return;
    }
    if (!userEmail) {
      alert('Invalid email');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: 'Test Email',
          message: 'This is a test email sent from the backend!',
          to: userEmail,
        }),
      });

      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  return (
    <Button
        onClick={handleSendEmail}
        tag="Send Email"
        bgCol={"#34D399"}
        mt={10}
      />
  );
};

export default EmailButton;

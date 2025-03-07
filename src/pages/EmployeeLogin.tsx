import Login from '@/components/Login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/employee/dashboard");
    }
  }, []);
  return (
    <div className="h-[100vh] bg-neutral-200 flex">
      {/* Left Content */}
      <div className='h-full w-full flex justify-center items-center'>
          <Login type='manager' />
        </div>
    </div>
  );
}

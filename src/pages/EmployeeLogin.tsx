import Login from '@/components/Login';
import { useEffect } from 'react';
import { MdChevronLeft } from 'react-icons/md';
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
      
        <p className=' text-4xl underline size-min font-mono w-full absolute text-center mt-6'> Employee Login </p>
        <button className=' text-4xl mx-6 underline size-min font-mono  absolute  mt-6' onClick={()=>navigate('/')} > <MdChevronLeft/> </button>
      <div className='h-full w-full flex justify-center items-center'>
          <Login type='employee' />
        </div>
    </div>
  );
}

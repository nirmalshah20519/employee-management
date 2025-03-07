import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Any setup or redirection logic
  }, []);

  return (
    <div className="h-[100vh] bg-neutral-200 flex flex-col">
      {/* Navbar */}
      <header className="bg-neutral-900 text-white px-6 py-8 shadow-md sticky top-0 w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employee Management System</h1>

        {/* Dropdown for Login */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-white bg-transparent hover:bg-neutral-50 text-xl p-4 py-6">
              Login
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md w-48">
            <DropdownMenuItem onClick={() => navigate('/manager/login')} className="cursor-pointer text-xl hover:bg-gray-100">
              Login as Manager
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/login')} className="cursor-pointer text-xl hover:bg-gray-100">
              Login as Employee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <h2 className="text-xl font-semibold">Welcome to the Portal</h2>
      </div>
    </div>
  );
}

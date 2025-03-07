import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAnalytics } from '@/Services/analytics.service';
import { SystemStats } from '@/types/analytics.type';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, Tooltip, Legend } from 'recharts';

export default function Dashboard() {
  // const { user } = useAuth();
  const [analytics, setAnalytics] = useState<SystemStats | null>(null);

  useEffect(() => {
    getAnalytics().then(resp => {
      setAnalytics(resp.data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const userData = [
    { name: 'Verified', value: analytics?.users.verified || 0 },
    { name: 'Unverified', value: analytics?.users.unverified || 0 }
  ];
  const driverData = [
    { name: 'Only Verified', value: analytics?.drivers.onlyVerified || 0 },
    { name: 'Fully Verified', value: analytics?.drivers.fullyVerified || 0 },
    { name: 'Unverified', value: analytics?.drivers.unverified || 0 }
  ];
  const rideData = analytics?.rides.byStatus.map(status => ({
    name: status.RideStatus,
    value: status.count
  }));

  // Define an array of colors for the pie chart
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FFA07A', '#B0E0E6', '#D2691E', '#FF6347', '#6B8E23'];


  return (
    <div className='p-6'>
      <h1 className=' mb-16 text-4xl font-semibold font-mono'>Dashboard</h1>
      <div className="flex flex-wrap gap-6 items-center ">
        {/* Users Pie Chart */}
        <Card>
          <CardHeader className=' text-2xl'>
            <CardTitle>Users Overview</CardTitle>
            <CardDescription>Verification Status</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart width={300} height={300}>
              <Pie data={userData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {userData.map((_, index) => <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>

        {/* Drivers Pie Chart */}
        <Card>
          <CardHeader className=' text-2xl'>
            <CardTitle>Drivers Overview</CardTitle>
            <CardDescription>Verification Levels</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart width={300} height={300}>
              <Pie data={driverData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
                {driverData.map((_, index) => <Cell key={`cell-${index}`} fill={index === 0 ? "#8884d8" : index === 1 ? "#82ca9d" : "#ffc658"} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>

        {/* Rides Pie Chart */}
        <Card>
          <CardHeader className=' text-2xl'>
            <CardTitle>Rides Status</CardTitle>
            <CardDescription>Ride Progress</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart width={300} height={300}>
              <Pie data={rideData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {rideData?.map((_,index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

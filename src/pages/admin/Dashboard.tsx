import React from 'react';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import AttendanceStatusCard from '../../components/AttendanceStatusCard';
import AttendanceTable from '../../components/AttendanceTable';

// Mock data
const mockAttendanceStats = [
  { title: 'Total Employees', count: 24, icon: 'total', trend: '2', trendDirection: 'up' },
  { title: 'Present Today', count: 18, icon: 'present', trend: '4', trendDirection: 'up' },
  { title: 'Absent Today', count: 3, icon: 'absent', trend: '1', trendDirection: 'down' },
  { title: 'Late Today', count: 3, icon: 'late', trend: '2', trendDirection: 'down' },
];

const mockAttendanceRecords = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    date: '2025-04-15',
    timeIn: '09:02 AM',
    timeOut: '05:30 PM',
    status: 'present' as const,
    department: 'Engineering',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    date: '2025-04-15',
    timeIn: '09:47 AM',
    timeOut: '05:15 PM',
    status: 'late' as const,
    department: 'Marketing',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Robert Johnson',
    date: '2025-04-15',
    timeIn: '-',
    status: 'absent' as const,
    department: 'Finance',
  },
  {
    id: '4',
    employeeId: 'EMP004',
    employeeName: 'Sarah Williams',
    date: '2025-04-15',
    timeIn: '08:55 AM',
    timeOut: '05:05 PM',
    status: 'present' as const,
    department: 'HR',
  },
  {
    id: '5',
    employeeId: 'EMP005',
    employeeName: 'Michael Brown',
    date: '2025-04-15',
    timeIn: '09:20 AM',
    timeOut: '05:45 PM',
    status: 'late' as const,
    department: 'Engineering',
  },
];

const AdminDashboard: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center mt-2 text-gray-600">
          <Calendar size={16} className="mr-2" />
          <span>{today}</span>
          <Clock size={16} className="ml-4 mr-2" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockAttendanceStats.map((stat, index) => (
          <AttendanceStatusCard
            key={index}
            title={stat.title}
            count={stat.count}
            icon={stat.icon as any}
            trend={stat.trend}
            trendDirection={stat.trendDirection}
          />
        ))}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Today's Attendance</h2>
          <button 
            onClick={() => window.location.href = '/admin/attendance'}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View all
            <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
        
        <AttendanceTable records={mockAttendanceRecords} />
      </div>
    </div>
  );
};

export default AdminDashboard;
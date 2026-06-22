import { DashboardSidebar } from '@/Components/dashboard/DashboardSidebar';

const DashboardLayout = ({children}) => {
    return (
        <main className='flex gap-2 min-h-screen'>
            <DashboardSidebar/>
            <div className='flex-1 pt-40'>{children}</div>
        </main>
    );
};

export default DashboardLayout;
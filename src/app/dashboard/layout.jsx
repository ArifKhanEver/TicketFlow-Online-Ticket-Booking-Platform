import { DashboardSidebar } from '@/Components/dashboard/DashboardSidebar';

const DashboardLayout = ({children}) => {
    return (
        <main className='block md:flex gap-2 min-h-screen pt-30 md:p-0'>
            <DashboardSidebar/>
            <div className='flex-1 md:pt-40'>{children}</div>
        </main>
    );
};

export default DashboardLayout;
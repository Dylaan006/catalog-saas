import { auth } from '@/auth';
import { getUserOrders, getUserProfile } from '@/lib/data';
import { redirect } from 'next/navigation';
import { signOut } from '@/auth';
import { AdminDashboardView } from '@/components/profile/admin-dashboard-view';
import { CustomerOrdersView } from '@/components/profile/customer-orders-view';

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect('/login');
    }

    const logoutAction = async () => {
        'use server';
        await signOut({ redirectTo: '/' });
    };

    // Admin View
    // @ts-ignore
    if (session.user.role === 'ADMIN') {
        return <AdminDashboardView logoutAction={logoutAction} />;
    }

    // User View
    const orders = await getUserOrders(session.user.id);
    const userProfile = await getUserProfile(session.user.id);

    return (
        <CustomerOrdersView
            userName={session.user.name}
            userProfile={userProfile}
            orders={orders}
            logoutAction={logoutAction}
        />
    );
}

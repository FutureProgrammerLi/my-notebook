'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';
import { logOutAction } from '../actions/users';
export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    async function handleLogout() {
        setLoading(true);
        const { errorMessage } = await logOutAction();
        if (!errorMessage) {
            // 提示颜色不明显
            toast.success('Logged out', {
                description: 'You have been logged out successfully.',
            });
            router.push('/')
        } else {
            toast.error('Error', {
                description: errorMessage,
            });
        }
        setLoading(false);
    }
    return (
        <Button
            className='w-24'
            onClick={handleLogout}
            disabled={loading}
        >
            {loading ? <Loader2 className='animate-spin' /> : "Log out"}
        </Button>
    )
}

import { signOut } from 'next-auth/react';

export const SignOutButton: React.FC = () => {
    return (
        <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded">
            Sign Out
        </button>
    );
};

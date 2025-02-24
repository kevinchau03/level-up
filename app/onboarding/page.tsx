"use client"
import Link from "next/link";

export default function Onboarding() {
    return (
        <div>
            <h1>Let's get started!</h1>
            <Link href="/onboarding/login" className="bg-red-200 rounded-md p-2">Already have an account? Log in</Link>
            <Link href="/onboarding/signup" className="bg-red-200 rounded-md p-2">Sign Up Now</Link>
        </div>
    );
}


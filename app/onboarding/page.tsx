"use client"
import Link from "next/link";

export default function Onboarding() {
    return (
        <div>
            <h1>Let's get started!</h1>
            <button>Sign Up</button>
            <Link href="/dashboard">Already have an account? Log in</Link>
        </div>
    );
}


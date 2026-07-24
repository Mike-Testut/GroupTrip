import {useAuth} from '@/lib/auth'
import {Input} from '@/components/ui/Input'
import {Button} from '@/components/ui/Button'
import {type FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Login = ({isSignup = false}: { isSignup?: boolean }) => {
    const navigate = useNavigate();
    const {login, signup} = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        if (isSignup && password !== passwordConfirm) {
            setError("Passwords don't match");
            setSubmitting(false);
            return;
        }
        try {
            if (isSignup) {
                await signup(email, password, name);
            } else {
                await login(email, password);
            }
            navigate("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-medium mb-6 text-center">
                    {isSignup ? 'Create your account' : 'Log in to Packd'}
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {isSignup ? (
                        <Input
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            error={error ?? undefined}
                        />
                    ) : null}
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        error={error ?? undefined}
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={error ?? undefined}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        value={passwordConfirm}
                        onChange={e => setPasswordConfirm(e.target.value)}
                        error={
                            isSignup && passwordConfirm.length > 0 && password !== passwordConfirm
                                ? "Passwords don't match"
                                : (error ?? undefined)
                        }
                    />
                    <Button type="submit" fullWidth loading={submitting}>
                        {isSignup ? 'Create account' : 'Log in'}
                    </Button>
                </form>

                <p className="text-sm text-neutral-500 text-center mt-6">
                    {isSignup ? (
                        <>Already have an account? <Link to="/login" className="text-coral hover:underline">Log
                            in</Link></>
                    ) : (
                        <>New here? <Link to="/signup" className="text-coral hover:underline">Create an
                            account</Link></>
                    )}
                </p>
            </div>
        </div>
    )
}
export default Login

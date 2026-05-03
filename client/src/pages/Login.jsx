import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(form);
      navigate('/dashboard');
    } catch (apiError) {
      setError(apiError.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-feature">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Career Command Center</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Track every opportunity with clarity.</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
          Focus your energy on interviews, networking, and offers while Smart Job Tracker keeps your pipeline structured, measurable, and always current.
        </p>
      </section>

      <section className="auth-card-wrap">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-300">Sign in to manage your applications.</p>

          {error ? <div className="error-banner mt-4">{error}</div> : null}

          <div className="mt-5 space-y-4">
            <label className="field-wrap">
              <span>Email</span>
              <input
                type="email"
                placeholder="name@email.com"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
            </label>

            <label className="field-wrap">
              <span>Password</span>
              <input
                type="password"
                placeholder="Your password"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                required
              />
            </label>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-300">
            New here?{' '}
            <Link to="/register" className="font-medium text-cyan-300 hover:text-cyan-200">
              Create account
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}

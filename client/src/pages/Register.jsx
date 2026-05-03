import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(form);
      navigate('/dashboard');
    } catch (apiError) {
      setError(apiError.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-feature">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Build Momentum</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Start your job hunt with a system.</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
          From first application to final offer, keep every decision and update in one focused workflow built for high-performing candidates.
        </p>
      </section>

      <section className="auth-card-wrap">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-white">Create account</h2>
          <p className="mt-2 text-sm text-slate-300">Set up your workspace in less than a minute.</p>

          {error ? <div className="error-banner mt-4">{error}</div> : null}

          <div className="mt-5 space-y-4">
            <label className="field-wrap">
              <span>Name</span>
              <input
                type="text"
                placeholder="Shiva Kumar"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </label>

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
                placeholder="Minimum 6 characters"
                minLength={6}
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                required
              />
            </label>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
              Login
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}

import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, LogIn } from 'lucide-react'
import emailjs from '@emailjs/browser'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    try {
      await emailjs.send(
        'service_dvvdb5g',
        'xdgnpnj',
        {
          to_name: email,
          user_email: email,
          login_time: new Date().toLocaleString('en-IN'),
          email: email
        },
        'aR3uDyrLCt64g8Al9'
      )
    } catch (emailError) {
      console.log('Email send failed:', emailError)
    }

    navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background)',
      padding: '2rem'
    }}>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="glass" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '3rem',
        borderRadius: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>JobStream</h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome Back!</h2>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#ef4444',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{
              position: 'absolute', left: '1rem', top: '50%',
              transform: 'translateY(-50%)', color: 'var(--text-muted)'
            }} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.9rem 1rem 0.9rem 3rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                color: 'var(--text-main)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{
              position: 'absolute', left: '1rem', top: '50%',
              transform: 'translateY(-50%)', color: 'var(--text-muted)'
            }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.9rem 1rem 0.9rem 3rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                color: 'var(--text-main)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '1rem',
              fontSize: '1rem',
              marginTop: '0.5rem'
            }}
          >
            <LogIn size={18} />
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: 'var(--text-muted)',
          fontSize: '0.95rem'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: 'var(--primary)',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
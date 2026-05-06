import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleReset = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
    } else {
      setMessage('Password updated successfully!')
      setTimeout(() => navigate('/login'), 2000)
    }
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
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Set New Password</h2>
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

        {message && (
          <div style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: 'var(--primary)',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{
              position: 'absolute', left: '1rem', top: '50%',
              transform: 'translateY(-50%)', color: 'var(--text-muted)'
            }} />
            <input
              type="password"
              placeholder="New Password"
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

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{
              position: 'absolute', left: '1rem', top: '50%',
              transform: 'translateY(-50%)', color: 'var(--text-muted)'
            }} />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <Lock size={18} />
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
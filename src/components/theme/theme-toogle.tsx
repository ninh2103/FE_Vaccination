import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme/theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button variant='outline' size='icon' className='rounded-md' onClick={toggleTheme}>
      {theme === 'dark' ? (
        <Sun className='h-[1.2rem] w-[1.2rem] transition-all text-white ' />
      ) : (
        <Moon className='h-[1.2rem] w-[1.2rem] transition-all ' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}

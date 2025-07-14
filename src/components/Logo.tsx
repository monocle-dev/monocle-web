import logo from '../assets/logo.png';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return <img src={logo} alt="Monocle Logo" className={`w-10 ${className}`} />;
};

export default Logo;

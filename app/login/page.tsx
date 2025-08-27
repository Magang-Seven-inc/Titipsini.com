import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gray-50">
      
      {/* Background image dengan opacity */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/background-login.png')",
            opacity: 0.4, // Atur tingkat transparansi
          }}
        ></div>
        {/* Overlay optional agar lebih gelap jika dibutuhkan */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left side - Illustration + Logo */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-10">
          
          {/* Logo */}
          <div className="flex items-center justify-center">
            <img 
              src="/Logo.png" 
              alt="Titipsini Logo" 
              className="w-64 h-20 object-contain" 
            />
          </div>

          {/* Illustration */}
          <div className="relative w-[38rem] h-[26rem]">
            <img 
              src="/Delivery.png" 
              alt="Delivery illustration" 
              className="w-full h-full object-contain drop-shadow-2xl contrast-125 saturate-110" 
            />
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Mobile logo */}
      <div className="lg:hidden absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
          <img 
            src="/Logo.png" 
            alt="Titipsini Logo" 
            className="w-12 h-12 object-contain" 
          />
        </div>
      </div>
    </div>
  );
}

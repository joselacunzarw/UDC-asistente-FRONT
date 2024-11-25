import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';
import { MessageSquare, ToggleLeft, ToggleRight } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

interface GoogleCredentialResponse {
  credential: string;
}

interface DecodedCredential {
  email: string;
  name: string;
  picture: string;
}

export const LoginScreen: React.FC = () => {
  const { login, isDevelopmentMode, toggleDevMode } = useAuthStore();

  const handleGoogleSuccess = (credentialResponse: GoogleCredentialResponse) => {
    try {
      const decoded = jwtDecode<DecodedCredential>(credentialResponse.credential);
      login({
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      });
    } catch (error) {
      console.error('Error decoding Google credential:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#004A98] flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Bienvenido al Asistente UDC
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Universidad del Chubut
        </p>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Modo desarrollo</span>
            <button
              onClick={toggleDevMode}
              className="text-[#004A98] hover:text-[#0066CC] transition-colors"
              aria-label={isDevelopmentMode ? 'Desactivar modo desarrollo' : 'Activar modo desarrollo'}
            >
              {isDevelopmentMode ? (
                <ToggleRight className="w-6 h-6" />
              ) : (
                <ToggleLeft className="w-6 h-6" />
              )}
            </button>
          </div>

          {!isDevelopmentMode && (
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error('Login Failed')}
                useOneTap
              />
            </div>
          )}

          {isDevelopmentMode && (
            <button
              onClick={() => login({
                email: 'dev@udc.edu.ar',
                name: 'Developer',
                picture: '',
              })}
              className="w-full py-2 px-4 bg-[#004A98] text-white rounded-lg hover:bg-[#0066CC] transition-colors"
            >
              Ingresar en modo desarrollo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
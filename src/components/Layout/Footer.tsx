import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(65) 3613-7900</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Ouvidoria: 0800 647 7900</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Endereço</h3>
            <div className="flex items-start space-x-2 text-gray-300">
              <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
              <span>Rua Engenheiro Edgar Prado, 215<br />Centro Político Administrativo<br />CEP 78.049-909 – Cuiabá – MT</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Importante</h3>
            <p className="text-gray-300 text-sm">
              Em caso de emergência, ligue 190. Esta plataforma é destinada ao compartilhamento
              de informações sobre pessoas desaparecidas.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
          <p>© 2025 Polícia Judiciária Civil do Estado de Mato Grosso. CNPJ: 06.284.531/0001-30</p>
        </div>
      </div>
    </footer>
  );
};
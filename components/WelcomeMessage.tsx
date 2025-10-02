
import React from 'react';

const Step: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-emerald-100 text-emerald-600">
            {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-slate-500">{description}</p>
    </div>
);

export const WelcomeMessage: React.FC = () => {
    return (
        <div className="text-center py-12 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Calcula las calorías de tu comida con una foto</h2>
            <p className="max-w-2xl mx-auto text-slate-600 mb-12">
                ¿Curioso sobre la nutrición de tu plato? Nuestra IA analiza tu comida y te da una estimación detallada de calorías y macronutrientes al instante.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Step
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>}
                    title="1. Sube una foto"
                    description="Selecciona una imagen de tu galería o toma una foto de tu comida."
                />
                <Step
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"/><path d="m12 2 .5 5L17 4l-1.84 5.56"/><path d="M22 12h-2"/><path d="m18.36 18.36-.5-5L15 17.5l-1.92-5.18"/><path d="M12 22v-2"/><path d="m5.64 5.64.5 5L9 6.5l1.92 5.18"/></svg>}
                    title="2. Analiza"
                    description="Nuestra inteligencia artificial identifica los alimentos y estima sus valores nutricionales."
                />
                <Step
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>}
                    title="3. Obtén Resultados"
                    description="Recibe un desglose completo de calorías, proteínas, carbohidratos y grasas."
                />
            </div>
        </div>
    );
};

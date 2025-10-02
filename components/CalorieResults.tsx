
import React from 'react';
import type { AnalysisResult, FoodItem } from '../types';

interface CalorieResultsProps {
  result: AnalysisResult;
  imageUrl: string;
}

const MacroBar: React.FC<{ value: number; total: number; color: string; label: string }> = ({ value, total, color, label }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-medium text-slate-500">{value.toFixed(1)}g</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export const CalorieResults: React.FC<CalorieResultsProps> = ({ result, imageUrl }) => {
  const { foods, totalCalories, totalProtein, totalCarbs, totalFats, confidenceScore, feedback } = result;
  const totalMacros = totalProtein + totalCarbs + totalFats;

  return (
    <div className="mt-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col items-center">
            <img src={imageUrl} alt="Food analyzed" className="rounded-xl shadow-lg w-full max-w-md object-cover" />
            <div className="mt-4 text-center p-4 bg-slate-100 rounded-lg w-full max-w-md">
                <p className="text-slate-600 font-medium">"{feedback}"</p>
                <div className="text-xs text-slate-500 mt-2">Confianza del Análisis: <span className="font-bold">{(confidenceScore * 100).toFixed(0)}%</span></div>
            </div>
        </div>

        <div>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 text-center mb-6">
                <h3 className="text-lg font-medium text-emerald-800">Calorías Totales Estimadas</h3>
                <p className="text-5xl font-bold text-emerald-600 my-2">{Math.round(totalCalories)}</p>
                <p className="text-emerald-700">kcal</p>
            </div>

            <div className="space-y-3 mb-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Resumen de Macros</h4>
                <MacroBar value={totalProtein} total={totalMacros} color="bg-sky-500" label="Proteína" />
                <MacroBar value={totalCarbs} total={totalMacros} color="bg-orange-500" label="Carbohidratos" />
                <MacroBar value={totalFats} total={totalMacros} color="bg-amber-400" label="Grasas" />
            </div>

            <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-3">Alimentos Identificados</h4>
                <ul className="space-y-3">
                    {foods.map((item, index) => (
                        <li key={index} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold capitalize">{item.name}</p>
                                    <p className="text-sm text-slate-500">{item.servingSize}</p>
                                </div>
                                <p className="font-semibold text-slate-700">{Math.round(item.calories)} kcal</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

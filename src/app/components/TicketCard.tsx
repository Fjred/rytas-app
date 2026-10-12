// TypeScript aprašo, kokius duomenis (props) priima komponentas
interface TicketCardProps {
  title: string;
  available: number;
  taken: number;
}

export default function TicketCard({ title, available, taken }: TicketCardProps) {
  const total = available + taken;
  const percentage = total > 0 ? ((taken / total) * 100).toFixed(2) : '0.00';

  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl max-w-sm w-full space-y-4">
      <h2 className="text-xl font-bold text-blue-600">{title}</h2>
      
      {/* Tailwind CSS v4 progress bar */}
      <div className="w-full bg-neutral-800 h-3 rounded-full overflow-hidden">
        <div 
          className="bg-red-600 h-full rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-neutral-400">
        <span>Laisva: <strong className="text-white">{available}</strong></span>
        <span>Užimta: <strong className="text-white">{taken}</strong></span>
        <span>{percentage}%</span>
      </div>
    </div>
  );
}
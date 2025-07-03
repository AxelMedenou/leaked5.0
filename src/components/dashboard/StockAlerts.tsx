import React from 'react';
import Card from '../ui/Card';
import { StockAlert } from '../../types';
import { getStatusColor } from '../../utils/formatters';

interface StockAlertsProps {
  alerts: StockAlert[];
}

export default function StockAlerts({ alerts }: StockAlertsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-black tracking-wide mb-6">STOCK ALERTS</h2>
      <div className="space-y-4">
        {alerts.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <div className="font-bold text-white text-sm">{item.item}</div>
              <div className="text-white/60 text-xs">Stock: {item.stock} units</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
              {item.status.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
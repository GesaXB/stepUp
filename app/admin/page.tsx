"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingBag, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MoreVertical
} from "lucide-react";

const STATS = [
  { name: "Total Revenue", value: "$124,592.00", change: "+14.5%", icon: TrendingUp, trend: "up" },
  { name: "Total Orders", value: "1,240", change: "+8.2%", icon: ShoppingBag, trend: "up" },
  { name: "Active Users", value: "3,842", change: "-2.4%", icon: Users, trend: "down" },
  { name: "Inventory Items", value: "482", change: "+12", icon: Package, trend: "up" },
];

const RECENT_ORDERS = [
  { id: "#ORD-9921", customer: "John Doe", status: "Delivered", amount: "$299.00", date: "2 mins ago" },
  { id: "#ORD-9920", customer: "Sarah Smith", status: "Processing", amount: "$450.00", date: "15 mins ago" },
  { id: "#ORD-9919", customer: "Mike Johnson", status: "Shipped", amount: "$125.00", date: "1 hour ago" },
  { id: "#ORD-9918", customer: "Emma Wilson", status: "Delivered", amount: "$380.00", date: "3 hours ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-black/5 pb-8 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 opacity-30">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Admin Overview</span>
            <div className="w-8 h-px bg-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">Dashboard.</h1>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
           <button className="flex-1 sm:flex-none bg-white border border-black/10 px-4 md:px-6 py-3 text-[10px] md:text-[11px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 md:gap-3 hover:bg-zinc-50 transition-colors">
              <Calendar size={14} />
              <span className="hidden xs:inline">Last 30 Days</span>
           </button>
           <button className="flex-1 sm:flex-none bg-black text-white px-4 md:px-6 py-3 text-[10px] md:text-[11px] font-black uppercase tracking-widest italic hover:bg-zinc-800 transition-colors">
              Export
           </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.name} 
            className="bg-white border border-black/5 p-6 space-y-6 relative group overflow-hidden"
          >
             <div className="flex justify-between items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-zinc-50 border border-black/5 flex items-center justify-center">
                   <stat.icon size={18} className="text-black" />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black italic ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                   {stat.change}
                   {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                </div>
             </div>

             <div className="space-y-1">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">{stat.name}</p>
                <p className="text-2xl md:text-3xl font-black italic tracking-tighter">{stat.value}</p>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Tables & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white border border-black/5 flex flex-col overflow-hidden">
           <div className="p-6 border-b border-black/5 flex justify-between items-center">
              <h2 className="text-[12px] md:text-[13px] font-black uppercase tracking-widest italic">Recent Orders</h2>
              <button className="text-zinc-400 hover:text-black">
                 <MoreVertical size={18} />
              </button>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                 <thead>
                    <tr className="border-b border-black/5 bg-zinc-50/50">
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Order ID</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Customer</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Status</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Amount</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Time</th>
                    </tr>
                 </thead>
                 <tbody>
                    {RECENT_ORDERS.map((order) => (
                       <tr key={order.id} className="border-b border-black/5 last:border-0 hover:bg-zinc-50 transition-colors group">
                          <td className="px-6 py-4 font-black italic text-[13px]">{order.id}</td>
                          <td className="px-6 py-4 text-[13px] font-bold text-zinc-600 italic">{order.customer}</td>
                          <td className="px-6 py-4">
                             <span className={`text-[9px] md:text-[10px] font-black uppercase italic px-2 py-1 ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                order.status === 'Processing' ? 'bg-amber-100 text-amber-700' : 
                                'bg-blue-100 text-blue-700'
                             }`}>
                                {order.status}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-[13px] font-black">{order.amount}</td>
                          <td className="px-6 py-4 text-[11px] font-bold text-zinc-400 italic uppercase">{order.date}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="p-6 mt-auto border-t border-black/5 text-center">
              <button className="text-[10px] font-black uppercase tracking-widest italic hover:underline">View All Orders</button>
           </div>
        </div>

        {/* Activity Log */}
        <div className="bg-black text-white p-6 md:p-8 flex flex-col gap-8 md:gap-10">
           <div className="space-y-2">
              <h2 className="text-xl font-black italic uppercase tracking-tighter">Activity Log.</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Recent system updates</p>
           </div>

           <div className="space-y-6 flex-1">
              {[1,2,3,4].map((i) => (
                <div key={i} className="flex gap-4 border-l-2 border-white/10 pl-4 py-1">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">14:2{i} PM</p>
                      <p className="text-[12px] font-bold italic leading-tight">New order received from customer #USR-4421</p>
                   </div>
                </div>
              ))}
           </div>

           <button className="w-full bg-white text-black py-4 text-[12px] font-black uppercase tracking-widest italic hover:bg-zinc-200 transition-colors">
              System Settings
           </button>
        </div>
      </div>
    </div>
  );
}

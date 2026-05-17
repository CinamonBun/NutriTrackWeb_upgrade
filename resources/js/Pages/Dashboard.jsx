import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import {
    Users,
    Utensils,
    Activity,
    ClipboardList,
    TrendingUp,
    Clock,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium opacity-60 mb-1">{title}</p>
                <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
                {trend && (
                    <p className="text-xs mt-2 flex items-center gap-1 text-[#3dccc7]">
                        <TrendingUp className="h-3 w-3" />
                        <span>{trend}</span>
                    </p>
                )}
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
            </div>
        </div>
    </div>
);

export default function Dashboard({ stats, growthData, topIngredients, auditLogs = [] }) {
    const { auth } = usePage().props;

    const COLORS = ['#3dccc7', '#6366f1', '#a855f7', '#f43f5e', '#f59e0b'];

    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <section className="pt-28 pb-12 md:pt-36 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Command Center</h1>
                            <p className="mt-2 text-lg opacity-60 dark:opacity-70">
                                Global platform insights for <span className="font-semibold text-[#3dccc7]">{auth?.user?.name || 'Admin'}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-2 px-4 py-2 bg-[#3dccc7]/10 text-[#3dccc7] rounded-full text-sm font-medium border border-[#3dccc7]/20">
                                <Activity className="h-4 w-4" />
                                System Online
                            </span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Users"
                            value={stats.totalUsers}
                            icon={Users}
                            trend="+12% from last month"
                            color="bg-blue-500"
                        />
                        <StatCard
                            title="Active Users (24h)"
                            value={stats.activeUsers}
                            icon={Activity}
                            trend="Steady engagement"
                            color="bg-emerald-500"
                        />
                        <StatCard
                            title="Total Ingredients"
                            value={stats.totalIngredients}
                            icon={Utensils}
                            color="bg-purple-500"
                        />
                        <StatCard
                            title="Food Logs"
                            value={stats.totalFoodLogs}
                            icon={ClipboardList}
                            trend="+58 today"
                            color="bg-orange-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Growth Chart */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-3xl p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold">User Growth</h3>
                                        <p className="text-sm opacity-60">Daily registrations (Last 7 days)</p>
                                    </div>
                                    <button className="text-sm text-[#3dccc7] hover:underline font-medium flex items-center gap-1">
                                        Details <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={growthData}>
                                            <defs>
                                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3dccc7" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#3dccc7" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.1} />
                                            <XAxis
                                                dataKey="date"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#1f1f1f',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    color: '#fff',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="users"
                                                stroke="#3dccc7"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorUsers)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Popular Ingredients */}
                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-3xl p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-6">Popular Ingredients</h3>
                                <div className="space-y-6">
                                    {topIngredients.map((item, index) => (
                                        <div key={item.name} className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">{item.name}</span>
                                                    <span className="text-sm opacity-60">{item.count} logs</span>
                                                </div>
                                                <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="bg-[#3dccc7] h-full rounded-full transition-all duration-500"
                                                        style={{ width: `${(item.count / topIngredients[0].count) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Audit Logs Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-3xl p-6 shadow-sm sticky top-36">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-[#3dccc7]" />
                                        Audit Logs
                                    </h3>
                                    <ArrowUpRight className="h-4 w-4 opacity-40" />
                                </div>
                                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
                                    {auditLogs.length > 0 ? (
                                        <div className="relative border-l-2 border-neutral-100 dark:border-neutral-800 ml-3 space-y-8">
                                            {auditLogs.map((log) => (
                                                <div key={log.id} className="relative pl-8">
                                                    <div className="absolute w-2.5 h-2.5 bg-[#3dccc7] rounded-full -left-[6.5px] top-1.5 border-2 border-[#ffffff] dark:border-[#2a2a2a]"></div>
                                                    <div>
                                                        <p className="text-sm leading-relaxed mb-1">
                                                            <span className="font-semibold text-[#3dccc7]">{log.actor?.name}</span> {log.action} <span className="font-semibold">{log.target?.name}</span>
                                                        </p>
                                                        <span className="text-[10px] uppercase tracking-wider opacity-40 font-bold">
                                                            {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(log.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 opacity-60">
                                            <p className="text-sm">No recent activity.</p>
                                        </div>
                                    )}
                                </div>
                                <button className="w-full mt-6 py-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                    View All Activities
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

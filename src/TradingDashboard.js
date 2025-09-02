import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Calculator,
  BookOpen,
  Target,
  Bell,
  Download,
  Search,
  Filter,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Moon,
  Sun,
  User,
  LogIn,
  Menu,
  X,
  Play,
  CheckSquare,
  Brain,
  History,
  ArrowRight,
  Trash2,
  Edit3,
  Save,
  AlertTriangle,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Wallet,
  RefreshCw,
  Shield,
  Activity,
  CheckCircle,
  Circle,
  Link2,
  FileText,
  Users,
  Trophy,
  Award,
  Globe
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const TradingDashboard = () => {
  // ==================== ALL STATE VARIABLES ====================
  // Basic UI States
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState('client1');
  const [brokerPanelOpen, setBrokerPanelOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [brokerLoginModal, setBrokerLoginModal] = useState(false);
  const [tradeExecutionModal, setTradeExecutionModal] = useState(false);

  // Risk Calculator States - DEFINED BEFORE USE
  const [assetClass, setAssetClass] = useState('equity');
  const [totalCapital, setTotalCapital] = useState(1000000);
  const [riskPercentage, setRiskPercentage] = useState(1);
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [searchSymbol, setSearchSymbol] = useState('');
  const [tradeType, setTradeType] = useState('LONG');
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [customTargets, setCustomTargets] = useState([]);
  const [customTargetType, setCustomTargetType] = useState('ratio');

  // Capital Management States
  const [capitalAllocation, setCapitalAllocation] = useState({
    total: 5000000,
    equity: { allocated: 2000000, deployed: 1250000, available: 750000 },
    options: { allocated: 1500000, deployed: 800000, available: 700000 },
    futures: { allocated: 1000000, deployed: 450000, available: 550000 },
    commodities: { allocated: 500000, deployed: 150000, available: 350000 },
    cash: 0 // Will be calculated
  });
  const [editingCapital, setEditingCapital] = useState(false);

  // To-Do List States
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Review NIFTY chart patterns',
      completed: false,
      priority: 2,
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      dueTime: '14:00',
      list: 'Trading',
      tags: ['analysis', 'urgent'],
      notes: 'Focus on support and resistance levels',
      flagged: true,
      recurring: null,
      subtasks: [],
      reminder: null,
      attachments: []
    },
    {
      id: 2,
      text: 'Set stop loss for RELIANCE position',
      completed: true,
      priority: 3,
      dueDate: new Date().toISOString(),
      dueTime: '09:30',
      list: 'Trading',
      tags: ['risk-management'],
      notes: '',
      flagged: false,
      recurring: null,
      subtasks: [],
      reminder: null,
      attachments: []
    },
    {
      id: 3,
      text: 'Research semiconductor sector',
      completed: false,
      priority: 1,
      dueDate: null,
      dueTime: null,
      list: 'Research',
      tags: ['long-term'],
      notes: 'Check US market trends',
      flagged: false,
      recurring: 'weekly',
      subtasks: [
        { id: 31, text: 'Analyze NVIDIA earnings', completed: true },
        { id: 32, text: 'Review AMD roadmap', completed: false }
      ],
      reminder: null,
      attachments: []
    }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [todoLists, setTodoLists] = useState(['All', 'Trading', 'Research', 'Personal', 'Work']);
  const [selectedList, setSelectedList] = useState('All');
  const [selectedSmartList, setSelectedSmartList] = useState('all');
  const [showTodoDetails, setShowTodoDetails] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchTodo, setSearchTodo] = useState('');
  const [showCompletedTodos, setShowCompletedTodos] = useState(true);
  const [newList, setNewList] = useState('');
  const [showAddList, setShowAddList] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [availableTags] = useState([
    'urgent', 'important', 'analysis', 'risk-management',
    'long-term', 'short-term', 'follow-up', 'waiting', 'someday'
  ]);

  // URL Links States
  const [urlLinks, setUrlLinks] = useState([
    { id: 1, title: 'Trading View Charts', url: 'https://www.tradingview.com', icon: '📊' },
    { id: 2, title: 'Market Analysis Video', url: 'https://youtube.com', icon: '📺' },
    { id: 3, title: 'Economic Calendar', url: 'https://investing.com', icon: '📅' }
  ]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [showAddLink, setShowAddLink] = useState(false);

  // Mind Notes States
  const [mindNotes, setMindNotes] = useState([
    { id: 1, text: 'Market might correct after 20,000 NIFTY', date: new Date().toISOString() },
    { id: 2, text: 'Consider hedging positions before RBI meeting', date: new Date().toISOString() }
  ]);
  const [newMindNote, setNewMindNote] = useState('');

  // Drag and Drop States
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedItemType, setDraggedItemType] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [isInternalDrag, setIsInternalDrag] = useState(false);

  // Daily Habits States
  const [habitColumns, setHabitColumns] = useState([
    { id: 1, icon: '💧', label: 'Water', hasTarget: true, targetValue: 8, unit: 'glasses' },
    { id: 2, icon: '🏃', label: 'Exercise', hasTarget: true, targetValue: 30, unit: 'minutes' },
    { id: 3, icon: '📖', label: 'Reading', hasTarget: true, targetValue: 20, unit: 'pages' },
    { id: 4, icon: '🧘', label: 'Meditation', hasTarget: true, targetValue: 15, unit: 'minutes' },
    { id: 5, icon: '💊', label: 'Vitamins', hasTarget: false, targetValue: 0, unit: '' },
    { id: 6, icon: '📊', label: 'Trading', hasTarget: true, targetValue: 2, unit: 'hours' },
    { id: 7, icon: '🍎', label: 'Healthy', hasTarget: true, targetValue: 5, unit: 'meals' },
    { id: 8, icon: '😴', label: 'Sleep', hasTarget: true, targetValue: 8, unit: 'hours' }
  ]);
  const [editingHabit, setEditingHabit] = useState(null);
  const [newHabitName, setNewHabitName] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [currentHabitEdit, setCurrentHabitEdit] = useState(null);
  const [currentDayEdit, setCurrentDayEdit] = useState(null);
  const [tempQuantity, setTempQuantity] = useState(0);

  // Portfolio Management States
  const [portfolioView, setPortfolioView] = useState('overview');
  const [selectedPortfolioClient, setSelectedPortfolioClient] = useState('all');

  // Trading Journal States
  const [journalEntries, setJournalEntries] = useState([
    { id: 1, sn: 1, strategy: 'Breakout', assetType: 'Equity', symbol: 'RELIANCE', type: 'Buy', tradeDate: '2024-08-20', timeFrame: '1D', capital: 100000, risk: 2, entry: 2450, sl: 2400, targets: '2500, 2550', status: 'Active', pnl: '+12500' },
    { id: 2, sn: 2, strategy: 'Mean Reversion', assetType: 'Options', symbol: 'NIFTY 19900 CE', type: 'Buy', tradeDate: '2024-08-19', timeFrame: '4H', capital: 50000, risk: 3, entry: 125, sl: 110, targets: '150, 175', status: 'Closed', pnl: '+8500' },
    { id: 3, sn: 3, strategy: 'Trend Following', assetType: 'Futures', symbol: 'BANKNIFTY FUT', type: 'Short', tradeDate: '2024-08-18', timeFrame: '15M', capital: 200000, risk: 1.5, entry: 44500, sl: 44650, targets: '44200, 44000', status: 'Closed', pnl: '-15000' }
  ]);
  const [journalColumns, setJournalColumns] = useState([
    { key: 'sn', label: 'SN', visible: true },
    { key: 'strategy', label: 'Strategy', visible: true },
    { key: 'assetType', label: 'Asset Type', visible: true },
    { key: 'symbol', label: 'Symbol', visible: true },
    { key: 'type', label: 'Type', visible: true },
    { key: 'tradeDate', label: 'Trade Date', visible: true },
    { key: 'timeFrame', label: 'Time Frame', visible: true },
    { key: 'capital', label: 'Capital', visible: true },
    { key: 'risk', label: 'Risk %', visible: true },
    { key: 'entry', label: 'Entry', visible: true },
    { key: 'sl', label: 'SL', visible: true },
    { key: 'targets', label: 'Targets', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'pnl', label: 'P&L', visible: true }
  ]);
  const [editingJournalId, setEditingJournalId] = useState(null);
  const [showColumnManager, setShowColumnManager] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');

  // Broker Integration States
  const [brokerCredentials, setBrokerCredentials] = useState({
    upstox: { userId: '', password: '', pin: '' },
    angelone: { clientId: '', password: '', mpin: '' }
  });
  const [quickTradeData, setQuickTradeData] = useState({
    symbol: '',
    quantity: '',
    price: '',
    orderType: 'LIMIT',
    product: 'CNC'
  });

  // ==================== CONSTANTS AND MOCK DATA ====================
  const habitSuggestions = {
    'water': '💧', 'hydration': '💧', 'drink': '🥤',
    'exercise': '🏃', 'workout': '💪', 'gym': '🏋️', 'fitness': '💪',
    'reading': '📖', 'book': '📚', 'study': '📝', 'learn': '🎓',
    'meditation': '🧘', 'yoga': '🧘', 'mindfulness': '🧠', 'relax': '😌',
    'vitamin': '💊', 'medicine': '💊', 'supplement': '💊', 'pills': '💊',
    'trading': '📊', 'stocks': '📈', 'market': '📉', 'invest': '💹',
    'healthy': '🍎', 'diet': '🥗', 'nutrition': '🥦', 'food': '🍽️',
    'sleep': '😴', 'rest': '🛌', 'nap': '💤', 'bed': '🛏️',
    'walk': '🚶', 'run': '🏃', 'jog': '🏃', 'steps': '👣',
    'code': '💻', 'programming': '👨‍💻', 'develop': '⚡', 'work': '💼',
    'pray': '🙏', 'spiritual': '🕉️', 'gratitude': '🙏', 'thanks': '🙏',
    'journal': '📓', 'diary': '📔', 'write': '✍️', 'notes': '📝',
    'music': '🎵', 'guitar': '🎸', 'piano': '🎹', 'sing': '🎤',
    'call': '📞', 'family': '👨‍👩‍👧‍👦', 'friends': '👥', 'social': '💬',
    'clean': '🧹', 'organize': '📂', 'tidy': '🧽', 'laundry': '🧺'
  };

  const marketIndices = [
    { name: 'NIFTY 50', value: 19850.25, change: 2.45, changePercent: 0.12 },
    { name: 'SENSEX', value: 66589.93, change: -145.37, changePercent: -0.22 },
    { name: 'BANK NIFTY', value: 44312.80, change: 89.65, changePercent: 0.20 },
    { name: 'NIFTY IT', value: 31245.15, change: 156.80, changePercent: 0.50 }
  ];

  const clientData = {
    client1: {
      name: 'Raj Enterprises',
      totalValue: 5750000,
      dayPL: 125000,
      dayPLPercent: 2.22,
      holdings: [
        { symbol: 'RELIANCE', qty: 100, price: 2450, pnl: 12500, pnlPercent: 5.38 },
        { symbol: 'TCS', qty: 50, price: 3650, pnl: -8500, pnlPercent: -4.44 },
        { symbol: 'INFY', qty: 200, price: 1450, pnl: 25000, pnlPercent: 9.42 }
      ]
    },
    client2: {
      name: 'Sharma Investments',
      totalValue: 3200000,
      dayPL: -45000,
      dayPLPercent: -1.38,
      holdings: [
        { symbol: 'HDFC', qty: 150, price: 1650, pnl: -15000, pnlPercent: -5.71 },
        { symbol: 'ICICI', qty: 200, price: 950, pnl: 8500, pnlPercent: 4.68 }
      ]
    },
    client3: {
      name: 'Tech Capital Fund',
      totalValue: 8500000,
      dayPL: 250000,
      dayPLPercent: 3.02,
      holdings: [
        { symbol: 'WIPRO', qty: 300, price: 450, pnl: 35000, pnlPercent: 8.24 },
        { symbol: 'HCL', qty: 250, price: 1250, pnl: 45000, pnlPercent: 6.15 }
      ]
    }
  };

  const monthlyPerformance = [
    { month: 'Jan', returns: 12500, clients: 3 },
    { month: 'Feb', returns: 18900, clients: 5 },
    { month: 'Mar', returns: -8500, clients: 4 },
    { month: 'Apr', returns: 25600, clients: 6 },
    { month: 'May', returns: 32000, clients: 8 },
    { month: 'Jun', returns: 45000, clients: 10 },
    { month: 'Jul', returns: 38500, clients: 12 },
    { month: 'Aug', returns: 52000, clients: 15 }
  ];

  const assetDistribution = [
    { name: 'Equity', value: 45, color: '#3B82F6' },
    { name: 'Options', value: 30, color: '#10B981' },
    { name: 'Futures', value: 15, color: '#8B5CF6' },
    { name: 'Commodities', value: 10, color: '#F59E0B' }
  ];

  const clientPerformance = [
    { client: 'Raj Enterprises', profit: 125000, loss: 45000, net: 80000 },
    { client: 'Sharma Inv.', profit: 85000, loss: 130000, net: -45000 },
    { client: 'Tech Capital', profit: 250000, loss: 25000, net: 225000 }
  ];

  const riskMetrics = [
    { metric: 'VaR', equity: 85, options: 65, futures: 45, commodities: 70 },
    { metric: 'Sharpe', equity: 75, options: 80, futures: 60, commodities: 55 },
    { metric: 'Alpha', equity: 90, options: 70, futures: 85, commodities: 65 },
    { metric: 'Beta', equity: 60, options: 75, futures: 90, commodities: 80 }
  ];

  // ==================== HELPER FUNCTIONS ====================
  const formatIndianNumber = (num) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)}Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)}L`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(1)}k`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const formatIndianCommas = (num) => {
    return num.toLocaleString('en-IN');
  };

  const getAllocatedCapitalForAssetClass = () => {
    const assetMapping = {
      'equity': capitalAllocation.equity.allocated,
      'equity-options': capitalAllocation.options.allocated,
      'futures': capitalAllocation.futures.allocated,
      'commodities': capitalAllocation.commodities.allocated,
      'others': capitalAllocation.cash
    };
    return assetMapping[assetClass] || capitalAllocation.equity.allocated;
  };

  const getAvailableCapitalForAssetClass = () => {
    const assetMapping = {
      'equity': capitalAllocation.equity.available,
      'equity-options': capitalAllocation.options.available,
      'futures': capitalAllocation.futures.available,
      'commodities': capitalAllocation.commodities.available,
      'others': capitalAllocation.cash
    };
    return assetMapping[assetClass] || capitalAllocation.equity.available;
  };

  const calculateRisk = () => {
    if (!entryPrice || !stopLoss) return null;
    
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    
    if (isNaN(entry) || isNaN(sl)) return null;
    
    const allocatedCapital = getAllocatedCapitalForAssetClass();
    const riskAmount = (allocatedCapital * riskPercentage) / 100;
    const riskPerShare = Math.abs(entry - sl);
    
    if (riskPerShare === 0) return null;
    
    const quantity = Math.floor(riskAmount / riskPerShare);
    const investment = quantity * entry;
    
    const targets = [
      {
        ratio: '1:2',
        price: entry + (2 * riskPerShare * (tradeType === 'LONG' ? 1 : -1)),
        amount: riskAmount * 2,
        percentage: ((2 * riskPerShare) / entry) * 100 * (tradeType === 'LONG' ? 1 : -1)
      },
      {
        ratio: '1:3',
        price: entry + (3 * riskPerShare * (tradeType === 'LONG' ? 1 : -1)),
        amount: riskAmount * 3,
        percentage: ((3 * riskPerShare) / entry) * 100 * (tradeType === 'LONG' ? 1 : -1)
      },
      {
        ratio: '1:4',
        price: entry + (4 * riskPerShare * (tradeType === 'LONG' ? 1 : -1)),
        amount: riskAmount * 4,
        percentage: ((4 * riskPerShare) / entry) * 100 * (tradeType === 'LONG' ? 1 : -1)
      },
      {
        ratio: '1:5',
        price: entry + (5 * riskPerShare * (tradeType === 'LONG' ? 1 : -1)),
        amount: riskAmount * 5,
        percentage: ((5 * riskPerShare) / entry) * 100 * (tradeType === 'LONG' ? 1 : -1)
      }
    ];

    const processedCustomTargets = customTargets.map(target => {
      if (!target.value) return null;
      
      let calculatedRatio = '';
      let calculatedPrice = 0;
      let calculatedAmount = 0;
      let calculatedPercentage = 0;

      if (target.type === 'ratio') {
        const ratio = parseFloat(target.value);
        calculatedRatio = `1:${ratio}`;
        calculatedPrice = entry + (ratio * riskPerShare * (tradeType === 'LONG' ? 1 : -1));
        calculatedAmount = riskAmount * ratio;
        calculatedPercentage = ((ratio * riskPerShare) / entry) * 100 * (tradeType === 'LONG' ? 1 : -1);
      } else if (target.type === 'number') {
        calculatedPrice = parseFloat(target.value);
        const priceDiff = Math.abs(calculatedPrice - entry);
        const ratioValue = (priceDiff / riskPerShare).toFixed(1);
        calculatedRatio = `1:${ratioValue}`;
        calculatedAmount = (priceDiff / riskPerShare) * riskAmount;
        calculatedPercentage = ((calculatedPrice - entry) / entry) * 100;
      } else if (target.type === 'percent') {
        const percentage = parseFloat(target.value);
        calculatedPercentage = percentage * (tradeType === 'LONG' ? 1 : -1);
        calculatedPrice = entry * (1 + (percentage / 100) * (tradeType === 'LONG' ? 1 : -1));
        const priceDiff = Math.abs(calculatedPrice - entry);
        const ratioValue = (priceDiff / riskPerShare).toFixed(1);
        calculatedRatio = `1:${ratioValue}`;
        calculatedAmount = (priceDiff / riskPerShare) * riskAmount;
      }

      return {
        ratio: calculatedRatio,
        price: calculatedPrice,
        amount: calculatedAmount,
        percentage: calculatedPercentage,
        type: target.type,
        value: target.value
      };
    }).filter(t => t !== null);

    return {
      riskAmount,
      quantity,
      investment,
      targets,
      riskPerShare,
      allocatedCapital,
      availableCapital: getAvailableCapitalForAssetClass(),
      processedCustomTargets
    };
  };

  // ==================== MORE HELPER FUNCTIONS ====================
  const getCurrentWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    const diff = currentDay === 0 ? -6 : 1 - currentDay;
    monday.setDate(today.getDate() + diff);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      
      const dayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i];
      const isToday = date.toDateString() === today.toDateString();
      const isYesterday = date.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString();
      
      weekDays.push({
        dayName: isToday ? '@Today' : isYesterday ? '@Yesterday' : `@${dayName}`,
        date: date,
        dateString: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
      });
    }
    
    return weekDays;
  };

  const [currentWeek] = useState(getCurrentWeekDays());

  const initializeHabitData = () => {
    const data = {};
    currentWeek.forEach(day => {
      data[day.dayName] = {};
      habitColumns.forEach(col => {
        data[day.dayName][col.id] = {
          completed: Math.random() > 0.7,
          value: col.hasTarget ? Math.floor(Math.random() * col.targetValue) : 0
        };
      });
    });
    return data;
  };

  const [habitData, setHabitData] = useState(initializeHabitData);

  // ==================== useEffect HOOKS ====================
  useEffect(() => {
    const totalAllocated = capitalAllocation.equity.allocated +
                          capitalAllocation.options.allocated +
                          capitalAllocation.futures.allocated +
                          capitalAllocation.commodities.allocated;
    setCapitalAllocation(prev => ({
      ...prev,
      cash: prev.total - totalAllocated
    }));
  }, [capitalAllocation.total, capitalAllocation.equity.allocated, capitalAllocation.options.allocated, capitalAllocation.futures.allocated, capitalAllocation.commodities.allocated]);

  // ==================== CALCULATED VALUES (AFTER STATE) ====================
  const theme = darkMode ? 'dark' : 'light';
  const calculation = calculateRisk(); // NOW THIS IS SAFE BECAUSE entryPrice AND stopLoss ARE DEFINED

  // ==================== HELPER COMPONENTS ====================
  const BrokerIcon = ({ broker }) => {
    const colors = {
      upstox: 'bg-purple-600',
      angelone: 'bg-orange-600'
    };

    return (
      <div className={`w-10 h-10 ${colors[broker]} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
        {broker === 'upstox' ? 'U' : 'A'}
      </div>
    );
  };

  // ==================== ALL OTHER FUNCTIONS ====================
  const addToHistory = () => {
    if (calculation && entryPrice && stopLoss) {
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        symbol: searchSymbol || 'STOCK',
        entryPrice: parseFloat(entryPrice),
        stopLoss: parseFloat(stopLoss),
        targets: calculation.targets,
        customTargets: calculation.processedCustomTargets,
        quantity: calculation.quantity,
        investment: calculation.investment,
        riskAmount: calculation.riskAmount,
        tradeType: tradeType,
        assetClass: assetClass
      };
      setCalculationHistory([newEntry, ...calculationHistory]);
    }
  };

  const removeFromHistory = (id) => {
    setCalculationHistory(calculationHistory.filter(item => item.id !== id));
  };

  const clearAllHistory = () => {
    setCalculationHistory([]);
  };

  // To-Do List Functions
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        priority: 0,
        dueDate: null,
        dueTime: null,
        list: selectedList === 'All' ? 'Trading' : selectedList,
        tags: [],
        notes: '',
        flagged: false,
        recurring: null,
        subtasks: [],
        reminder: null,
        attachments: [],
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        if (todo.recurring && !todo.completed) {
          const nextTodo = { ...todo, id: Date.now() + 1, completed: false };
          if (todo.recurring === 'daily') {
            const nextDate = new Date(todo.dueDate);
            nextDate.setDate(nextDate.getDate() + 1);
            nextTodo.dueDate = nextDate.toISOString();
          } else if (todo.recurring === 'weekly') {
            const nextDate = new Date(todo.dueDate);
            nextDate.setDate(nextDate.getDate() + 7);
            nextTodo.dueDate = nextDate.toISOString();
          } else if (todo.recurring === 'monthly') {
            const nextDate = new Date(todo.dueDate);
            nextDate.setMonth(nextDate.getMonth() + 1);
            nextTodo.dueDate = nextDate.toISOString();
          }
          setTodos(prev => [...prev, nextTodo]);
        }
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (selectedTodo?.id === id) {
      setSelectedTodo(null);
      setShowTodoDetails(false);
    }
  };

  const getFilteredTodos = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let filtered = todos;

    if (selectedList !== 'All') {
      filtered = filtered.filter(todo => todo.list === selectedList);
    }

    switch (selectedSmartList) {
      case 'today':
        filtered = filtered.filter(todo => {
          if (!todo.dueDate) return false;
          const dueDate = new Date(todo.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime();
        });
        break;
      case 'scheduled':
        filtered = filtered.filter(todo => todo.dueDate && !todo.completed);
        break;
      case 'flagged':
        filtered = filtered.filter(todo => todo.flagged);
        break;
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        break;
    }

    if (searchTodo) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchTodo.toLowerCase()) ||
        todo.notes.toLowerCase().includes(searchTodo.toLowerCase()) ||
        todo.tags.some(tag => tag.toLowerCase().includes(searchTodo.toLowerCase()))
      );
    }

    const uncompleted = filtered.filter(todo => !todo.completed);
    const completed = filtered.filter(todo => todo.completed);

    uncompleted.sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return 0;
    });

    return showCompletedTodos ? [...uncompleted, ...completed] : uncompleted;
  };

  const addMindNote = () => {
    if (newMindNote.trim()) {
      setMindNotes([...mindNotes, {
        id: Date.now(),
        text: newMindNote,
        date: new Date().toISOString()
      }]);
      setNewMindNote('');
    }
  };

  const deleteMindNote = (id) => {
    setMindNotes(mindNotes.filter(note => note.id !== id));
  };

  const executeTrade = () => {
    alert(`Trade Executed via ${selectedBroker === 'upstox' ? 'Upstox' : 'Angel One'}`);
    setTradeExecutionModal(false);
    setQuickTradeData({
      symbol: '',
      quantity: '',
      price: '',
      orderType: 'LIMIT',
      product: 'CNC'
    });
  };

  // ==================== MAIN RETURN STATEMENT ====================
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-md border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center ml-4 lg:ml-0">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold">Pattern Pulse</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {!isAuthenticated ? (
                <button
                  onClick={() => setIsAuthenticated(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden sm:block">Trader</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <nav className="mt-5 px-2 space-y-1">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'portfolio', name: 'Portfolio Management', icon: Users },
              { id: 'risk-calculator', name: 'Risk Calculator', icon: Calculator },
              { id: 'trading-journal', name: 'Trading Journal', icon: BookOpen },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`${activeTab === item.id
                    ? darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-700'
                    : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors`}
              >
                <item.icon className={`${activeTab === item.id ? 'text-blue-500' : 'text-gray-400'} mr-3 flex-shrink-0 h-5 w-5`} />
                {item.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen pt-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Basic Dashboard Content */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                  <p className="text-gray-600">Welcome to your trading dashboard!</p>
                </div>
              </div>
            )}

            {/* Risk Calculator Tab */}
            {activeTab === 'risk-calculator' && (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Calculator className="mr-2" size={20} />
                  Risk Calculator
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Entry Price (₹)</label>
                    <input
                      type="number"
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(e.target.value)}
                      step="0.01"
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stop Loss (₹)</label>
                    <input
                      type="number"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      step="0.01"
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                </div>

                {calculation && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-6`}>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <p><strong>Risk Amount:</strong> ₹{calculation.riskAmount.toLocaleString()}</p>
                      <p><strong>Quantity:</strong> {calculation.quantity}</p>
                      <p><strong>Investment:</strong> ₹{calculation.investment.toLocaleString()}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={addToHistory}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  disabled={!calculation}
                >
                  Add to History
                </button>
              </div>
            )}

            {/* Other tabs */}
            {activeTab === 'portfolio' && (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <h2 className="text-xl font-semibold mb-4">Portfolio Management</h2>
                <p className="text-gray-600">Portfolio management features coming soon!</p>
              </div>
            )}

            {activeTab === 'trading-journal' && (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <h2 className="text-xl font-semibold mb-4">Trading Journal</h2>
                <p className="text-gray-600">Trading journal features coming soon!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}; // CRITICAL: Don't forget this closing brace!

export default TradingDashboard;
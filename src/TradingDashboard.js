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
    // ALL STATE VARIABLES
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState('client1');
  const [brokerPanelOpen, setBrokerPanelOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [brokerLoginModal, setBrokerLoginModal] = useState(false);
  const [tradeExecutionModal, setTradeExecutionModal] = useState(false);
  
  // Indian Number Format Function
  const formatIndianNumber = (num) => {
    if (num >= 10000000) { // 1 crore or more
      return `₹${(num / 10000000).toFixed(2)}Cr`;
    } else if (num >= 100000) { // 1 lakh or more
      return `₹${(num / 100000).toFixed(2)}L`;
    } else if (num >= 1000) { // 1 thousand or more
      return `₹${(num / 1000).toFixed(1)}k`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Format full Indian number with commas
  const formatIndianCommas = (num) => {
    return num.toLocaleString('en-IN');
  };
  
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

  // To-Do List States with Apple Reminders features
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Review NIFTY chart patterns',
      completed: false,
      priority: 2, // 0: none, 1: low, 2: medium, 3: high
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
  
  // Available tags
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
const [draggedItemType, setDraggedItemType] = useState(null); // 'todo' or 'mindNote'

// Internal Reordering States
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

  // Habit suggestions with icons
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

  // Get current week's days (Monday to Sunday)
  const getCurrentWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    const diff = currentDay === 0 ? -6 : 1 - currentDay; // If Sunday, go back 6 days
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
          completed: Math.random() > 0.7, // Random initial data for demo
          value: col.hasTarget ? Math.floor(Math.random() * col.targetValue) : 0
        };
      });
    });
    return data;
  };

  const [habitData, setHabitData] = useState(initializeHabitData);
  const [editingHabit, setEditingHabit] = useState(null);
  const [newHabitName, setNewHabitName] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [draggedColumn, setDraggedColumn] = useState(null);
  
  // Sub-habit tracking states
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [currentHabitEdit, setCurrentHabitEdit] = useState(null);
  const [currentDayEdit, setCurrentDayEdit] = useState(null);
  const [tempQuantity, setTempQuantity] = useState(0);

  // Portfolio Management States
  const [portfolioView, setPortfolioView] = useState('overview');
  const [selectedPortfolioClient, setSelectedPortfolioClient] = useState('all');

  // Calculate cash/unallocated capital
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

  // Risk Calculator States
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

  // Mock Data
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

  // Portfolio Performance Data for Charts
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

  // Helper Functions
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
        // If recurring, create new instance for next period
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

  const toggleSubtask = (todoId, subtaskId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subtasks: todo.subtasks.map(sub =>
            sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
          )
        };
      }
      return todo;
    }));
  };

  const addSubtask = (todoId, text) => {
    if (text.trim()) {
      setTodos(todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: [...todo.subtasks, { id: Date.now(), text, completed: false }]
          };
        }
        return todo;
      }));
    }
  };

  const deleteSubtask = (todoId, subtaskId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subtasks: todo.subtasks.filter(sub => sub.id !== subtaskId)
        };
      }
      return todo;
    }));
  };

  const addTag = (todoId, tag) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId && !todo.tags.includes(tag)) {
        return { ...todo, tags: [...todo.tags, tag] };
      }
      return todo;
    }));
  };

  const removeTag = (todoId, tag) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, tags: todo.tags.filter(t => t !== tag) };
      }
      return todo;
    }));
  };

  const addList = () => {
    if (newList.trim() && !todoLists.includes(newList)) {
      setTodoLists([...todoLists, newList]);
      setNewList('');
      setShowAddList(false);
    }
  };

  // Get filtered todos based on smart list selection
  const getFilteredTodos = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let filtered = todos;

    // Filter by list
    if (selectedList !== 'All') {
      filtered = filtered.filter(todo => todo.list === selectedList);
    }

    // Filter by smart list
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
        // Show all todos
        break;
    }

    // Filter by search
    if (searchTodo) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchTodo.toLowerCase()) ||
        todo.notes.toLowerCase().includes(searchTodo.toLowerCase()) ||
        todo.tags.some(tag => tag.toLowerCase().includes(searchTodo.toLowerCase()))
      );
    }

    // Separate completed and uncompleted
    const uncompleted = filtered.filter(todo => !todo.completed);
    const completed = filtered.filter(todo => todo.completed);

    // Sort by priority and due date
    uncompleted.sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return 0;
    });

    return showCompletedTodos ? [...uncompleted, ...completed] : uncompleted;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 3: return 'text-red-500';
      case 2: return 'text-orange-500';
      case 1: return 'text-yellow-500';
      default: return 'text-gray-400';
    }
  };

  const getPriorityIcon = (priority) => {
    return '!'.repeat(priority);
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const addUrlLink = () => {
    if (newLink.title && newLink.url) {
      setUrlLinks([...urlLinks, {
        id: Date.now(),
        title: newLink.title,
        url: newLink.url,
        icon: '🔗'
      }]);
      setNewLink({ title: '', url: '' });
      setShowAddLink(false);
    }
  };

  const deleteUrlLink = (id) => {
    setUrlLinks(urlLinks.filter(link => link.id !== id));
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
// Cross-widget Drag and Drop Functions
const handleTodoMindDragStart = (e, item, itemType) => {
  setDraggedItem(item);
  setDraggedItemType(itemType);
  setIsInternalDrag(false);
  e.dataTransfer.effectAllowed = 'move';
};

const handleTodoMindDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

const handleTodoDrop = (e) => {
  e.preventDefault();
  // Internal Reordering Functions
    const handleInternalDragStart = (e, item, index, type) => {
      setDraggedItem(item);
      setDraggedItemIndex(index);
      setDraggedItemType(type);
      setIsInternalDrag(true);
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleInternalDragOver = (e, index) => {
      e.preventDefault();
      setDraggedOverIndex(index);
      e.dataTransfer.dropEffect = 'move';
    };

    const handleInternalDrop = (e, dropIndex, type) => {
      e.preventDefault();

      if (!isInternalDrag || draggedItemIndex === null || draggedItemIndex === dropIndex) {
        resetInternalDragState();
        return;
      }

      if (type === 'todo') {
        const newTodos = [...todos];
        const draggedTodo = newTodos[draggedItemIndex];
        newTodos.splice(draggedItemIndex, 1);
        newTodos.splice(dropIndex, 0, draggedTodo);
        setTodos(newTodos);
      } else if (type === 'mindNote') {
        const newMindNotes = [...mindNotes];
        const draggedNote = newMindNotes[draggedItemIndex];
        newMindNotes.splice(draggedItemIndex, 1);
        newMindNotes.splice(dropIndex, 0, draggedNote);
        setMindNotes(newMindNotes);
      } else if (type === 'urlLink') {
        const newUrlLinks = [...urlLinks];
        const draggedLink = newUrlLinks[draggedItemIndex];
        newUrlLinks.splice(draggedItemIndex, 1);
        newUrlLinks.splice(dropIndex, 0, draggedLink);
        setUrlLinks(newUrlLinks);
      }

      resetInternalDragState();
    };

    const resetInternalDragState = () => {
      setDraggedItem(null);
      setDraggedItemIndex(null);
      setDraggedOverIndex(null);
      setDraggedItemType(null);
      setIsInternalDrag(false);
    };

    const handleInternalDragEnd = () => {
      resetInternalDragState();
    };
    if (draggedItemType === 'mindNote' && draggedItem) {
      // Convert mind note to todo
      const newTodo = {
        id: Date.now(),
        text: draggedItem.text,
        completed: false,
        priority: 0,
        dueDate: null,
        dueTime: null,
        list: selectedList === 'All' ? 'Trading' : selectedList,
        tags: [],
        notes: `Converted from mind note on ${new Date().toLocaleDateString()}`,
        flagged: false,
        recurring: null,
        subtasks: [],
        reminder: null,
        attachments: [],
        createdAt: new Date().toISOString()
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);

      // Remove from mind notes
      setMindNotes(prevNotes => prevNotes.filter(note => note.id !== draggedItem.id));
    }

    setDraggedItem(null);
    setDraggedItemType(null);
  }

  function handleMindNoteDrop(e) {
    e.preventDefault();

    if (draggedItemType === 'todo' && draggedItem) {
      // Convert todo to mind note
      const newMindNote = {
        id: Date.now(),
        text: draggedItem.text,
        date: new Date().toISOString()
      };

      setMindNotes(prevNotes => [...prevNotes, newMindNote]);

      // Remove from todos
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== draggedItem.id));
    }

    setDraggedItem(null);
    setDraggedItemType(null);
  }

const handleDragEnd = () => {
  setDraggedItem(null);
  setDraggedItemType(null);
};
  
  if (draggedItemType === 'mindNote' && draggedItem) {
    // Convert mind note to todo
    const newTodo = {
      id: Date.now(),
      text: draggedItem.text,
      completed: false,
      priority: 0,
      dueDate: null,
      dueTime: null,
      list: selectedList === 'All' ? 'Trading' : selectedList,
      tags: [],
      notes: `Converted from mind note on ${new Date().toLocaleDateString()}`,
      flagged: false,
      recurring: null,
      subtasks: [],
      reminder: null,
      attachments: [],
      createdAt: new Date().toISOString()
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setMindNotes(prevNotes => prevNotes.filter(note => note.id !== draggedItem.id));
  }
  
  setDraggedItem(null);
  setDraggedItemType(null);
};

const handleMindNoteDrop = (e) => {
  e.preventDefault();
  
  if (draggedItemType === 'todo' && draggedItem) {
    // Convert todo to mind note
    const newMindNote = {
      id: Date.now(),
      text: draggedItem.text,
      date: new Date().toISOString()
    };
    
    setMindNotes(prevNotes => [...prevNotes, newMindNote]);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== draggedItem.id));
  }
  
  setDraggedItem(null);
  setDraggedItemType(null);
};

const handleTodoMindDragEnd = () => {
  setDraggedItem(null);
  setDraggedItemType(null);
};

// Internal Reordering Functions
const handleInternalDragStart = (e, item, index, type) => {
  setDraggedItem(item);
  setDraggedItemIndex(index);
  setDraggedItemType(type);
  setIsInternalDrag(true);
  e.dataTransfer.effectAllowed = 'move';
};

const handleInternalDragOver = (e, index) => {
  e.preventDefault();
  setDraggedOverIndex(index);
  e.dataTransfer.dropEffect = 'move';
};

const handleInternalDrop = (e, dropIndex, type) => {
  e.preventDefault();
  
  if (!isInternalDrag || draggedItemIndex === null || draggedItemIndex === dropIndex) {
    resetInternalDragState();
    return;
  }

  if (type === 'todo') {
    const filteredTodos = getFilteredTodos();
    const newTodos = [...todos];
    const todoToMove = filteredTodos[draggedItemIndex];
    const todoAtDrop = filteredTodos[dropIndex];
    
    const moveIndex = newTodos.findIndex(t => t.id === todoToMove.id);
    const dropIndexInFull = newTodos.findIndex(t => t.id === todoAtDrop.id);
    
    newTodos.splice(moveIndex, 1);
    newTodos.splice(dropIndexInFull, 0, todoToMove);
    setTodos(newTodos);
  } else if (type === 'mindNote') {
    const newMindNotes = [...mindNotes];
    const draggedNote = newMindNotes[draggedItemIndex];
    newMindNotes.splice(draggedItemIndex, 1);
    newMindNotes.splice(dropIndex, 0, draggedNote);
    setMindNotes(newMindNotes);
  } else if (type === 'urlLink') {
    const newUrlLinks = [...urlLinks];
    const draggedLink = newUrlLinks[draggedItemIndex];
    newUrlLinks.splice(draggedItemIndex, 1);
    newUrlLinks.splice(dropIndex, 0, draggedLink);
    setUrlLinks(newUrlLinks);
  }

  resetInternalDragState();
};

const resetInternalDragState = () => {
  setDraggedItem(null);
  setDraggedItemIndex(null);
  setDraggedOverIndex(null);
  setDraggedItemType(null);
  setIsInternalDrag(false);
};

const handleInternalDragEnd = () => {
  resetInternalDragState();
};

// Move Up/Down Functions
const moveTodoUp = (index) => {
  const filteredTodos = getFilteredTodos();
  if (index > 0) {
    const currentTodos = [...todos];
    const todoToMove = filteredTodos[index];
    const todoAbove = filteredTodos[index - 1];
    
    const currentIndex = currentTodos.findIndex(t => t.id === todoToMove.id);
    const aboveIndex = currentTodos.findIndex(t => t.id === todoAbove.id);
    
    [currentTodos[currentIndex], currentTodos[aboveIndex]] = [currentTodos[aboveIndex], currentTodos[currentIndex]];
    setTodos(currentTodos);
  }
};

const moveTodoDown = (index) => {
  const filteredTodos = getFilteredTodos();
  if (index < filteredTodos.length - 1) {
    const currentTodos = [...todos];
    const todoToMove = filteredTodos[index];
    const todoBelow = filteredTodos[index + 1];
    
    const currentIndex = currentTodos.findIndex(t => t.id === todoToMove.id);
    const belowIndex = currentTodos.findIndex(t => t.id === todoBelow.id);
    
    [currentTodos[currentIndex], currentTodos[belowIndex]] = [currentTodos[belowIndex], currentTodos[currentIndex]];
    setTodos(currentTodos);
  }
};

const moveMindNoteUp = (index) => {
  if (index > 0) {
    const newMindNotes = [...mindNotes];
    [newMindNotes[index - 1], newMindNotes[index]] = [newMindNotes[index], newMindNotes[index - 1]];
    setMindNotes(newMindNotes);
  }
};

const moveMindNoteDown = (index) => {
  if (index < mindNotes.length - 1) {
    const newMindNotes = [...mindNotes];
    [newMindNotes[index], newMindNotes[index + 1]] = [newMindNotes[index + 1], newMindNotes[index]];
    setMindNotes(newMindNotes);
  }
};

const moveUrlLinkUp = (index) => {
  if (index > 0) {
    const newUrlLinks = [...urlLinks];
    [newUrlLinks[index - 1], newUrlLinks[index]] = [newUrlLinks[index], newUrlLinks[index - 1]];
    setUrlLinks(newUrlLinks);
  }
};

const moveUrlLinkDown = (index) => {
  if (index < urlLinks.length - 1) {
    const newUrlLinks = [...urlLinks];
    [newUrlLinks[index], newUrlLinks[index + 1]] = [newUrlLinks[index + 1], newUrlLinks[index]];
    setUrlLinks(newUrlLinks);
  }
};

// Habit Drag and Drop handlers (for habits columns)
const handleHabitDragStart = (e, columnIndex) => {
  setDraggedColumn(columnIndex);
  e.dataTransfer.effectAllowed = 'move';
};

const handleHabitDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

const handleHabitDrop = (e, dropIndex) => {
  e.preventDefault();
  if (draggedColumn === null) return;

  const draggedItem = habitColumns[draggedColumn];
  const newColumns = [...habitColumns];
  
  // Remove the dragged item
  newColumns.splice(draggedColumn, 1);
  
  // Insert it at the new position
  const adjustedDropIndex = dropIndex > draggedColumn ? dropIndex - 1 : dropIndex;
  newColumns.splice(adjustedDropIndex, 0, draggedItem);
  
  setHabitColumns(newColumns);
  setDraggedColumn(null);
};

// Drag and Drop Functions
//const handleDragStart = (e, item, itemType) => {
  //setDraggedItem(item);
  //setDraggedItemType(itemType);
  //e.dataTransfer.effectAllowed = 'move';
//};

//const handleDragOver = (e) => {
  //e.preventDefault();
  //e.dataTransfer.dropEffect = 'move';
//};

  //function handleTodoDrop(e) {
    //e.preventDefault();

    

  // Daily Habits Functions
  const toggleHabit = (day, habitId) => {
    const habit = habitColumns.find(h => h.id === habitId);
    
    if (habit.hasTarget) {
      // Open quantity modal for habits with targets
      setCurrentHabitEdit(habit);
      setCurrentDayEdit(day);
      setTempQuantity(habitData[day]?.[habitId]?.value || 0);
      setShowQuantityModal(true);
    } else {
      // Simple toggle for habits without targets
      setHabitData(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [habitId]: {
            completed: !prev[day][habitId].completed,
            value: 0
          }
        }
      }));
    }
  };

  const updateHabitQuantity = () => {
    if (currentHabitEdit && currentDayEdit !== null) {
      setHabitData(prev => ({
        ...prev,
        [currentDayEdit]: {
          ...prev[currentDayEdit],
          [currentHabitEdit.id]: {
            completed: tempQuantity >= currentHabitEdit.targetValue,
            value: tempQuantity
          }
        }
      }));
      setShowQuantityModal(false);
      setTempQuantity(0);
    }
  };

  const incrementQuantity = (amount = 1) => {
    setTempQuantity(prev => Math.max(0, prev + amount));
  };

  const addHabitColumn = (name) => {
    const habitName = name || newHabitName;
    if (habitName.trim()) {
      // Find matching icon from suggestions
      const lowerName = habitName.toLowerCase();
      let matchedIcon = '✓'; // Default icon
      let defaultTarget = 0;
      let defaultUnit = '';
      let hasTarget = false;
      
      // Set default targets based on habit type
      if (lowerName.includes('water') || lowerName.includes('drink')) {
        matchedIcon = '💧';
        defaultTarget = 8;
        defaultUnit = 'glasses';
        hasTarget = true;
      } else if (lowerName.includes('exercise') || lowerName.includes('workout')) {
        matchedIcon = '🏃';
        defaultTarget = 30;
        defaultUnit = 'minutes';
        hasTarget = true;
      } else if (lowerName.includes('read')) {
        matchedIcon = '📖';
        defaultTarget = 20;
        defaultUnit = 'pages';
        hasTarget = true;
      } else if (lowerName.includes('sleep')) {
        matchedIcon = '😴';
        defaultTarget = 8;
        defaultUnit = 'hours';
        hasTarget = true;
      } else {
        // Check other suggestions
        for (const [key, icon] of Object.entries(habitSuggestions)) {
          if (lowerName.includes(key) || key.includes(lowerName)) {
            matchedIcon = icon;
            break;
          }
        }
      }
      
      const newHabit = {
        id: Date.now(),
        icon: matchedIcon,
        label: habitName,
        hasTarget: hasTarget,
        targetValue: defaultTarget,
        unit: defaultUnit
      };
      setHabitColumns([...habitColumns, newHabit]);
      
      // Add new habit to all days
      const updatedData = { ...habitData };
      currentWeek.forEach(day => {
        updatedData[day.dayName][newHabit.id] = {
          completed: false,
          value: 0
        };
      });
      setHabitData(updatedData);
      setNewHabitName('');
      setShowSuggestions(false);
    }
  };

  const deleteHabitColumn = (habitId) => {
    setHabitColumns(habitColumns.filter(col => col.id !== habitId));
    
    // Remove habit from all days
    const updatedData = { ...habitData };
    currentWeek.forEach(day => {
      delete updatedData[day.dayName][habitId];
    });
    setHabitData(updatedData);
  };

  const updateHabitIcon = (habitId, newIcon) => {
    setHabitColumns(habitColumns.map(col =>
      col.id === habitId ? { ...col, icon: newIcon } : col
    ));
  };

  const updateHabitLabel = (habitId, newLabel) => {
    setHabitColumns(habitColumns.map(col =>
      col.id === habitId ? { ...col, label: newLabel } : col
    ));
  };

  const updateHabitTarget = (habitId, hasTarget, targetValue, unit) => {
    setHabitColumns(habitColumns.map(col =>
      col.id === habitId ? { ...col, hasTarget, targetValue, unit } : col
    ));
  };

  // Drag and Drop handlers
  const handleDragStart = (e, columnIndex) => {
    setDraggedColumn(columnIndex);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedColumn === null) return;

    const draggedItem = habitColumns[draggedColumn];
    const newColumns = [...habitColumns];
    
    // Remove the dragged item
    newColumns.splice(draggedColumn, 1);
    
    // Insert it at the new position
    const adjustedDropIndex = dropIndex > draggedColumn ? dropIndex - 1 : dropIndex;
    newColumns.splice(adjustedDropIndex, 0, draggedItem);
    
    setHabitColumns(newColumns);
    setDraggedColumn(null);
  };

  // Get habit suggestions based on input
  const getHabitSuggestions = (input) => {
    if (!input) return [];
    const lower = input.toLowerCase();
    const suggestions = [];
    
    for (const [key, icon] of Object.entries(habitSuggestions)) {
      if (key.includes(lower) || lower.includes(key)) {
        suggestions.push({ name: key.charAt(0).toUpperCase() + key.slice(1), icon });
      }
    }
    
    return suggestions.slice(0, 5); // Return top 5 suggestions
  };

  // Download habits data as visualization
  const downloadHabitsData = () => {
    // Calculate statistics
    const weekStats = currentWeek.map(day => {
      const dayData = habitData[day.dayName];
      let completed = 0;
      let totalValue = 0;
      
      habitColumns.forEach(habit => {
        const data = dayData[habit.id];
        if (habit.hasTarget) {
          if (data.value >= habit.targetValue) completed++;
          totalValue += data.value;
        } else {
          if (data.completed) completed++;
        }
      });
      
      return {
        day: day.dayName.replace('@', ''),
        completed,
        total: habitColumns.length,
        percentage: habitColumns.length > 0 ? Math.round((completed / habitColumns.length) * 100) : 0
      };
    });

    const habitStats = habitColumns.map(habit => {
      let completed = 0;
      let totalValue = 0;
      
      currentWeek.forEach(day => {
        const data = habitData[day.dayName][habit.id];
        if (habit.hasTarget) {
          if (data.value >= habit.targetValue) completed++;
          totalValue += data.value;
        } else {
          if (data.completed) completed++;
        }
      });
      
      return {
        habit: habit.label,
        icon: habit.icon,
        completed,
        total: 7,
        percentage: Math.round((completed / 7) * 100),
        targetInfo: habit.hasTarget ? `${habit.targetValue} ${habit.unit}` : 'No target',
        averageValue: habit.hasTarget ? Math.round(totalValue / 7) : 0
      };
    });

    // Create CSV content
    let csvContent = "Daily Habits Report\n";
    csvContent += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    csvContent += "Weekly Summary\n";
    csvContent += "Day,Completed,Total,Percentage\n";
    weekStats.forEach(stat => {
      csvContent += `${stat.day},${stat.completed},${stat.total},${stat.percentage}%\n`;
    });
    
    csvContent += "\nHabit Performance\n";
    csvContent += "Habit,Target,Days Completed,Total Days,Success Rate,Average Value\n";
    habitStats.forEach(stat => {
      csvContent += `${stat.habit},${stat.targetInfo},${stat.completed},${stat.total},${stat.percentage}%,${stat.averageValue}\n`;
    });

    csvContent += "\nDetailed Data\n";
    csvContent += "Day,Date," + habitColumns.map(h => `${h.label}${h.hasTarget ? ` (/${h.targetValue} ${h.unit})` : ''}`).join(",") + "\n";
    currentWeek.forEach(day => {
      const row = [
        day.dayName.replace('@', ''),
        day.dateString,
        ...habitColumns.map(h => {
          const data = habitData[day.dayName][h.id];
          if (h.hasTarget) {
            return `${data.value}/${h.targetValue}`;
          }
          return data.completed ? '✓' : '✗';
        })
      ];
      csvContent += row.join(",") + "\n";
    });

    // Download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `habits_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    const allocatedCapital = getAllocatedCapitalForAssetClass();
    const riskAmount = (allocatedCapital * riskPercentage) / 100;
    const riskPerShare = Math.abs(entry - sl);
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

    // Calculate custom targets with proper values
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

  const calculation = calculateRisk();

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

  // Transfer from History to Journal function
  const transferToJournal = (historyItem) => {
    // Format targets as string
    const targetStrings = [
      ...historyItem.targets.map(t => t.price.toFixed(0)),
      ...(historyItem.customTargets ? historyItem.customTargets.map(t => t.price.toFixed(0)) : [])
    ].join(', ');

    // Create new journal entry from history item
    const newJournalEntry = {
      id: Date.now(),
      sn: journalEntries.length + 1,
      strategy: 'Custom', // Default, user can edit
      assetType: historyItem.assetClass.charAt(0).toUpperCase() + historyItem.assetClass.slice(1),
      symbol: historyItem.symbol,
      type: historyItem.tradeType === 'LONG' ? 'Buy' : 'Sell',
      tradeDate: historyItem.date,
      timeFrame: '1D', // Default, user can edit
      capital: historyItem.investment,
      risk: historyItem.riskAmount,
      entry: historyItem.entryPrice,
      sl: historyItem.stopLoss,
      targets: targetStrings,
      status: 'Active', // Default
      pnl: '0',
      quantity: historyItem.quantity // New field from history
    };

    // Check if 'quantity' column exists, if not add it
    const quantityColumnExists = journalColumns.some(col => col.key === 'quantity');
    if (!quantityColumnExists) {
      setJournalColumns([...journalColumns, { key: 'quantity', label: 'Quantity', visible: true }]);
    }

    setJournalEntries([...journalEntries, newJournalEntry]);
    
    // Show success message (you could add a toast notification here)
    alert('Entry transferred to Trading Journal successfully!');
  };

  // Journal editing functions
  const updateJournalEntry = (id, field, value) => {
    setJournalEntries(journalEntries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const deleteJournalEntry = (id) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
  };

  const toggleColumn = (key) => {
    setJournalColumns(journalColumns.map(col =>
      col.key === key ? { ...col, visible: !col.visible } : col
    ));
  };

  const addCustomColumn = () => {
    if (newColumnName && !journalColumns.some(col => col.key === newColumnName.toLowerCase().replace(/\s+/g, '_'))) {
      const columnKey = newColumnName.toLowerCase().replace(/\s+/g, '_');
      setJournalColumns([...journalColumns, { key: columnKey, label: newColumnName, visible: true }]);
      // Add the new field to all existing entries with default value
      setJournalEntries(journalEntries.map(entry => ({ ...entry, [columnKey]: '' })));
      setNewColumnName('');
    }
  };

  const executeTrade = () => {
    // Mock trade execution
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

const theme = darkMode ? 'dark' : 'light';

  // Broker Icons Component
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

  // This return should be inside your main component function
// Make sure it's wrapped in something like:
//const TradingDashboard = () => {
  // ... your component logic above ...
{

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
              ):             
              (
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
    
      {/* Broker Panel - Right Side */}
      <div className={`fixed right-0 top-20 z-40 transition-transform duration-300 ${brokerPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl rounded-l-xl`}>
          {/* Toggle Button */}
          <button
            onClick={() => setBrokerPanelOpen(!brokerPanelOpen)}
            className={`absolute -left-12 top-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-l-lg p-3 hover:scale-110 transition-transform`}
          >
            {brokerPanelOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Broker Panel Content */}
          <div className="w-80 h-[calc(100vh-5rem)] overflow-y-auto p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Shield className="mr-2" size={20} />
              Broker Integration
            </h3>

            {/* Broker Selection */}
            <div className="space-y-4 mb-6">
              <div
                onClick={() => {
                  setSelectedBroker('upstox');
                  setBrokerLoginModal(true);
                } }
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedBroker === 'upstox'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BrokerIcon broker="upstox" />
                    <div className="ml-3">
                      <p className="font-medium">Upstox</p>
                      <p className="text-xs text-gray-500">Click to connect</p>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-gray-400" />
                </div>
              </div>

              <div
                onClick={() => {
                  setSelectedBroker('angelone');
                  setBrokerLoginModal(true);
                } }
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedBroker === 'angelone'
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BrokerIcon broker="angelone" />
                    <div className="ml-3">
                      <p className="font-medium">Angel One</p>
                      <p className="text-xs text-gray-500">Click to connect</p>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quick Trade Section */}
            {selectedBroker && (
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h4 className="font-medium mb-3 flex items-center">
                  <Activity size={16} className="mr-2" />
                  Quick Trade
                </h4>
                <button
                  onClick={() => setTradeExecutionModal(true)}
                  className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Execute Trade
                </button>
              </div>
            )}

            {/* Account Summary */}
            {selectedBroker && (
              <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h4 className="font-medium mb-3">Account Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Available Margin</span>
                    <span className="font-medium">₹2,45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Used Margin</span>
                    <span className="font-medium">₹1,55,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Open Positions</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Broker Login Modal */}
      {brokerLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-96 max-w-[90%]`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Login to {selectedBroker === 'upstox' ? 'Upstox' : 'Angel One'}
              </h3>
              <button
                onClick={() => setBrokerLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {selectedBroker === 'upstox' ? (
                <>
                  <input
                    type="text"
                    placeholder="User ID"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                  <input
                    type="text"
                    placeholder="PIN"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Client ID"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                  <input
                    type="text"
                    placeholder="MPIN"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                </>
              )}

              <button
                onClick={() => setBrokerLoginModal(false)}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trade Execution Modal */}
      {tradeExecutionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-[500px] max-w-[90%]`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Execute Trade</h3>
              <button
                onClick={() => setTradeExecutionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Symbol</label>
                  <input
                    type="text"
                    value={quickTradeData.symbol}
                    onChange={(e) => setQuickTradeData({ ...quickTradeData, symbol: e.target.value })}
                    placeholder="e.g., RELIANCE"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <input
                    type="number"
                    value={quickTradeData.quantity}
                    onChange={(e) => setQuickTradeData({ ...quickTradeData, quantity: e.target.value })}
                    placeholder="100"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Order Type</label>
                  <select
                    value={quickTradeData.orderType}
                    onChange={(e) => setQuickTradeData({ ...quickTradeData, orderType: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  >
                    <option value="MARKET">Market</option>
                    <option value="LIMIT">Limit</option>
                    <option value="SL">Stop Loss</option>
                    <option value="SLM">SL-Market</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Product</label>
                  <select
                    value={quickTradeData.product}
                    onChange={(e) => setQuickTradeData({ ...quickTradeData, product: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  >
                    <option value="CNC">CNC</option>
                    <option value="MIS">MIS</option>
                    <option value="NRML">NRML</option>
                  </select>
                </div>
              </div>

              {quickTradeData.orderType !== 'MARKET' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="number"
                    value={quickTradeData.price}
                    onChange={(e) => setQuickTradeData({ ...quickTradeData, price: e.target.value })}
                    placeholder="Enter price"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={executeTrade}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Buy
                </button>
                <button
                  onClick={executeTrade}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                } }
                className={`${activeTab === item.id
                    ? darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-700'
                    : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors`}
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
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Capital Overview Widget - Full Width */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold flex items-center">
                      <Wallet className="mr-2" size={16} />
                      Capital Overview
                    </h2>
                    <button
                      onClick={() => setEditingCapital(!editingCapital)}
                      className={`px-2 py-1 text-xs rounded ${editingCapital ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'} hover:opacity-90`}
                    >
                      {editingCapital ? 'Save' : 'Edit'}
                    </button>
                  </div>

                  {/* Total Capital and Cash Reserve - Same Row */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className="text-xs text-gray-500">Total Capital</p>
                      {editingCapital ? (
                        <input
                          type="number"
                          value={capitalAllocation.total}
                          onChange={(e) => setCapitalAllocation({ ...capitalAllocation, total: Number(e.target.value) })}
                          className={`w-full mt-1 px-2 py-1 text-sm font-bold rounded ${darkMode ? 'bg-gray-600' : 'bg-white'} border ${darkMode ? 'border-gray-500' : 'border-gray-300'}`} />
                      ) : (
                        <p className="text-lg font-bold">{formatIndianNumber(capitalAllocation.total)}</p>
                      )}
                    </div>
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                      <p className="text-xs text-gray-500">Cash Reserve</p>
                      <p className="text-lg font-bold text-green-500">{formatIndianNumber(capitalAllocation.cash)}</p>
                    </div>
                  </div>

                  {/* Asset Allocation - All in one row */}
                  <div className="grid grid-cols-4 gap-1">
                    {['equity', 'options', 'futures', 'commodities'].map((asset) => (
                      <div key={asset} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className="text-xs text-gray-500 capitalize truncate">{asset}</p>
                        {editingCapital ? (
                          <input
                            type="number"
                            value={capitalAllocation[asset].allocated}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);
                              const deployed = capitalAllocation[asset].deployed;
                              setCapitalAllocation({
                                ...capitalAllocation,
                                [asset]: {
                                  allocated: newValue,
                                  deployed: deployed,
                                  available: newValue - deployed
                                }
                              });
                            } }
                            className={`w-full mt-1 px-1 py-0.5 text-xs font-bold rounded ${darkMode ? 'bg-gray-600' : 'bg-white'} border ${darkMode ? 'border-gray-500' : 'border-gray-300'}`} />
                        ) : (
                          <>
                            <p className="text-sm font-bold">{formatIndianNumber(capitalAllocation[asset].allocated)}</p>
                            <div className="text-xs mt-1">
                              <div className="text-orange-400" title="Deployed">D: {formatIndianNumber(capitalAllocation[asset].deployed).replace('₹', '')}</div>
                              <div className="text-green-400" title="Available">A: {formatIndianNumber(capitalAllocation[asset].available).replace('₹', '')}</div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Habits Tracker - Full Width */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold flex items-center">
                      <CheckSquare className="mr-2" size={16} />
                      Daily Habits
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Add habit name..."
                          value={newHabitName}
                          onChange={(e) => {
                            setNewHabitName(e.target.value);
                            setShowSuggestions(e.target.value.length > 0);
                          } }
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addHabitColumn();
                            }
                          } }
                          className={`px-2 py-1 text-sm rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} w-32`} />

                        {/* Suggestions dropdown */}
                        {showSuggestions && getHabitSuggestions(newHabitName).length > 0 && (
                          <div className={`absolute top-full left-0 mt-1 w-full ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'} z-10`}>
                            {getHabitSuggestions(newHabitName).map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setNewHabitName(suggestion.name);
                                  addHabitColumn(suggestion.name);
                                } }
                                className={`w-full px-2 py-1 text-sm text-left flex items-center gap-2 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                              >
                                <span>{suggestion.icon}</span>
                                <span>{suggestion.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => addHabitColumn()}
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add
                      </button>
                      <button
                        onClick={downloadHabitsData}
                        className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
                      >
                        <Download size={12} />
                        Export
                      </button>
                    </div>
                  </div>

                  {/* Week Overview Stats */}
                  <div className={`mb-3 p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Week Overview</span>
                      <div className="flex gap-4">
                        {(() => {
                          let totalCompleted = 0;
                          let totalPossible = 0;
                          currentWeek.forEach(day => {
                            totalCompleted += Object.values(habitData[day.dayName] || {}).filter(Boolean).length;
                            totalPossible += habitColumns.length;
                          });
                          const weeklyPercentage = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

                          return (
                            <>
                              <span>Total: {totalCompleted}/{totalPossible}</span>
                              <span className={`font-semibold ${weeklyPercentage >= 80 ? 'text-green-500' : weeklyPercentage >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                                {weeklyPercentage}% Complete
                              </span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Habits Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 sticky left-0 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} z-10">
                            Day
                          </th>
                          {habitColumns.map((habit, index) => (
                            <th
                              key={habit.id}
                              className="px-2 py-2 text-center min-w-[60px] cursor-move relative"
                              draggable
                              onDragStart={(e) => handleHabitDragStart(e, index)}
                              onDragOver={handleHabitDragOver}
                              onDrop={(e) => handleHabitDrop(e, index)}
                            >
                              <div className="flex flex-col items-center group">
                                {editingHabit === habit.id ? (
                                  <div className="flex flex-col items-center gap-1">
                                    <input
                                      type="text"
                                      value={habit.icon}
                                      onChange={(e) => updateHabitIcon(habit.id, e.target.value.substring(0, 2))}
                                      className={`w-8 text-center text-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} rounded`}
                                      autoFocus />
                                    <input
                                      type="text"
                                      value={habit.label}
                                      onChange={(e) => updateHabitLabel(habit.id, e.target.value)}
                                      className={`w-20 text-center text-xs ${darkMode ? 'bg-gray-600' : 'bg-white'} rounded`} />
                                    <div className="flex items-center gap-1">
                                      <input
                                        type="checkbox"
                                        checked={habit.hasTarget}
                                        onChange={(e) => updateHabitTarget(habit.id, e.target.checked, habit.targetValue, habit.unit)}
                                        className="w-3 h-3" />
                                      <span className="text-xs">Target</span>
                                    </div>
                                    {habit.hasTarget && (
                                      <div className="flex gap-1">
                                        <input
                                          type="number"
                                          value={habit.targetValue}
                                          onChange={(e) => updateHabitTarget(habit.id, habit.hasTarget, Number(e.target.value), habit.unit)}
                                          className={`w-12 text-center text-xs ${darkMode ? 'bg-gray-600' : 'bg-white'} rounded`} />
                                        <input
                                          type="text"
                                          value={habit.unit}
                                          onChange={(e) => updateHabitTarget(habit.id, habit.hasTarget, habit.targetValue, e.target.value)}
                                          onBlur={() => setEditingHabit(null)}
                                          onKeyPress={(e) => e.key === 'Enter' && setEditingHabit(null)}
                                          className={`w-14 text-center text-xs ${darkMode ? 'bg-gray-600' : 'bg-white'} rounded`} />
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <>
                                    <span
                                      className="text-lg cursor-pointer hover:opacity-70"
                                      onClick={() => setEditingHabit(habit.id)}
                                      title={`${habit.label}${habit.hasTarget ? ` (Target: ${habit.targetValue} ${habit.unit})` : ''}`}
                                    >
                                      {habit.icon}
                                    </span>
                                    <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                      {habit.label}
                                    </span>
                                    {habit.hasTarget && (
                                      <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {habit.targetValue} {habit.unit}
                                      </span>
                                    )}
                                  </>
                                )}
                                <button
                                  onClick={() => deleteHabitColumn(habit.id)}
                                  className="text-xs text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-1 -right-1"
                                >
                                  ×
                                </button>
                                <div className="absolute -bottom-3 text-xs text-gray-400">⋮⋮</div>
                              </div>
                            </th>
                          ))}
                          <th className="px-3 py-2 text-xs text-gray-500">Date</th>
                          <th className="px-3 py-2 text-xs text-gray-500">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentWeek.map((dayInfo, dayIndex) => {
                          let completedCount = 0;
                          habitColumns.forEach(habit => {
                            const data = habitData[dayInfo.dayName]?.[habit.id];
                            if (habit.hasTarget) {
                              if (data?.value >= habit.targetValue) completedCount++;
                            } else {
                              if (data?.completed) completedCount++;
                            }
                          });
                          const totalHabits = habitColumns.length;
                          const percentage = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;
                          const isToday = dayInfo.dayName === '@Today';

                          return (
                            <tr key={dayIndex} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} ${isToday ? darkMode ? 'bg-blue-900/20' : 'bg-blue-50' : ''}`}>
                              <td className={`px-3 py-2 text-sm font-medium sticky left-0 ${isToday ? darkMode ? 'bg-blue-900/20' : 'bg-blue-50' : darkMode ? 'bg-gray-800' : 'bg-white'} ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {dayInfo.dayName}
                              </td>
                              {habitColumns.map((habit) => {
                                const data = habitData[dayInfo.dayName]?.[habit.id] || { completed: false, value: 0 };
                                const isCompleted = habit.hasTarget ? data.value >= habit.targetValue : data.completed;
                                const progressPercent = habit.hasTarget ? Math.min(100, (data.value / habit.targetValue) * 100) : 0;

                                return (
                                  <td key={habit.id} className="px-2 py-2 text-center">
                                    {habit.hasTarget ? (
                                      <button
                                        onClick={() => toggleHabit(dayInfo.dayName, habit.id)}
                                        className={`relative w-12 h-6 rounded-full border-2 transition-all ${isCompleted
                                            ? 'bg-green-500 border-green-500'
                                            : darkMode
                                              ? 'border-gray-600 hover:border-gray-500'
                                              : 'border-gray-300 hover:border-gray-400'}`}
                                      >
                                        <div
                                          className="absolute left-0 top-0 h-full bg-blue-400 rounded-full transition-all"
                                          style={{ width: `${progressPercent}%` }} />
                                        <span className={`relative text-xs font-semibold ${isCompleted ? 'text-white' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                          {data.value}/{habit.targetValue}
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => toggleHabit(dayInfo.dayName, habit.id)}
                                        className={`w-6 h-6 rounded border-2 transition-all ${data.completed
                                            ? 'bg-blue-500 border-blue-500 transform scale-110'
                                            : darkMode
                                              ? 'border-gray-600 hover:border-gray-500'
                                              : 'border-gray-300 hover:border-gray-400'}`}
                                      >
                                        {data.completed && (
                                          <span className="text-white text-xs">✓</span>
                                        )}
                                      </button>
                                    )}
                                  </td>
                                );
                              })}
                              <td className="px-3 py-2 text-sm text-gray-500">
                                {dayInfo.dateString}
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <div className={`h-2 flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden max-w-[100px]`}>
                                    <div
                                      className={`h-full transition-all duration-300 ${percentage >= 80 ? 'bg-green-500' :
                                          percentage >= 60 ? 'bg-yellow-500' :
                                            percentage >= 40 ? 'bg-orange-500' :
                                              'bg-red-500'}`}
                                      style={{ width: `${percentage}%` }} />
                                  </div>
                                  <span className={`text-xs font-semibold min-w-[35px] ${percentage >= 80 ? 'text-green-500' :
                                      percentage >= 60 ? 'text-yellow-500' :
                                        'text-orange-500'}`}>{percentage}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quantity Modal */}
                {showQuantityModal && currentHabitEdit && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-80 max-w-[90%]`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <span className="text-2xl">{currentHabitEdit.icon}</span>
                          {currentHabitEdit.label}
                        </h3>
                        <button
                          onClick={() => setShowQuantityModal(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="text-center mb-6">
                        <p className="text-sm text-gray-500 mb-2">Target: {currentHabitEdit.targetValue} {currentHabitEdit.unit}</p>
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => incrementQuantity(-5)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            <Minus size={20} />
                          </button>
                          <button
                            onClick={() => incrementQuantity(-1)}
                            className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                          >
                            -1
                          </button>
                          <div className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <input
                              type="number"
                              value={tempQuantity}
                              onChange={(e) => setTempQuantity(Math.max(0, Number(e.target.value)))}
                              className={`w-20 text-center text-2xl font-bold bg-transparent ${darkMode ? 'text-white' : 'text-gray-900'}`} />
                            <p className="text-xs text-gray-500 mt-1">{currentHabitEdit.unit}</p>
                          </div>
                          <button
                            onClick={() => incrementQuantity(1)}
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            +1
                          </button>
                          <button
                            onClick={() => incrementQuantity(5)}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span className={`font-semibold ${tempQuantity >= currentHabitEdit.targetValue ? 'text-green-500' : 'text-orange-500'}`}>
                            {Math.round((tempQuantity / currentHabitEdit.targetValue) * 100)}%
                          </span>
                        </div>
                        <div className={`h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                          <div
                            className={`h-full transition-all duration-300 ${tempQuantity >= currentHabitEdit.targetValue ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min(100, (tempQuantity / currentHabitEdit.targetValue) * 100)}%` }} />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setTempQuantity(Math.round(currentHabitEdit.targetValue * 0.25))}
                          className={`py-1 text-sm rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                          25%
                        </button>
                        <button
                          onClick={() => setTempQuantity(Math.round(currentHabitEdit.targetValue * 0.5))}
                          className={`py-1 text-sm rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                          50%
                        </button>
                        <button
                          onClick={() => setTempQuantity(currentHabitEdit.targetValue)}
                          className={`py-1 text-sm rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                          100%
                        </button>
                      </div>

                      <button
                        onClick={updateHabitQuantity}
                        className={`w-full mt-4 py-2 rounded-lg font-medium ${tempQuantity >= currentHabitEdit.targetValue
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}
                      >
                        {tempQuantity >= currentHabitEdit.targetValue ? 'Complete!' : 'Save Progress'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Second Row: To-Do List and Things in My Mind (Available without login) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* To-Do List Widget with Apple Reminders Features */}
                  <div
                    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}
                    onDrop={handleTodoDrop}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-base font-semibold flex items-center">
                        <CheckSquare className="mr-2" size={16} />
                        Reminders
                        {draggedItemType === 'mindNote' && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full animate-pulse">
                            Drop to add task
                          </span>
                        )}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{todos.filter(t => !t.completed).length} pending</span>
                        <button
                          onClick={() => setShowCompletedTodos(!showCompletedTodos)}
                          className={`text-xs ${showCompletedTodos ? 'text-blue-500' : 'text-gray-500'}`}
                        >
                          {showCompletedTodos ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* Smart Lists and Categories */}
                    <div className="flex gap-1 mb-2 overflow-x-auto text-xs">
                      {[
                        { id: 'all', label: 'All', icon: '📋' },
                        { id: 'today', label: 'Today', icon: '📅' },
                        { id: 'scheduled', label: 'Scheduled', icon: '🗓️' },
                        { id: 'flagged', label: 'Flagged', icon: '🚩' }
                      ].map(list => (
                        <button
                          key={list.id}
                          onClick={() => setSelectedSmartList(list.id)}
                          className={`px-2 py-1 rounded flex items-center gap-1 whitespace-nowrap ${selectedSmartList === list.id
                              ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                          <span>{list.icon}</span>
                          <span>{list.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Lists */}
                    <div className="flex gap-1 mb-3 overflow-x-auto text-xs">
                      {todoLists.map(list => (
                        <button
                          key={list}
                          onClick={() => setSelectedList(list)}
                          className={`px-2 py-1 rounded ${selectedList === list
                              ? darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
                              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                          {list}
                        </button>
                      ))}
                      <button
                        onClick={() => setShowAddList(!showAddList)}
                        className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Add new list */}
                    {showAddList && (
                      <div className="flex gap-1 mb-2">
                        <input
                          type="text"
                          value={newList}
                          onChange={(e) => setNewList(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addList()}
                          placeholder="New list name..."
                          className={`flex-1 px-2 py-1 text-xs rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                        <button onClick={addList} className="px-2 py-1 text-xs bg-green-600 text-white rounded">
                          Add
                        </button>
                      </div>
                    )}

                    {/* Search */}
                    <div className="relative mb-3">
                      <Search size={14} className="absolute left-2 top-2 text-gray-400" />
                      <input
                        type="text"
                        value={searchTodo}
                        onChange={(e) => setSearchTodo(e.target.value)}
                        placeholder="Search..."
                        className={`w-full pl-7 pr-2 py-1.5 text-sm rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                    </div>

                    {/* Add new todo */}
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                        placeholder="Add a reminder..."
                        className={`flex-1 px-3 py-1.5 text-sm rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                      <button
                        onClick={addTodo}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Todo items */}
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {getFilteredTodos().map((todo, index) => (
                        <div
                          key={todo.id}
                          className={`group relative ${todo.completed ? 'opacity-60' : ''} ${draggedOverIndex === index && isInternalDrag && draggedItemType === 'todo'
                              ? 'border-t-2 border-blue-500'
                              : ''}`}
                          draggable={!todo.completed}
                          onDragStart={(e) => {
                            e.stopPropagation();
                            handleInternalDragStart(e, todo, index, 'todo');
                          } }
                          onDragOver={(e) => {
                            e.stopPropagation();
                            handleInternalDragOver(e, index);
                          } }
                          onDrop={(e) => {
                            e.stopPropagation();
                            handleInternalDrop(e, index, 'todo');
                          } }
                          onDragEnd={handleInternalDragEnd}
                        >
                          <div className={`flex items-start gap-2 p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} ${selectedTodo?.id === todo.id ? 'ring-2 ring-blue-500' : ''} cursor-move transition-all ${draggedItem?.id === todo.id ? 'opacity-50 scale-95' : ''}`}>
                            <button
                              onClick={() => toggleTodo(todo.id)}
                              className={`mt-0.5 ${todo.completed ? 'text-green-500' : 'text-gray-400'}`}
                            >
                              {todo.completed ? <CheckCircle size={16} /> : <Circle size={16} />}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2">
                                {/* Priority indicator */}
                                {todo.priority > 0 && (
                                  <span className={`${getPriorityColor(todo.priority)} font-bold text-sm`}>
                                    {getPriorityIcon(todo.priority)}
                                  </span>
                                )}

                                {/* Todo text */}
                                <div className="flex-1">
                                  {editingTodoId === todo.id ? (
                                    <input
                                      type="text"
                                      value={todo.text}
                                      onChange={(e) => updateTodo(todo.id, { text: e.target.value })}
                                      onBlur={() => setEditingTodoId(null)}
                                      onKeyPress={(e) => e.key === 'Enter' && setEditingTodoId(null)}
                                      className={`w-full px-1 text-sm rounded ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
                                      autoFocus />
                                  ) : (
                                    <span
                                      className={`text-sm cursor-pointer ${todo.completed ? 'line-through' : ''}`}
                                      onClick={() => {
                                        setSelectedTodo(todo);
                                        setShowTodoDetails(true);
                                      } }
                                    >
                                      {todo.text}
                                    </span>
                                  )}

                                  {/* Subtasks preview */}
                                  {todo.subtasks.length > 0 && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      {todo.subtasks.filter(s => !s.completed).length}/{todo.subtasks.length} subtasks
                                    </div>
                                  )}

                                  {/* Tags */}
                                  {todo.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {todo.tags.map(tag => (
                                        <span key={tag} className={`text-xs px-1.5 py-0.5 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {/* Due date and time */}
                                  {todo.dueDate && (
                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                      <span className={new Date(todo.dueDate) < new Date() && !todo.completed ? 'text-red-500' : ''}>
                                        📅 {formatDueDate(todo.dueDate)}
                                        {todo.dueTime && ` at ${todo.dueTime}`}
                                      </span>
                                      {todo.recurring && (
                                        <span className="text-blue-500">🔄 {todo.recurring}</span>
                                      )}
                                    </div>
                                  )}

                                  {/* Notes preview */}
                                  {todo.notes && (
                                    <p className="text-xs text-gray-500 mt-1 truncate">{todo.notes}</p>
                                  )}
                                </div>

                                {/* Flag indicator */}
                                {todo.flagged && (
                                  <span className="text-orange-500">🚩</span>
                                )}
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => setEditingTodoId(todo.id)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => updateTodo(todo.id, { flagged: !todo.flagged })}
                                className={`${todo.flagged ? 'text-orange-500' : 'text-gray-400'} hover:text-orange-600`}
                              >
                                <Bell size={14} />
                              </button>
                              <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {getFilteredTodos().length === 0 && (
                        <p className="text-center text-gray-500 text-sm py-4">No reminders</p>
                      )}
                    </div>
                  </div>

                  {/* Todo Details Modal */}
                  {showTodoDetails && selectedTodo && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-[500px] max-w-[90%] max-h-[80vh] overflow-y-auto`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Reminder Details</h3>
                          <button
                            onClick={() => {
                              setShowTodoDetails(false);
                              setSelectedTodo(null);
                            } }
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        {/* Title */}
                        <input
                          type="text"
                          value={selectedTodo.text}
                          onChange={(e) => updateTodo(selectedTodo.id, { text: e.target.value })}
                          className={`w-full px-3 py-2 text-lg font-medium rounded-lg border mb-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />

                        {/* Priority, List, and Flag */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div>
                            <label className="text-xs text-gray-500">Priority</label>
                            <select
                              value={selectedTodo.priority}
                              onChange={(e) => updateTodo(selectedTodo.id, { priority: Number(e.target.value) })}
                              className={`w-full px-2 py-1 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                            >
                              <option value={0}>None</option>
                              <option value={1}>Low (!)</option>
                              <option value={2}>Medium (!!)</option>
                              <option value={3}>High (!!!)</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">List</label>
                            <select
                              value={selectedTodo.list}
                              onChange={(e) => updateTodo(selectedTodo.id, { list: e.target.value })}
                              className={`w-full px-2 py-1 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                            >
                              {todoLists.filter(l => l !== 'All').map(list => (
                                <option key={list} value={list}>{list}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex items-end">
                            <button
                              onClick={() => updateTodo(selectedTodo.id, { flagged: !selectedTodo.flagged })}
                              className={`w-full py-1 rounded ${selectedTodo.flagged
                                  ? 'bg-orange-500 text-white'
                                  : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                            >
                              🚩 Flag
                            </button>
                          </div>
                        </div>

                        {/* Due Date and Time */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                            <label className="text-xs text-gray-500">Due Date</label>
                            <input
                              type="date"
                              value={selectedTodo.dueDate ? selectedTodo.dueDate.split('T')[0] : ''}
                              onChange={(e) => updateTodo(selectedTodo.id, {
                                dueDate: e.target.value ? new Date(e.target.value).toISOString() : null
                              })}
                              className={`w-full px-2 py-1 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Time</label>
                            <input
                              type="time"
                              value={selectedTodo.dueTime || ''}
                              onChange={(e) => updateTodo(selectedTodo.id, { dueTime: e.target.value })}
                              className={`w-full px-2 py-1 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                          </div>
                        </div>

                        {/* Recurring */}
                        <div className="mb-4">
                          <label className="text-xs text-gray-500">Repeat</label>
                          <select
                            value={selectedTodo.recurring || ''}
                            onChange={(e) => updateTodo(selectedTodo.id, { recurring: e.target.value || null })}
                            className={`w-full px-2 py-1 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                          >
                            <option value="">Never</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                          </select>
                        </div>

                        {/* Tags */}
                        <div className="mb-4">
                          <label className="text-xs text-gray-500">Tags</label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {availableTags.map(tag => (
                              <button
                                key={tag}
                                onClick={() => {
                                  if (selectedTodo.tags.includes(tag)) {
                                    removeTag(selectedTodo.id, tag);
                                  } else {
                                    addTag(selectedTodo.id, tag);
                                  }
                                } }
                                className={`px-2 py-1 text-xs rounded-full ${selectedTodo.tags.includes(tag)
                                    ? 'bg-blue-500 text-white'
                                    : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="mb-4">
                          <label className="text-xs text-gray-500">Notes</label>
                          <textarea
                            value={selectedTodo.notes}
                            onChange={(e) => updateTodo(selectedTodo.id, { notes: e.target.value })}
                            placeholder="Add notes..."
                            rows={3}
                            className={`w-full px-2 py-1 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                        </div>

                        {/* Subtasks */}
                        <div className="mb-4">
                          <label className="text-xs text-gray-500">Subtasks</label>
                          <div className="space-y-1 mt-1">
                            {selectedTodo.subtasks.map(subtask => (
                              <div key={subtask.id} className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleSubtask(selectedTodo.id, subtask.id)}
                                  className={subtask.completed ? 'text-green-500' : 'text-gray-400'}
                                >
                                  {subtask.completed ? <CheckCircle size={14} /> : <Circle size={14} />}
                                </button>
                                <span className={`flex-1 text-sm ${subtask.completed ? 'line-through' : ''}`}>
                                  {subtask.text}
                                </span>
                                <button
                                  onClick={() => deleteSubtask(selectedTodo.id, subtask.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <input
                              type="text"
                              placeholder="Add subtask..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && e.target.value) {
                                  addSubtask(selectedTodo.id, e.target.value);
                                  e.target.value = '';
                                }
                              } }
                              className={`w-full px-2 py-1 text-sm rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setShowTodoDetails(false);
                            setSelectedTodo(null);
                          } }
                          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Things in My Mind Widget */}
                  <div
                    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}
                    onDrop={handleMindNoteDrop}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-base font-semibold flex items-center">
                        <Brain className="mr-2" size={16} />
                        Things in My Mind
                        {draggedItemType === 'todo' && (
                          <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full animate-pulse">
                            Drop to add thought
                          </span>
                        )}
                      </h2>
                      <span className="text-xs text-gray-500">{mindNotes.length} notes</span>
                    </div>

                    {/* Add new note */}
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newMindNote}
                        onChange={(e) => setNewMindNote(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addMindNote()}
                        placeholder="What's on your mind..."
                        className={`flex-1 px-3 py-1.5 text-sm rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                      <button
                        onClick={addMindNote}
                        className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Notes list */}
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {mindNotes.map((note, index) => (
                        <div
                          key={note.id}
                          className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} cursor-move transition-all ${draggedItem?.id === note.id ? 'opacity-50 scale-95' : ''} ${draggedOverIndex === index && isInternalDrag && draggedItemType === 'mindNote'
                              ? 'border-t-2 border-purple-500'
                              : ''}`}
                          draggable
                          onDragStart={(e) => {
                            e.stopPropagation();
                            handleInternalDragStart(e, note, index, 'mindNote');
                          } }
                          onDragOver={(e) => {
                            e.stopPropagation();
                            handleInternalDragOver(e, index);
                          } }
                          onDrop={(e) => {
                            e.stopPropagation();
                            handleInternalDrop(e, index, 'mindNote');
                          } }
                          onDragEnd={handleInternalDragEnd}
                        >
                          <p className="text-sm">{note.text}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {new Date(note.date).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => deleteMindNote(note.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                      {mindNotes.length === 0 && (
                        <p className="text-center text-gray-500 text-sm py-4">No notes yet</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Third Row: Quick Links and Market Indices */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* URL Links Widget (Available without login) */}
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-base font-semibold flex items-center">
                        <Link2 className="mr-2" size={16} />
                        Quick Links
                      </h2>
                      <button
                        onClick={() => setShowAddLink(true)}
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Link
                      </button>
                    </div>

                    {/* Add link form */}
                    {showAddLink && (
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-3`}>
                        <input
                          type="text"
                          placeholder="Title"
                          value={newLink.title}
                          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                          className={`w-full px-2 py-1 text-sm rounded border mb-2 ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`} />
                        <input
                          type="url"
                          placeholder="URL"
                          value={newLink.url}
                          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                          className={`w-full px-2 py-1 text-sm rounded border mb-2 ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`} />
                        <div className="flex gap-2">
                          <button
                            onClick={addUrlLink}
                            className="flex-1 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setShowAddLink(false);
                              setNewLink({ title: '', url: '' });
                            } }
                            className="flex-1 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Links list */}
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {urlLinks.map((link, index) => (
                        <div
                          key={link.id}
                          className={`flex items-center gap-2 p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors cursor-move ${draggedOverIndex === index && isInternalDrag && draggedItemType === 'urlLink'
                              ? 'border-t-2 border-blue-500'
                              : ''}`}
                          draggable
                          onDragStart={(e) => {
                            e.stopPropagation();
                            handleInternalDragStart(e, link, index, 'urlLink');
                          } }
                          onDragOver={(e) => {
                            e.stopPropagation();
                            handleInternalDragOver(e, index);
                          } }
                          onDrop={(e) => {
                            e.stopPropagation();
                            handleInternalDrop(e, index, 'urlLink');
                          } }
                          onDragEnd={handleInternalDragEnd}
                        >
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-sm hover:text-blue-500"
                          >
                            {link.title}
                          </a>
                          <ExternalLink size={14} className="text-gray-400" />
                          <button
                            onClick={() => deleteUrlLink(link.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      {urlLinks.length === 0 && (
                        <p className="text-center text-gray-500 text-sm py-4">No links added yet</p>
                      )}
                    </div>
                  </div>

                  {/* Market Indices */}
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
                    <h2 className="text-base font-semibold mb-3 flex items-center">
                      <TrendingUp className="mr-2" size={16} />
                      Indian Market Indices
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {marketIndices.map((index) => (
                        <div key={index.name} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <h3 className="text-xs font-medium text-gray-500">{index.name}</h3>
                          <p className="text-base font-bold">{formatIndianCommas(index.value)}</p>
                          <div className={`flex items-center mt-1 ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {index.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            <span className="ml-1 text-xs">
                              {index.change >= 0 ? '+' : ''}{index.change} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent}%)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Client Portfolio */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <PieChart className="mr-2" size={20} />
                      Client Portfolio
                    </h2>
                    <select
                      value={selectedClient}
                      onChange={(e) => setSelectedClient(e.target.value)}
                      className={`px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="client1">Raj Enterprises</option>
                      <option value="client2">Sharma Investments</option>
                      <option value="client3">Tech Capital Fund</option>
                    </select>
                  </div>

                  {isAuthenticated ? (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className="text-sm text-gray-500">Total Value</p>
                          <p className="text-2xl font-bold">₹{clientData[selectedClient].totalValue.toLocaleString()}</p>
                        </div>
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className="text-sm text-gray-500">Day P&L</p>
                          <p className={`text-2xl font-bold ${clientData[selectedClient].dayPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {clientData[selectedClient].dayPL >= 0 ? '+' : ''}₹{clientData[selectedClient].dayPL.toLocaleString()}
                          </p>
                        </div>
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className="text-sm text-gray-500">Day P&L %</p>
                          <p className={`text-2xl font-bold ${clientData[selectedClient].dayPLPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {clientData[selectedClient].dayPLPercent >= 0 ? '+' : ''}{clientData[selectedClient].dayPLPercent}%
                          </p>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              <th className="px-4 py-3 text-left text-sm font-medium">Symbol</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Qty</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">P&L</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">P&L %</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clientData[selectedClient].holdings.map((holding, index) => (
                              <tr key={index} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <td className="px-4 py-3 font-medium">{holding.symbol}</td>
                                <td className="px-4 py-3">{holding.qty}</td>
                                <td className="px-4 py-3">₹{holding.price}</td>
                                <td className={`px-4 py-3 font-semibold ${holding.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {holding.pnl >= 0 ? '+' : ''}₹{holding.pnl.toLocaleString()}
                                </td>
                                <td className={`px-4 py-3 font-semibold ${holding.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="blur-sm">
                      <div className={`p-8 text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
                        <p className="text-gray-500">Login to view portfolio details</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Portfolio Management Tab */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                {/* Client List Header */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Users className="mr-2" size={20} />
                    Portfolio Management Dashboard
                  </h2>

                  {/* Client Selection Tabs */}
                  <div className="flex space-x-2 mb-4 overflow-x-auto">
                    <button
                      onClick={() => setSelectedPortfolioClient('all')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedPortfolioClient === 'all'
                          ? 'bg-blue-600 text-white'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                    >
                      All Clients
                    </button>
                    {Object.entries(clientData).map(([key, client]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedPortfolioClient(key)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${selectedPortfolioClient === key
                            ? 'bg-blue-600 text-white'
                            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {client.name}
                      </button>
                    ))}
                  </div>

                  {/* View Options */}
                  <div className="flex space-x-2">
                    {['overview', 'performance', 'risk', 'allocation'].map((view) => (
                      <button
                        key={view}
                        onClick={() => setPortfolioView(view)}
                        className={`px-3 py-1 text-sm rounded capitalize ${portfolioView === view
                            ? 'bg-purple-600 text-white'
                            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Visualizations Grid */}
                {portfolioView === 'overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Monthly Performance Chart */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                      <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyPerformance}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                          <XAxis dataKey="month" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                          <YAxis stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                              border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`
                            }} />
                          <Line
                            type="monotone"
                            dataKey="returns"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{ fill: '#3B82F6' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Asset Distribution Pie Chart */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                      <h3 className="text-lg font-semibold mb-4">Asset Distribution</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <RePieChart>
                          <Pie
                            data={assetDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {assetDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {portfolioView === 'performance' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Client Performance Comparison */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                      <h3 className="text-lg font-semibold mb-4">Client Performance Comparison</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={clientPerformance}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                          <XAxis dataKey="client" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                          <YAxis stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                              border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`
                            }} />
                          <Bar dataKey="profit" fill="#10B981" />
                          <Bar dataKey="loss" fill="#EF4444" />
                          <Bar dataKey="net" fill="#3B82F6" />
                          <Legend />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Growth Trend Area Chart */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                      <h3 className="text-lg font-semibold mb-4">Portfolio Growth Trend</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={monthlyPerformance}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                          <XAxis dataKey="month" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                          <YAxis stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                              border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`
                            }} />
                          <Area
                            type="monotone"
                            dataKey="returns"
                            stroke="#8B5CF6"
                            fill="#8B5CF6"
                            fillOpacity={0.3} />
                          <Area
                            type="monotone"
                            dataKey="clients"
                            stroke="#10B981"
                            fill="#10B981"
                            fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {portfolioView === 'risk' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Risk Metrics Radar Chart */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                      <h3 className="text-lg font-semibold mb-4">Risk Metrics Analysis</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={riskMetrics}>
                          <PolarGrid stroke={darkMode ? '#374151' : '#E5E7EB'} />
                          <PolarAngleAxis dataKey="metric" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                          <Radar name="Equity" dataKey="equity" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                          <Radar name="Options" dataKey="options" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
                          <Radar name="Futures" dataKey="futures" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.5} />
                          <Radar name="Commodities" dataKey="commodities" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.5} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Risk Summary Cards */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                      <h3 className="text-lg font-semibold mb-4">Risk Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                          <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                          <h4 className="text-2xl font-bold">1.85</h4>
                          <p className="text-sm text-gray-500">Sharpe Ratio</p>
                        </div>
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                          <h4 className="text-2xl font-bold">0.92</h4>
                          <p className="text-sm text-gray-500">Beta</p>
                        </div>
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                          <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                          <h4 className="text-2xl font-bold">3.2%</h4>
                          <p className="text-sm text-gray-500">Alpha</p>
                        </div>
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                          <h4 className="text-2xl font-bold">₹85K</h4>
                          <p className="text-sm text-gray-500">VaR (95%)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {portfolioView === 'allocation' && (
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                    <h3 className="text-lg font-semibold mb-4">Portfolio Allocation Matrix</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <th className="px-4 py-3 text-left text-sm font-medium">Client</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">Equity</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">Options</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">Futures</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">Commodities</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">Cash</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(clientData).map(([key, client]) => (
                            <tr key={key} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                              <td className="px-4 py-3 font-medium">{client.name}</td>
                              <td className="px-4 py-3 text-center">45%</td>
                              <td className="px-4 py-3 text-center">25%</td>
                              <td className="px-4 py-3 text-center">15%</td>
                              <td className="px-4 py-3 text-center">10%</td>
                              <td className="px-4 py-3 text-center">5%</td>
                              <td className="px-4 py-3 text-center font-bold">₹{client.totalValue.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg text-center`}>
                    <Globe className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h3 className="text-2xl font-bold">₹17.45M</h3>
                    <p className="text-sm text-gray-500">Total AUM</p>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg text-center`}>
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="text-2xl font-bold text-green-500">+18.5%</h3>
                    <p className="text-sm text-gray-500">YTD Returns</p>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg text-center`}>
                    <Users className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <h3 className="text-2xl font-bold">3</h3>
                    <p className="text-sm text-gray-500">Active Clients</p>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg text-center`}>
                    <Activity className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <h3 className="text-2xl font-bold">89%</h3>
                    <p className="text-sm text-gray-500">Win Rate</p>
                  </div>
                </div>
              </div>
            )}

            {/* Risk Calculator Tab */}
            {activeTab === 'risk-calculator' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <Calculator className="mr-2" size={20} />
                      Advanced Risk Calculator
                    </h2>

                    {/* Total Capital Display */}
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'} mb-6`}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Total Capital</p>
                        <p className="text-2xl font-bold">₹{capitalAllocation.total.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Asset Class Selection with Capital Display */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Asset Class</label>
                      <select
                        value={assetClass}
                        onChange={(e) => setAssetClass(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      >
                        <option value="equity">Equity</option>
                        <option value="equity-options">Equity Options</option>
                        <option value="futures">Futures & Options</option>
                        <option value="commodities">Commodities</option>
                        <option value="others">Other Assets</option>
                      </select>

                      {/* Display Available Capital for Selected Asset Class */}
                      <div className={`mt-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Allocated:</span>
                            <p className="font-semibold">₹{getAllocatedCapitalForAssetClass().toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Deployed:</span>
                            <p className="font-semibold text-orange-500">₹{(
                              assetClass === 'equity' ? capitalAllocation.equity.deployed :
                                assetClass === 'equity-options' ? capitalAllocation.options.deployed :
                                  assetClass === 'futures' ? capitalAllocation.futures.deployed :
                                    assetClass === 'commodities' ? capitalAllocation.commodities.deployed :
                                      0
                            ).toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Available:</span>
                            <p className="font-semibold text-green-500">₹{getAvailableCapitalForAssetClass().toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className={`my-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />

                    {/* Risk Settings */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Risk % per Trade (on Allocated Capital)</label>
                      <input
                        type="number"
                        value={riskPercentage}
                        onChange={(e) => setRiskPercentage(Number(e.target.value))}
                        step="0.1"
                        className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                    </div>

                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-6`}>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Allocated Capital for {assetClass}:</p>
                          <p className="font-semibold text-lg">₹{getAllocatedCapitalForAssetClass().toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Risk Amount ({riskPercentage}% of Allocated):</p>
                          <p className="font-semibold text-lg text-red-500">₹{((getAllocatedCapitalForAssetClass() * riskPercentage) / 100).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <hr className={`my-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />

                    {/* Stock Search & Trade Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Search Stock/Symbol</label>
                        <input
                          type="text"
                          value={searchSymbol}
                          onChange={(e) => setSearchSymbol(e.target.value)}
                          placeholder="e.g., RELIANCE, NIFTY"
                          className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Trade Type</label>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setTradeType('LONG')}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${tradeType === 'LONG'
                                ? 'bg-green-600 text-white'
                                : darkMode
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                          >
                            LONG
                          </button>
                          <button
                            onClick={() => setTradeType('SHORT')}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${tradeType === 'SHORT'
                                ? 'bg-red-600 text-white'
                                : darkMode
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                          >
                            SHORT
                          </button>
                        </div>
                      </div>
                    </div>

                    <hr className={`my-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />

                    {/* Entry & Stop Loss */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Entry Price (₹)</label>
                        <input
                          type="number"
                          value={entryPrice}
                          onChange={(e) => setEntryPrice(e.target.value)}
                          step="0.01"
                          className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Stop Loss (₹)</label>
                        <input
                          type="number"
                          value={stopLoss}
                          onChange={(e) => setStopLoss(e.target.value)}
                          step="0.01"
                          className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                      </div>
                    </div>

                    {calculation && (
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-6`}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <p><strong>Risk Amount:</strong> ₹{calculation.riskAmount.toLocaleString()}</p>
                          <p><strong>Quantity:</strong> {calculation.quantity}</p>
                          <p><strong>Investment:</strong> ₹{calculation.investment.toLocaleString()}</p>
                        </div>
                        {calculation.investment > calculation.availableCapital && (
                          <div className="mt-3 p-2 bg-yellow-500/20 border border-yellow-500 rounded-lg">
                            <p className="text-sm text-yellow-500 flex items-center">
                              <AlertTriangle size={16} className="mr-2" />
                              Investment (₹{calculation.investment.toLocaleString()}) exceeds available capital (₹{calculation.availableCapital.toLocaleString()})
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <hr className={`my-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />

                    {/* Targets Section */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Targets</h3>
                        <div className="flex items-center space-x-2">
                          <select
                            value={customTargetType}
                            onChange={(e) => setCustomTargetType(e.target.value)}
                            className={`px-2 py-1 text-sm rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                          >
                            <option value="ratio">Ratio (1:X)</option>
                            <option value="number">Price (₹)</option>
                            <option value="percent">Percentage (%)</option>
                          </select>
                          <button
                            onClick={() => setCustomTargets([...customTargets, {
                              type: customTargetType,
                              value: '',
                              price: 0,
                              amount: 0,
                              percentage: 0
                            }])}
                            className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            <Plus size={16} className="mr-1" />
                            Add Target
                          </button>
                        </div>
                      </div>

                      {calculation && (
                        <div className="space-y-3">
                          {calculation.targets.map((target, index) => (
                            <div key={index} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-blue-600">{target.ratio}</span>
                                <div className="text-right">
                                  <p className="font-semibold">₹{target.price.toFixed(2)}</p>
                                  <p className="text-sm text-gray-500">
                                    Profit: ₹{target.amount.toLocaleString()}
                                    <span className={`ml-2 ${target.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                      ({target.percentage >= 0 ? '+' : ''}{target.percentage.toFixed(2)}%)
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}

                          {customTargets.map((target, index) => {
                            let calculatedPrice = 0;
                            let calculatedAmount = 0;
                            let calculatedPercentage = 0;

                            if (target.value && calculation) {
                              const entry = parseFloat(entryPrice);
                              const riskPerShare = calculation.riskPerShare;

                              if (target.type === 'ratio') {
                                const ratio = parseFloat(target.value);
                                calculatedPrice = entry + (ratio * riskPerShare * (tradeType === 'LONG' ? 1 : -1));
                                calculatedAmount = calculation.riskAmount * ratio;
                                calculatedPercentage = ((ratio * riskPerShare) / entry) * 100 * (tradeType === 'LONG' ? 1 : -1);
                              } else if (target.type === 'number') {
                                calculatedPrice = parseFloat(target.value);
                                const priceDiff = Math.abs(calculatedPrice - entry);
                                calculatedAmount = (priceDiff / riskPerShare) * calculation.riskAmount;
                                calculatedPercentage = ((calculatedPrice - entry) / entry) * 100;
                              } else if (target.type === 'percent') {
                                const percentage = parseFloat(target.value);
                                calculatedPrice = entry * (1 + (percentage / 100) * (tradeType === 'LONG' ? 1 : -1));
                                const priceDiff = Math.abs(calculatedPrice - entry);
                                calculatedAmount = (priceDiff / riskPerShare) * calculation.riskAmount;
                                calculatedPercentage = percentage * (tradeType === 'LONG' ? 1 : -1);
                              }
                            }

                            return (
                              <div key={`custom-${index}`} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <div className="flex items-center space-x-3 mb-2">
                                  <input
                                    type="text"
                                    placeholder={target.type === 'ratio' ? '6' :
                                      target.type === 'number' ? '2500' :
                                        '5'}
                                    value={target.value}
                                    onChange={(e) => {
                                      const newTargets = [...customTargets];
                                      newTargets[index].value = e.target.value;
                                      setCustomTargets(newTargets);
                                    } }
                                    className={`flex-1 px-2 py-1 text-sm rounded border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`} />
                                  <span className="text-sm text-gray-500 min-w-[60px]">
                                    {target.type === 'ratio' ? '1:X' : target.type === 'number' ? '₹' : '%'}
                                  </span>
                                  <button
                                    onClick={() => setCustomTargets(customTargets.filter((_, i) => i !== index))}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                                {target.value && (
                                  <div className="text-right text-sm">
                                    <p className="font-semibold">₹{calculatedPrice.toFixed(2)}</p>
                                    <p className="text-gray-500">
                                      Profit: ₹{calculatedAmount.toLocaleString()}
                                      <span className={`ml-2 ${calculatedPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        ({calculatedPercentage >= 0 ? '+' : ''}{calculatedPercentage.toFixed(2)}%)
                                      </span>
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={addToHistory}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      disabled={!calculation}
                    >
                      Add to History
                    </button>
                  </div>
                </div>

                {/* History Section */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <History size={16} className="mr-2" />
                      History
                    </h3>
                    <button
                      onClick={clearAllHistory}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {calculationHistory.map((item) => (
                      <div key={item.id} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium">{item.symbol}</span>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${item.tradeType === 'LONG' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {item.tradeType}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">{item.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Bell size={16} className="text-yellow-500 cursor-pointer" title="Set Alert" />
                            <button
                              onClick={() => transferToJournal(item)}
                              className="text-blue-500 hover:text-blue-700"
                              title="Transfer to Journal"
                            >
                              <ArrowRight size={16} />
                            </button>
                            <Trash2 size={16} className="text-red-500 cursor-pointer" onClick={() => removeFromHistory(item.id)} />
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>Asset: <span className="font-medium capitalize">{item.assetClass}</span></p>
                          <p>Entry: ₹{item.entryPrice} | SL: ₹{item.stopLoss}</p>
                          <p>Qty: {item.quantity} | Investment: ₹{item.investment.toLocaleString()}</p>
                          <p>Risk: ₹{item.riskAmount.toLocaleString()}</p>
                        </div>

                        {/* Targets Display */}
                        <div className="mt-2 pt-2 border-t border-gray-600">
                          <p className="text-xs font-medium text-gray-400 mb-1">Targets:</p>
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            {item.targets.map((target, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span className="text-blue-400">{target.ratio}</span>
                                <span>
                                  ₹{target.price.toFixed(2)}
                                  <span className={`ml-1 ${target.percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    ({target.percentage >= 0 ? '+' : ''}{target.percentage.toFixed(1)}%)
                                  </span>
                                </span>
                              </div>
                            ))}
                            {item.customTargets && item.customTargets.map((target, idx) => (
                              <div key={`custom-${idx}`} className="flex justify-between">
                                <span className="text-purple-400">{target.ratio}</span>
                                <span>
                                  ₹{target.price.toFixed(2)}
                                  <span className={`ml-1 ${target.percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    ({target.percentage >= 0 ? '+' : ''}{target.percentage.toFixed(1)}%)
                                  </span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    {calculationHistory.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        <History size={32} className="mx-auto mb-2 opacity-50" />
                        <p>No calculations in history</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Trading Journal Tab */}
            {activeTab === 'trading-journal' && (
              <div className="space-y-6">
                {/* Power BI Style Visualizations */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <BarChart3 className="mr-2" size={20} />
                    Trading Performance Analytics
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                      <h3 className="text-2xl font-bold text-green-500">78%</h3>
                      <p className="text-sm text-gray-500">Win Rate</p>
                    </div>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                      <h3 className="text-2xl font-bold text-blue-500">2.4</h3>
                      <p className="text-sm text-gray-500">Risk/Reward Ratio</p>
                    </div>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                      <h3 className="text-2xl font-bold text-purple-500">125</h3>
                      <p className="text-sm text-gray-500">Total Trades</p>
                    </div>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                      <h3 className="text-2xl font-bold text-orange-500">18.5%</h3>
                      <p className="text-sm text-gray-500">Annual Return</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mock Chart 1 */}
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h4 className="font-medium mb-3">Monthly P&L</h4>
                      <div className="h-48 flex items-end justify-between space-x-2">
                        {[65, 120, 85, 140, 95, 160, 110, 135].map((height, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-blue-500 rounded-t"
                              style={{ height: `${(height / 160) * 100}%` }}
                            ></div>
                            <span className="text-xs mt-2">M{index + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mock Chart 2 */}
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h4 className="font-medium mb-3">Asset Class Distribution</h4>
                      <div className="h-48 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-8 border-blue-500 border-t-green-500 border-r-purple-500 border-b-orange-500"></div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>Equity 45%</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-2"></div>Options 30%</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>Futures 15%</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>Others 10%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trading Journal Table */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Trading Journal</h3>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setShowColumnManager(!showColumnManager)}
                        className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        <Filter size={16} className="mr-1" />
                        Columns
                      </button>
                      <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Plus size={16} className="mr-1" />
                        Add Trade
                      </button>
                      <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Download size={16} className="mr-1" />
                        Export
                      </button>
                    </div>
                  </div>

                  {/* Column Manager */}
                  {showColumnManager && (
                    <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="mb-3">
                        <h4 className="text-sm font-semibold mb-2">Manage Columns</h4>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-3">
                          {journalColumns.map((col) => (
                            <label key={col.key} className="flex items-center text-sm">
                              <input
                                type="checkbox"
                                checked={col.visible}
                                onChange={() => toggleColumn(col.key)}
                                className="mr-1" />
                              <span className="truncate">{col.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add custom column..."
                          value={newColumnName}
                          onChange={(e) => setNewColumnName(e.target.value)}
                          className={`flex-1 px-3 py-1 text-sm rounded border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`} />
                        <button
                          onClick={addCustomColumn}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Add Column
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          {journalColumns.filter(col => col.visible).map((col) => (
                            <th key={col.key} className="px-3 py-3 text-left text-xs font-medium">
                              {col.label}
                            </th>
                          ))}
                          <th className="px-3 py-3 text-center text-xs font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {journalEntries.map((entry) => (
                          <tr key={entry.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            {journalColumns.filter(col => col.visible).map((col) => (
                              <td key={col.key} className="px-3 py-3 text-sm">
                                {editingJournalId === entry.id ? (
                                  col.key === 'status' ? (
                                    <select
                                      value={entry[col.key] || ''}
                                      onChange={(e) => updateJournalEntry(entry.id, col.key, e.target.value)}
                                      className={`px-2 py-1 text-sm rounded border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                                    >
                                      <option value="Active">Active</option>
                                      <option value="Closed">Closed</option>
                                      <option value="Pending">Pending</option>
                                    </select>
                                  ) : col.key === 'type' ? (
                                    <select
                                      value={entry[col.key] || ''}
                                      onChange={(e) => updateJournalEntry(entry.id, col.key, e.target.value)}
                                      className={`px-2 py-1 text-sm rounded border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                                    >
                                      <option value="Buy">Buy</option>
                                      <option value="Sell">Sell</option>
                                      <option value="Short">Short</option>
                                    </select>
                                  ) : (
                                    <input
                                      type={col.key === 'capital' || col.key === 'entry' || col.key === 'sl' || col.key === 'risk' ? 'number' : 'text'}
                                      value={entry[col.key] || ''}
                                      onChange={(e) => updateJournalEntry(entry.id, col.key, e.target.value)}
                                      className={`w-full px-2 py-1 text-sm rounded border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`} />
                                  )
                                ) : (
                                  <div>
                                    {col.key === 'type' ? (
                                      <span className={`px-2 py-1 rounded-full text-xs ${entry[col.key] === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {entry[col.key] || ''}
                                      </span>
                                    ) : col.key === 'status' ? (
                                      <span className={`px-2 py-1 rounded-full text-xs ${entry[col.key] === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {entry[col.key] || ''}
                                      </span>
                                    ) : col.key === 'pnl' ? (
                                      <span className={`font-semibold ${entry[col.key]?.toString().startsWith('+') ? 'text-green-500' : entry[col.key]?.toString().startsWith('-') ? 'text-red-500' : ''}`}>
                                        {entry[col.key] || ''}
                                      </span>
                                    ) : col.key === 'capital' || col.key === 'entry' || col.key === 'sl' ? (
                                      <span>{typeof entry[col.key] === 'number' ? `₹${entry[col.key].toLocaleString()}` : entry[col.key] || ''}</span>
                                    ) : col.key === 'risk' ? (
                                      <span>{typeof entry[col.key] === 'number' ? `${entry[col.key]}%` : entry[col.key] || ''}</span>
                                    ) : (
                                      entry[col.key] || ''
                                    )}
                                  </div>
                                )}
                              </td>
                            ))}
                            <td className="px-3 py-3 text-sm">
                              <div className="flex justify-center space-x-2">
                                {editingJournalId === entry.id ? (
                                  <button
                                    onClick={() => setEditingJournalId(null)}
                                    className="text-green-500 hover:text-green-700"
                                    title="Save"
                                  >
                                    <Save size={16} />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => setEditingJournalId(entry.id)}
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Edit"
                                  >
                                    <Edit3 size={16} />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteJournalEntry(entry.id)}
                                  className="text-red-500 hover:text-red-700"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
  ;
}
  export default TradingDashboard;


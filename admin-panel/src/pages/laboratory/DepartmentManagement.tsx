import { useState } from 'react';
import {
    Plus,
    Edit2,
    Trash2,
    FlaskConical,
    Microscope,
    Activity,
    ChevronRight,
    Tag,
    Clock,
    DollarSign
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';

interface Test {
    id: string;
    name: string;
    price: string;
    turnaround: string;
    status: 'Active' | 'Inactive';
}

interface Department {
    id: string;
    name: string;
    icon: any;
    testCount: number;
    tests: Test[];
}

const INITIAL_DEPARTMENTS: Department[] = [
    {
        id: 'D1',
        name: 'Hematology',
        icon: FlaskConical,
        testCount: 12,
        tests: [
            { id: 'T1', name: 'Complete Blood Count (CBC)', price: '35', turnaround: '24 hrs', status: 'Active' },
            { id: 'T2', name: 'Blood Glucose', price: '15', turnaround: '12 hrs', status: 'Active' },
        ]
    },
    {
        id: 'D2',
        name: 'Radiology',
        icon: Activity,
        testCount: 8,
        tests: [
            { id: 'T3', name: 'Chest X-Ray', price: '80', turnaround: '48 hrs', status: 'Active' },
            { id: 'T4', name: 'MRI Brain', price: '450', turnaround: '72 hrs', status: 'Active' },
        ]
    },
    {
        id: 'D3',
        name: 'Microbiology',
        icon: Microscope,
        testCount: 5,
        tests: []
    },
];

export default function DepartmentManagement() {
    const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
    const [selectedDept, setSelectedDept] = useState<Department | null>(null);

    const handleDeleteDept = (id: string) => {
        setDepartments(prev => prev.filter(d => d.id !== id));
        toast.success("Department removed");
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
                    <p className="text-gray-500 font-medium text-sm">Organize tests and services by medical departments</p>
                </div>
                <Button className="flex items-center gap-2 bg-primary text-white rounded-2xl px-6 py-3 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    <Plus size={18} />
                    Add Department
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Department List */}
                <div className="lg:col-span-1 space-y-4">
                    {departments.map((dept) => (
                        <div
                            key={dept.id}
                            onClick={() => setSelectedDept(dept)}
                            className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all duration-300 group ${selectedDept?.id === dept.id ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5' : 'border-gray-200 bg-white/40 hover:border-primary/20'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-2xl ${selectedDept?.id === dept.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all'}`}>
                                        <dept.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{dept.name}</h4>
                                        <p className="text-xs font-bold text-primary uppercase tracking-widest">{dept.testCount} Tests</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteDept(dept.id); }}
                                    className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Test List for Selected Department */}
                <div className="lg:col-span-2">
                    {selectedDept ? (
                        <div className="bg-white/40 backdrop-blur-xl border border-gray-200 rounded-[40px] p-8 shadow-sm h-full">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-primary text-white">
                                        <selectedDept.icon size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{selectedDept.name} Tests</h3>
                                </div>
                                <Button size="sm" variant="outline" className="rounded-xl border-primary/20 text-primary font-bold hover:bg-primary/5">
                                    <Plus size={16} className="mr-2" />
                                    Add Test
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {selectedDept.tests.length > 0 ? (
                                    selectedDept.tests.map((test) => (
                                        <div key={test.id} className="p-5 rounded-3xl bg-white/80 border border-white hover:shadow-md transition-all flex items-center justify-between group">
                                            <div className="space-y-1">
                                                <h5 className="font-bold text-gray-900">{test.name}</h5>
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        <DollarSign size={12} className="text-emerald-500" />
                                                        Price: ${test.price}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        <Clock size={12} className="text-orange-500" />
                                                        TAT: {test.turnaround}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-gray-400 hover:text-primary transition-all">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-rose-500 transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                                        <Tag size={48} className="mx-auto mb-4 text-gray-200" />
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No tests added to this department</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/40 backdrop-blur-xl border border-gray-200 rounded-[40px] text-gray-400 border-dashed">
                            <ChevronRight size={48} className="mb-4 opacity-10" />
                            <p className="font-bold uppercase tracking-widest text-sm">Select a department to view tests</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

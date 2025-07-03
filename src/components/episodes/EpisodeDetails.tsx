import React, { useState } from 'react';
import { ArrowLeft, Calendar, DollarSign, Users, Package, Plus, Edit, Trash2 } from 'lucide-react';
import { Episode } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/formatters';

interface EpisodeDetailsProps {
  episode: Episode;
  onBack: () => void;
}

export default function EpisodeDetails({ episode, onBack }: EpisodeDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const completedTasks = episode.tasks.filter(task => task.status === 'completed').length;
  const totalTasks = episode.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'products', label: 'Products' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-black tracking-wider">{episode.name}</h1>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mt-2 ${getStatusColor(episode.status)}`}>
                {episode.status.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button variant="danger">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-black mb-4">CONCEPT</h2>
              <p className="text-white/80 leading-relaxed">{episode.concept}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-black mb-4">PROGRESS</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-white/60 mb-2">
                    <span>Tasks Completed</span>
                    <span>{completedTasks}/{totalTasks}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div 
                      className="bg-white h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {episode.actualRevenue && (
                  <div>
                    <div className="flex justify-between text-sm text-white/60 mb-2">
                      <span>Revenue Progress</span>
                      <span>{formatCurrency(episode.actualRevenue)} / {formatCurrency(episode.targetRevenue)}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div 
                        className="bg-green-400 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((episode.actualRevenue / episode.targetRevenue) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-black mb-4">KEY METRICS</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-white/60" />
                    <span className="text-white/80 text-sm">Launch Date</span>
                  </div>
                  <span className="text-white font-bold text-sm">{formatDate(episode.launchDate)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-white/60" />
                    <span className="text-white/80 text-sm">Budget</span>
                  </div>
                  <span className="text-white font-bold text-sm">{formatCurrency(episode.budget)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-white/60" />
                    <span className="text-white/80 text-sm">Target Revenue</span>
                  </div>
                  <span className="text-white font-bold text-sm">{formatCurrency(episode.targetRevenue)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-white/60" />
                    <span className="text-white/80 text-sm">Team Size</span>
                  </div>
                  <span className="text-white font-bold text-sm">{episode.teamMembers.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-white/60" />
                    <span className="text-white/80 text-sm">Products</span>
                  </div>
                  <span className="text-white font-bold text-sm">{episode.products.length}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black">TASKS</h2>
            <Button>
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </div>
          
          {episode.tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 mb-4">No tasks created yet</p>
              <Button>
                <Plus className="w-4 h-4" />
                Create First Task
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {episode.tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <div className="font-bold text-white text-sm">{task.title}</div>
                    <div className="text-white/60 text-xs capitalize">
                      {task.category} • Due: {formatDate(task.dueDate)}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(task.status)}`}>
                    {task.status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {activeTab === 'products' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black">PRODUCTS</h2>
            <Button>
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
          
          {episode.products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 mb-4">No products added yet</p>
              <Button>
                <Plus className="w-4 h-4" />
                Add First Product
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {episode.products.map((product) => (
                <div key={product.id} className="bg-white/5 rounded-lg border border-white/10 p-4">
                  <div className="font-bold text-white text-sm mb-2">{product.name}</div>
                  <div className="text-white/60 text-xs mb-3">
                    Variants: {product.variants.join(', ')}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-white/60">Quantity:</span>
                      <span className="text-white ml-1">{product.quantity}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Price:</span>
                      <span className="text-white ml-1">{formatCurrency(product.price)}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Cost:</span>
                      <span className="text-white ml-1">{formatCurrency(product.cost)}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Sold:</span>
                      <span className="text-white ml-1">{product.sold || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {activeTab === 'team' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black">TEAM MEMBERS</h2>
            <Button>
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          </div>
          
          {episode.teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 mb-4">No team members assigned yet</p>
              <Button>
                <Plus className="w-4 h-4" />
                Add First Member
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {episode.teamMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-3 bg-white/5 rounded-lg border border-white/10 p-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{member.name}</div>
                    <div className="text-white/60 text-xs">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
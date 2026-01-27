import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { EventsList } from '@/components/dashboard/EventsList';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { QRCodeModal } from '@/components/dashboard/QRCodeModal';
import { CreateEventModal } from '@/components/dashboard/CreateEventModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockEvents, mockUser } from '@/data/mockData';
import { Event } from '@/types';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewQR = (event: Event) => {
    setSelectedEvent(event);
    setIsQRModalOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    toast({
      title: 'Event deleted',
      description: 'The event has been removed.',
    });
  };

  const handleCreateOrUpdateEvent = (eventData: Partial<Event>) => {
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingEvent.id ? { ...e, ...eventData } : e
        )
      );
    } else {
      setEvents((prev) => [eventData as Event, ...prev]);
    }
    setEditingEvent(null);
  };

  return (
    <MainLayout showFooter={false}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {mockUser.name}
              </p>
            </div>
            <Button
              variant="hero"
              size="lg"
              onClick={() => {
                setEditingEvent(null);
                setIsCreateModalOpen(true);
              }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Event
            </Button>
          </motion.div>

          {/* Stats */}
          <div className="mb-8">
            <StatsCards />
          </div>

          {/* Chart */}
          <div className="mb-8">
            <AttendanceChart />
          </div>

          {/* Events Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Your Events
              </h2>
              <div className="flex gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <EventsList
              events={filteredEvents}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewQR={handleViewQR}
            />

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? 'No events match your search.'
                    : 'No events yet. Create your first event!'}
                </p>
                {!searchQuery && (
                  <Button
                    variant="default"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <QRCodeModal
        event={selectedEvent}
        open={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
      <CreateEventModal
        open={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingEvent(null);
        }}
        onSubmit={handleCreateOrUpdateEvent}
        editEvent={editingEvent}
      />
    </MainLayout>
  );
};

export default Dashboard;

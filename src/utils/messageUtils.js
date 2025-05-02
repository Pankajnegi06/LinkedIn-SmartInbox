export const categorizeMessage = (message) => {
  const text = message.lastMessage.toLowerCase();
  
  if (text.includes('job') || text.includes('resume') || text.includes('position') || text.includes('hiring')) {
    return '🏢 Job Lead';
  } else if (text.includes('birthday') || text.includes('congrats') || text.includes('congratulations')) {
    return '🎉 Social';
  } else if (text.includes('follow up') || text.includes('ping') || text.includes('reminder')) {
    return '🔁 Follow-Up';
  }
  return 'Other';
};

const requestNotificationPermission = async () => {
  try {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

const scheduleNotification = (message, delay) => {
  if (delay < 0) {
    console.warn('Cannot schedule notification in the past');
    return null;
  }

  const timeoutId = setTimeout(async () => {
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
      new Notification('LinkedIn SmartInbox Reminder', {
        body: message,
        icon: '/linkedin-icon.png' // You can add a LinkedIn-style icon
      });
    }
  }, delay);

  return timeoutId;
};

export const setReminder = async (chatId, time, message) => {
  try {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    const delay = time.getTime() - new Date().getTime();
    
    const timeoutId = scheduleNotification(message, delay);
    if (timeoutId === null) {
      throw new Error('Invalid reminder time');
    }

    const reminder = {
      id: chatId,
      time: time.toISOString(),
      message,
      created: new Date().toISOString(),
      timeoutId
    };
    
    localStorage.setItem('reminders', JSON.stringify([...reminders, reminder]));
    return true;
  } catch (error) {
    console.error('Error setting reminder:', error);
    return false;
  }
};

export const getReminders = () => {
  try {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    // Clean up expired reminders
    const now = new Date().getTime();
    const activeReminders = reminders.filter(reminder => {
      const reminderTime = new Date(reminder.time).getTime();
      return reminderTime > now;
    });
    
    if (activeReminders.length !== reminders.length) {
      localStorage.setItem('reminders', JSON.stringify(activeReminders));
    }
    
    return activeReminders;
  } catch (error) {
    console.error('Error getting reminders:', error);
    return [];
  }
};

export const removeReminder = (reminderId) => {
  try {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    const reminder = reminders.find(r => r.id === reminderId);
    
    if (reminder?.timeoutId) {
      clearTimeout(reminder.timeoutId);
    }
    
    const updatedReminders = reminders.filter(r => r.id !== reminderId);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
    return true;
  } catch (error) {
    console.error('Error removing reminder:', error);
    return false;
  }
}; 